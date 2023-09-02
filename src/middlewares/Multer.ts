import { NextFunction, Response, Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, __dirname + "/uploads/");
  },

  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMulter = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },

  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error(`File format ${file.mimetype} not supported`));
    }
  },
}).single("archive");

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMulter(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    return next();
  });
};
