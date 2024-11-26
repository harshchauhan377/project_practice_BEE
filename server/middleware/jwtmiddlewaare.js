var jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    // Create a new JWT token for login/session management or authorization purposes
    return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: '30d' }); // Set an expiration time if needed
}

const validateJwtToken = (req, res, next) => {
    // Check if the JWT token is available or not 
    const authorization = req.headers.authorization; // Corrected spelling

    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    // Extract the token value 
    const token = authorization.split(' ')[1];

    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        // Validate the token
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
        
        // Attach user info to the request object
        req.user = validateToken;
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error("ERROR OCCURRED: ", err.message);
        return res.status(401).json({ err: 'Invalid Token' }); // Return an error response
    }
}

module.exports = { generateToken, validateJwtToken };