import express from "express";
import { uploadMiddleware } from "../middlewares/Multer";
import { uploadArchive } from "../Controllers/upload";
import { validateErrors } from "../middlewares/ValidateErrors";
import { existsSync } from "fs";

const router = express.Router();

router.post("/", [uploadMiddleware, validateErrors], uploadArchive);

router.get("/", (req, res) => {
  const { path } = req.query;

  const exist = existsSync(path as string);

  if (exist) {
    return res.sendFile(path as string);
  }

  res.json({ message: "File downloaded successfully" });
});

export default router;
