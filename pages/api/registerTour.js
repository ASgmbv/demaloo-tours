import { sendRegistrationForm } from "../../utils/email";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;

    try {
      await sendRegistrationForm({
        name: body.name,
        phone: body.phone,
        count: body.count,
        tour: body.tour,
        company: body.company,
      });
      res.status(201).json({
        status: "success",
      });
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ error: error.message });
    }
  }
};
