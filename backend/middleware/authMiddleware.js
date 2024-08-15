const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
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

module.exports = authMiddleware;
