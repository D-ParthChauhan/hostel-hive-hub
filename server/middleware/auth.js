const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hostel_hive_secret_key_123';

// 1. Verify if user is logged in
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// 2. Check if user is Council
const verifyCouncil = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'council') {
      next();
    } else {
      res.status(403).json({ message: 'Council Access Required' });
    }
  });
};

module.exports = { verifyToken, verifyCouncil, JWT_SECRET };