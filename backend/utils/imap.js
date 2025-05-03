import Imap from "imap";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const fetchEmails = (filterEmail) => {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      host: "imap.gmail.com",
      port: 993,
      authTimeout: 60000,
      tls: false,
    });
    console.log(process.env.EMAIL_USER);
    const messages = [];

    function openInbox(cb) {
      imap.openBox("INBOX", true, cb);
    }

    imap.once("ready", () => {
      openInbox((err, box) => {
        if (err) return reject(err);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        imap.search(["ALL", ["SINCE", today]], (err, results) => {
          if (err || !results || results.length === 0) {
            imap.end();
            return resolve([]);
          }

          const fetch = imap.fetch(results.slice(-50), {
            bodies: "",
            struct: true,
          });

          fetch.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (!err && parsed.date) {
                  const now = new Date();
                  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

                  // Filter email by time and optional sender email
                  if (parsed.date > oneHourAgo) {
                    if (
                      !filterEmail ||
                      parsed.from.text.includes(filterEmail)
                    ) {
                      messages.push({
                        subject: parsed.subject,
                        from: parsed.from.text,
                        date: parsed.date,
                        text: parsed.text,
                      });
                    }
                  }
                }
              });
            });
          });

          fetch.once("end", () => {
            imap.end();
            resolve(messages);
          });
        });
      });
    });

    imap.once("error", (err) => reject(err));
    imap.connect();
  });
};
