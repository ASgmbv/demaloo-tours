const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async ({
  name,
  phone,
  count,
  tour,
  company,
  id,
}) => {
  let text = `Имя: ${name},\nТелефон: ${phone}\nКол-во человек: ${count}\nНазвание тура: ${tour}\nНазвание компании: ${company}\nid: ${id}`;

  let res = await sgMail.send({
    to: "demaloo.dev@gmail.com",
    from: "sagymbaev.dev@gmail.com",
    subject: "Demaloo - успешная регистрация на тур!",
    text,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  });

  return res;
};

export default async (req, res) => {
  if (req.method === "POST") {
    let body = req.body;

    try {
      let response = await sendRegistrationEmail({
        name: body.name,
        phone: body.phone,
        count: body.count,
        tour: body.tour,
        company: body.company,
        id: body.id,
      });

      res.status(200).json({
        status: "success",
        data: response,
      });
    } catch (error) {
      console.log("error:", error);
      res.status(500).send("error:", error);
    }
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
