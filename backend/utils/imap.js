import dotenv from "dotenv";
dotenv.config();
import imaps from "imap-simple";
import { simpleParser } from "mailparser";

export const fetchEmails = async (filterEmail) => {
  const config = {
    imap: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      host: "imap.gmail.com",
      port: 993,
      authTimeout: 10000,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    },
  };

  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = ["ALL", ["TO", filterEmail]];

    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],
      markSeen: false,
    };

    const results = await connection.search(searchCriteria, fetchOptions);
    console.log(results);
    const messages = await Promise.all(
      results.map(async (item) => {
        const all = item.parts.find((part) => part.which === "");
        console.log(item);
        const parsed = await simpleParser(all.body);

        if (parsed.date > oneDayAgo) {
          if (!filterEmail || parsed.from.text.includes(filterEmail)) {
            return {
              subject: parsed.subject,
              from: parsed.from.text,
              date: parsed.date,
              text: parsed.text,
            };
          }
        }
        return null;
      })
    );

    await connection.end();
    return messages.filter((msg) => msg !== null);
  } catch (err) {
    throw new Error("IMAP error: " + err.message);
  }
};
