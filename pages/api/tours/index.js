import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { categoriesMap } from "../../../utils/data";

export async function getAllTours(
  currentDate,
  duration = 1,
  categories = "",
  sortBy = "price"
) {
  const { db } = await connectToDatabase();

  let tours = await db
    .collection("tours")
    .aggregate([
      {
        $match: {
          $expr: {
            $gte: [
              {
                $dateFromString: {
                  dateString: {
                    $arrayElemAt: ["$dates", 0],
                  },
                },
              },
              {
                $dateFromString: {
                  dateString: currentDate,
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          $expr: {
            $gte: ["$duration", Number(duration)],
          },
        },
      },
      {
        $match: {
          $expr: {
            $in: [
              true,
              {
                $map: {
                  input: "$categories",
                  in: {
                    $in: [
                      "$$this",
                      categories === ""
                        ? [...Array(categoriesMap.length).keys()]
                        : categories.split(",").map((item) => Number(item)),
                    ],
                  },
                },
              },
            ],
          },
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
      {
        $sort: {
          [sortBy]: 1,
        },
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
  const query = req.query;
  if (req.method === "GET") {
    try {
      const tours = await getAllTours(
        query.currentDate,
        query.duration,
        query.categories,
        query.sortBy
      );
      res.status(200).json(tours);
    } catch (error) {
      res.status(500).send("error");
    }
  } else {
    // Handle any other HTTP method
  }
};
