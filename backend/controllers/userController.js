import User from "../models/User.js";

export const listUsers = async (req, res) => {
  const users = await User.find()
    .select("email role allowedEmails")
    .populate("allowedEmails");
  res.json(users);
};

export const assignEmailToUser = async (req, res) => {
  const { userId, emailAccountId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.allowedEmails.includes(emailAccountId)) {
    user.allowedEmails.push(emailAccountId);
    await user.save();
  }

  res.json({ message: "Email assigned", user });
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
