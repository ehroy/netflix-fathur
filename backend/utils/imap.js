import dotenv from "dotenv";
dotenv.config();
import imaps from "imap-simple";
import moment from "moment";
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
  console.log(config);

  try {
    const oneHourAgo = moment().subtract(24, "hour");
    const today = moment().startOf("day").toDate();
    const sevenDaysAgo = moment().subtract(2, "days").toDate();
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = [
      "ALL",
      ["TO", filterEmail.toLowerCase()],
      ["SINCE", sevenDaysAgo.toUTCString()],
    ];

    const fetchOptions = {
      bodies: ["HEADER", "TEXT", ""],
      markSeen: false,
    };

    const results = await connection.search(searchCriteria, fetchOptions);
    console.log(results);
    const parsedEmails = await Promise.all(
      results.map(async (email) => {
        const headerPart = email.parts.find((part) => part.which === "HEADER");
        const rawPart = email.parts.find((part) => part.which === ""); // Ini raw MIME

        const headers = headerPart?.body;

        // Parse isi email menggunakan mailparser
        let textBody = "";
        if (rawPart?.body) {
          const parsed = await simpleParser(rawPart.body);
          textBody = parsed.text || parsed.html || "";
        }

        return {
          subject: headers?.subject?.[0] || "",
          to: headers?.to?.[0] || "",
          date: email.attributes.date,
          body: textBody, // ✅ Hasil parsing body text
        };
      })
    );

    console.log("Email dari 1 jam terakhir dan pengirim:", parsedEmails);

    await connection.end();
    return parsedEmails;
  } catch (err) {
    throw new Error("IMAP error: " + err.message);
  }
};
