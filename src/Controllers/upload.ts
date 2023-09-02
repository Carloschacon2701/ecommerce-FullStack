import { Request, Response } from "express";

const uploadArchive = async (req: Request, res: Response) => {
  console.log(req.file);
  res.json({ message: "File uploaded successfully" });
};

export { uploadArchive };
