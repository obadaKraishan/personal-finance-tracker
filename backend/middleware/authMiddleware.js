const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.header('Authorization');

  // If no authorization header is present, deny access
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove "Bearer " from the header to get the token
  const token = authHeader.replace('Bearer ', '');

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user object from the token payload to the request object
    req.user = decoded.user;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, deny access
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
