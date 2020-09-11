import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function getAllTours() {
  // aggregate
  const { db } = await connectToDatabase();
  // const tours = [];
  // let cursor = db.collection("tours").find({});
  // await cursor.forEach(function (doc) {
  //   tours.push(doc);
  // });
  let tours = await db
    .collection("tours")
    .aggregate([
      {
        $lookup: {
          from: "companies",
          let: {
            id: "$organizer",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$id"],
                },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          as: "organizer",
        },
      },
      {
        $unwind: "$organizer",
      },
    ])
    .toArray();

  return tours;
}

export async function getTour(id) {
  const { db } = await connectToDatabase();
  let tour = await db
    .collection("tours")
    .aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "companies",
          let: {
            id: "$organizer",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$id"],
                },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          as: "organizer",
        },
      },
      {
        $unwind: "$organizer",
      },
    ])
    .next();

  return tour;
}

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const tours = await getData();
      res.status(200).json(tours);
    } catch (error) {
      res.status(500).send("error");
    }
  } else {
    // Handle any other HTTP method
  }
};
