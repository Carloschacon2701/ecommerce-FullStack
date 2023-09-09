import { Request, Response } from "express";
import { existsSync } from "fs";

const uploadArchive = async (req: Request, res: Response) => {
  console.log(req.file);

  res.json({ message: "File uploaded successfully" });
};

const getArchive = async (req: Request, res: Response) => {
  const { path } = req.query;

  const exist = existsSync(path as string);

  if (exist) {
    return res.sendFile(path as string);
  }

  res.json({ message: "File not found" });
};

export { uploadArchive, getArchive };
