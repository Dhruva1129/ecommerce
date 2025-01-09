
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Authentication middleware: Verifies the JWT token
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    console.log('Authorization header:', token); // Log the Authorization header

    if (!token) return res.status(401).json({ message: "Access token missing or invalid" });


    try {
        const jwtToken = token.split(" ")[1]; // Extract token part
        console.log('JWT token:', jwtToken); // Debug log
    
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log('Decoded token:', verified); // Debug log
    
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Debug log
        res.status(400).json({ message: "Invalid token" });
    }
    
};

// Authorization middleware: Verifies the role of the user
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
};

module.exports = { authenticate, authorizeRole };
