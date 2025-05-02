import Imap from "imap";
import { simpleParser } from "mailparser";

export const fetchEmails = (account) => {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: account.username,
      password: account.password,
      host: account.imapHost,
      port: account.imapPort,
      tls: account.ssl,
    });

    function openInbox(cb) {
      imap.openBox("INBOX", true, cb);
    }

    const messages = [];

    imap.once("ready", () => {
      openInbox((err) => {
        if (err) return reject(err);
        const f = imap.seq.fetch("1:10", { bodies: "", struct: true });

        f.on("message", (msg) => {
          msg.on("body", (stream) => {
            simpleParser(stream, (err, parsed) => {
              if (!err) {
                messages.push({
                  subject: parsed.subject,
                  from: parsed.from.text,
                  date: parsed.date,
                  text: parsed.text,
                });
              }
            });
          });
        });

        f.once("end", () => {
          imap.end();
          resolve(messages);
        });
      });
    });

    imap.once("error", (err) => reject(err));
    imap.connect();
  });
};
