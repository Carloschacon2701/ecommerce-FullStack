import { Request, Response } from "express";

const uploadArchive = async (req: Request, res: Response) => {
  console.log(req.file);
  res.json({ message: "File uploaded successfully" });
};

const getArchive = async (_req: Request, res: Response) => {
  res.json({ message: "File downloaded successfully" });
};

export { uploadArchive, getArchive };
