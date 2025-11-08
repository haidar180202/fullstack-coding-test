const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // In-memory user store
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully.' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

exports.getProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  res.json({ id: user.id, email: user.email, profilePicture: user.profilePicture });
};

exports.updateProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { email, profilePicture } = req.body;
  if (email) user.email = email;
  if (profilePicture) user.profilePicture = profilePicture;

  res.json({ message: 'Profile updated successfully.' });
};