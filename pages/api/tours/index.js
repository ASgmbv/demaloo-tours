import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { categoriesMap } from "../../../utils/data";

// TODO shows how many tours in each category
// faceted search

export async function getTours({
  currentDate,
  categories = "",
  sortBy = "price",
  page = 0,
  limit = 5,
}) {
  const { db } = await connectToDatabase();

  const dateMatchStage = {
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
  };

  const lookupStage = {
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
  };

  const unwindStage = {
    $unwind: "$organizer",
  };

  const sortStage = {
    $sort: {
      [sortBy]: 1,
    },
  };

  let tours = await db
    .collection("tours")
    .aggregate([
      dateMatchStage,
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
      lookupStage,
      unwindStage,
      sortStage,
      {
        $facet: {
          data: [
            {
              $skip: Number(limit) * Number(page),
            },
            {
              $limit: Number(limit),
            },
          ],
          count: [
            {
              $count: "count",
            },
          ],
        },
      },
    ])
    .toArray();

  let { data, count } = tours[0];

  if (count.length === 0) {
    count = 0;
  } else {
    count = count[0].count;
  }

  return {
    data,
    count,
    page: Number(page),
  };
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
      const tours = await getTours({
        currentData: query.currentDate,
        categories: query.categories,
        sortBy: query.sortBy,
        page: query.page,
        limit: query.limit,
      });
      res.status(200).json({ data: tours });
    } catch (error) {
      console.log(error);
      res.status(500).send("error:", error);
    }
  } else {
    // Handle any other HTTP method
  }
};
