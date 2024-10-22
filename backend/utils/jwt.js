const jwt = require('jsonwebtoken');

const jwtTokenAuthentication = (req, res, next) => {
    const token = req.cookies.token;
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
        next(err);
    }
}

const generateJwtTokenAndSetCookie = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("token", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    return token;
}

module.exports = { generateJwtTokenAndSetCookie, jwtTokenAuthentication };