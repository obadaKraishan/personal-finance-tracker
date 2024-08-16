const jwt = require('jsonwebtoken');

// Middleware to protect routes and attach the user to the request object
const protect = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Log the Authorization header

  // If no authorization header is present, deny access
  if (!authHeader) {
    console.log('No token, authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove "Bearer " from the header to get the token
  const token = authHeader.replace('Bearer ', '');
  console.log('Token:', token); // Log the token

  // If no token is found, deny access
  if (!token) {
    console.log('No token, authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log the decoded token

    // Attach the user object from the token payload to the request object
    req.user = decoded.user;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, deny access
    console.log('Token is not valid:', err.message); // Log the error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if the user has admin privileges
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log('Admin access only');
    res.status(403).json({ message: 'Admin access only' });
  }
};

// Export the middleware functions
module.exports = {
  protect,
  admin,
};
