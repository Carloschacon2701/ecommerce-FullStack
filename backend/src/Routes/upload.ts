import express from "express";
import { uploadArchive, getArchive } from "../Controllers/upload";
import { validateErrors } from "../middlewares/ValidateErrors";

const router = express.Router();

router.post("/", [validateErrors], uploadArchive);

router.get("/", [], getArchive);

export default router;
