import User from "../models/User.js";

export const listUsers = async (req, res) => {
  const users = await User.find()
    .select("email role allowedEmails")
    .populate("allowedEmails");
  res.json(users);
};

export const assignEmailToUser = async (req, res) => {
  const { id, email } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.allowedEmails.includes(email)) {
    user.allowedEmails.push(email);
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
export const deleteAllowEmail = async (req, res) => {
  try {
    const { id, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cek apakah email ada di dalam allowedEmails
    const emailIndex = user.allowedEmails.indexOf(email);
    if (emailIndex === -1) {
      return res
        .status(400)
        .json({ message: "Email not found in allowed list" });
    }

    // Hapus email
    user.allowedEmails.splice(emailIndex, 1);

    await user.save();

    res.json({
      message: "Email removed successfully",
      allowedEmails: user.allowedEmails,
    });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
