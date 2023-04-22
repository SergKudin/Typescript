import { RequestHandler } from "express";
import multer, { Multer } from "multer";

const pathImage = "./src/HTML/img/temp";

// settings multer
const multerOptions: multer.Options = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathImage);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg") {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  }
}


const upload: Multer = multer(multerOptions);
export const typeMulter: RequestHandler = upload.single("file");

