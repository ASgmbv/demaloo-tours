// import { sgMail } from "../../utils/email";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);
const msg = {
  to: "sagymbaev.dev@gmail.com",
  from: "demaloo.dev@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

export default async (req, res) => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log("error:", error);
  }
};

// export default async (req, res) => {
//   if (req.method === "POST") {
//     const body = req.body;

//     try {
//       await sendRegistrationForm({
//         name: body.name,
//         phone: body.phone,
//         count: body.count,
//         tour: body.tour,
//         company: body.company,
//       });
//       res.status(201).json({
//         status: "success",
//       });
//     } catch (error) {
//       console.log("error:", error);
//       res.status(500).json({ error: error.message });
//     }
//   }
// };
