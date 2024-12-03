const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const user = await User.create({ userName, email, password, role });
    res.status(201).json({ data: { id: user._id, userName, role } });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.matchPassword(password)) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = generateToken(user);
    res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { register, login };
