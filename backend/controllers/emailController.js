import EmailAccount from "../models/EmailAccount.js";
import User from "../models/User.js";
import { fetchEmails } from "../utils/imap.js";

export const getEmails = async (req, res) => {
  const account = await User.findOne({ allowedEmails: req.body.email });
  if (!account) return res.status(404).json({ message: "Email not found" });
  if (!req.user || !req.user.id)
    return res.status(403).json({ message: "Unauthorized" });
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.allowedEmails.includes(req.body.email)) {
    return res
      .status(403)
      .json({ message: "Not allowed to access this email" });
  }

  try {
    const messages = await fetchEmails(req.body.email);
    if (messages.length === 0) {
      return res
        .status(200)
        .json({ message: "Pesan Tidak Tersedia", mailbox: messages });
    }
    return res
      .status(200)
      .json({
        message: "Success Fetch Email",
        tersedia: messages.length,
        mailbox: messages,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch emails", error: err.message });
  }
};
