const User = require("../models/user.model");
const crypto = require('crypto');
const generateVerificationToken = require('../utils/generateVerificationToken');
const { generateJwtTokenAndSetCookie } = require('../utils/jwt');
const { sendVerificationEmail, sendWelcomeEmail, sendResetEmail, sendResetSuccessEmail } = require('../mailtrap/emails');


const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await User.findOne({email: email});
        if(user) {
            return res.status(403).json({message: "User already exists", success: false});
        }

        const verificationToken = generateVerificationToken();

        // generate a new document for user
        const newUser = new User({
            email,
            password, 
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        });

        // save user to database
        const response = await newUser.save();

        // generate a jwt token
        const payload = {
            id: response._id,
            email: response.email
        };
        
        const token = generateJwtTokenAndSetCookie(res, payload);

        await sendVerificationEmail(response.email, response.verificationToken);
        
        // returning token also in the response so that user can store it in its local storage
        return res.status(200).json({message: "User created successfully", success: true, token: token, user: {
            ...response._doc,
            password: undefined
        }});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(403).json({message: "Invalid Email or Password", success: false});
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = generateJwtTokenAndSetCookie(res, payload);

        // now update last login date
        user.lastLogin = Date.now();
        await user.save();

        return res.status(200).json({success: true, user: user, token: token, message: "User successfully loggedin",});

    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error", success: false});
    }
};

const verifyEmail = async (req, res) => {
    // user will enter the verification code in the ui
    const { verificationCode } = req.body;
    console.log(verificationCode);
    try {
        const user = await User.findOne({
            verificationToken: verificationCode, 
            verificationTokenExpiresAt: { $gt: Date.now() }  // this checks token is expired or not
        });

        console.log(user);

        if(!user) {
            return res.status(403).json({message: "Invalid or expired verification code", success: false});
        }

        user.isVerified = true;
        // now user is verified so, these are not required now
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        return res.status(200).json({message: "Email verified successfully", user, success: true});
    }
    catch(err) {
        console.log("error in verifying email:", err);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(404).json({message: "User not found", success: false});
        }

        // generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour  

        user.resetPasswordToken = resetToken;
        user.resetPasswordExipresAt = resetTokenExpiresAt;
        await user.save();

        // send email
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendResetEmail(email, resetUrl);
        res.status(200).json({message: "Reset password email sent successfully", success: true});
    }
    catch(err) {
        console.log("error sending reset email", err);
        res.status(500).json({error: "Internal Server Error", success: false});
    }
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    const { token } = req.params;
    try{
        const user = await User.findOne({ email: email, resetPasswordToken: token, resetPasswordExipresAt: { $gt: Date.now() } }); 
        if(!user) {
            return res.status(403).json({ message: "Invalid or expired reset token", success: false });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExipresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(email);
        console.log("password updated successfully");
        return res.status(200).json({ message: "Password reset successfully", success: true });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
}

const checkAuth = async (req, res) => {
    const userId = req.userId;
    try {   
        const user = await User.findById(userId).select("-password");
        if(!user) {
            res.status(404).json({ message: "User not found", success: false });
        }
        console.log("user authenticated");
        console.log(user);
        return res.status(200).json({ success: true, user });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error", success: false});
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({message: "User logged out successfully", success: true});
}

module.exports = { signup, login, verifyEmail, forgotPassword, resetPassword, checkAuth, logout };