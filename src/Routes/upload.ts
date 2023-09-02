import express from "express";
import { uploadMiddleware } from "../middlewares/Multer";
import { uploadArchive } from "../Controllers/upload";
import { validateErrors } from "../middlewares/ValidateErrors";

const router = express.Router();

router.post("/", [uploadMiddleware, validateErrors], uploadArchive);

export default router;