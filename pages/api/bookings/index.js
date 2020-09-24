import { connectToDatabase } from "../../../utils/mongodb";

export async function createBooking({ name, phone, count, tour, company }) {
  const { db } = await connectToDatabase();

  let newBooking = {
    name,
    phone,
    count,
    tour,
    company,
  };

  await db.collection("bookings").insertOne(newBooking);
  return newBooking;
}

// TODO add time
// add id to email

export default async (req, res) => {
  if (req.method === "POST") {
    console.log("bookings body:", req.body);

    const { name, phone, count, tour, company } = req.body;

    try {
      let data = await createBooking({
        name,
        phone,
        count,
        tour,
        company,
        createdAt: new Date(),
      });

      res.status(201).json({
        status: "success",
        data: {
          data,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
