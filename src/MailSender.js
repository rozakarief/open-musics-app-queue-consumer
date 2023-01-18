/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
const nodemailer = require("nodemailer");
const config = require("./utils/config");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.app.host,
      port: config.app.port,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: "Open Music V3",
      to: targetEmail,
      subject: "Playlist Export",
      text: "Hasil dari export playlist terlampir",
      attachments: [
        {
          filename: "playlist.json",
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
