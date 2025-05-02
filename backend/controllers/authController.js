import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    res.status(201).json({
      message: "Register success",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ message: "Register failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("allowedEmails");
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login success",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "allowedEmails",
    "-password"
  );
  res.json({ user });
};
