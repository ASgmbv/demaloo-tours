import jwt from "next-auth/jwt";
import { connectToDatabase } from "../../../utils/mongodb";

const secret = process.env.JWT_SECRET;

// console.log("secret:", secret);

export const getToken = async () => {
  const token = await jwt.getToken({
    req,
    secret,
  });
  return token;
};

export async function updateUser({ userId, name, role }) {
  const { db } = await connectToDatabase();

  let update = {};
  if (name) {
    update.name = name;
  }
  if (role) {
    update.role = role;
  }

  const updateResponse = await db.collection("users").updateOne(
    { _id: userId },
    {
      $set: {
        ...update,
      },
    }
  );

  return updateResponse;
}

export default async (req, res) => {
  const token = await jwt.getToken({
    req,
    secret,
  });

  if (req.method === "PATCH") {
    try {
      if (!token.id) {
        throw new Error("Сперва нужно войти!");
      }

      let data = updateUser({
        userId: token.id,
        name: req.body.name,
        role: req.body.role,
      });

      res.status(200).json({
        status: "success",
        data: {
          data,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
  }
};
