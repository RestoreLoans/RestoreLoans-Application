const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.userToken = `Bearer ${token}`;
    next();
  });
}

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
}

module.exports = { authenticateToken, generateToken };
