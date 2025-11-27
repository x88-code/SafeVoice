const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });

    // Try DB-backed admin first
    const admin = await Admin.findOne({ username });
    if (admin) {
      const ok = await bcrypt.compare(password, admin.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      const payload = { username };
      const secret = process.env.JWT_SECRET || 'change_this_secret';
      const token = jwt.sign(payload, secret, { expiresIn: '8h' });
      return res.json({ token });
    }

    // Fallback to env-based admin (development convenience)
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'safe1234';
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { username };
    const secret = process.env.JWT_SECRET || 'change_this_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
