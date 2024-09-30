const jwt = require('jsonwebtoken');

const jwtTokenAuthentication = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(403).json({ message: "Token not found", success: false });
    }

    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "Invalid or expired token", success: false });
        }
        req.userId = decoded.id;
        next();  
    }
    catch(err) {
        console.log("Error in verifying JWT token");
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

const generateJwtTokenAndSetCookie = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    // set a cookie
    res.cookie("token", token, {
        httpOnly: true, // prevents XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevents Cross Site Request Forgery(CSRF) Attack
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
}

module.exports = { generateJwtTokenAndSetCookie, jwtTokenAuthentication };