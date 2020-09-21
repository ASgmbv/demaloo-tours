import nodemailer from "nodemailer";

export const sendRegistrationForm = ({ name, phone, count, tour, company }) => {
  let text = `name: ${name}, \nphone: ${phone}\n count: ${count}\n tour: ${tour}\n company: ${company}`;

  let receivers = ["alimbeksagymbaev@gmail.com", "alamanov9921@gmail.com"];

  return new Promise((resolve, reject) => {
    nodemailer
      .createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      })
      .sendMail(
        {
          to: receivers,
          from: "demaloo.dev@gmail.com",
          subject: `New Tour Registration`,
          text,
        },
        (error) => {
          if (error) {
            return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
          }
          return resolve();
        }
      );
  });
};
