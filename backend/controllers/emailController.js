import EmailAccount from "../models/EmailAccount.js";
import { fetchEmails } from "../utils/imap.js";

export const getEmails = async (req, res) => {
  const account = await EmailAccount.findById(req.params.id);
  if (!account) return res.status(404).json({ message: "Email not found" });

  if (!req.user || !req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  const user = await User.findById(req.user.id);
  if (!user.allowedEmails.includes(account._id)) {
    return res
      .status(403)
      .json({ message: "Not allowed to access this email" });
  }

  try {
    const messages = await fetchEmails(account);
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch emails", error: err.message });
  }
};
