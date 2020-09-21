import { connectToDatabase } from "../../../utils/mongodb";
import multer from "multer";
import cloudinary from "../../../utils/cloudinary";

const upload = multer({ dest: "/tmp" });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function createCompany({ name, logo, guides }) {
  const { db } = await connectToDatabase();

  if (name === undefined) {
    throw new Error("Название компании не указано!");
  }

  let newCompany = {
    name,
    logo,
    guides,
  };

  await db.collection("companies").insertOne(newCompany);
  return newCompany;
}

export async function getCompanies() {
  const { db } = await connectToDatabase();
  let companies = await db
    .collection("companies")
    .aggregate([
      {
        $match: {},
      },
    ])
    .toArray();

  return companies;
}

export default async (req, res) => {
  await runMiddleware(req, res, upload.single("logo"));

  let logoUrl = "";

  // upload company logo
  if (req.file) {
    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "company_logos/",
        width: 70,
        height: 70,
        crop: "fill",
        quality: "auto",
      },
      function (error, result) {
        if (!error) {
          logoUrl = result.secure_url;
        }
      }
    );
  }

  if (req.method === "GET") {
    try {
      let data = await getCompanies();

      res.status(200).json({
        status: "success",
        data: {
          results: data.length,
          data,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      let data = await createCompany({
        name: req.body?.name,
        // guides: guides?.map((guide) => JSON.parse(guide)),
        logo: logoUrl,
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
  } else if (req.method === "PATCH") {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
