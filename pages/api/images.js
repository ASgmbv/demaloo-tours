import cloudinary from "../../utils/cloudinary";
import multer from "multer";

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

export default async (req, res) => {
  // run the middlewares
  await runMiddleware(req, res, upload.single("image"));

  // rest of the api logic
  if (req.method === "PATCH") {
    console.log("req.file:", req.file);
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: "fill",
      });
      console.log("image:", image);
    }
  }
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
