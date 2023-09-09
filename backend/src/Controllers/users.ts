import { Request, Response } from "express";
import { hashImportantInfo } from "../Helpers/HashImportantInfo";
import { UserModel } from "../Models/Users";
import { uploadMulter } from "../middlewares/Multer";
// import { uploadArchive } from "./upload";

const createUser = async (req: Request, res: Response) => {
  const { active, role, ...rest } = req.body;

  const hashedPassword = await hashImportantInfo(rest.password);

  rest.password = hashedPassword;

  const user = new UserModel(rest);

  await user.save();

  res.json({
    msg: "User created successfully",
    user,
  });
};

const uploadPhoto = async (req: Request, res: Response) => {
  const uid = req.body.uid;

  const user = await UserModel.findById(uid);

  if (!user) {
    return res.status(400).json({
      msg: "User not found",
    });
  }

  return uploadMulter(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        msg: "Error uploading photo",
        error: err,
      });
    }

    const update = await UserModel.findByIdAndUpdate(
      uid,
      {
        profileImage: req.file?.path,
      },
      { new: true }
    );

    return res.json({
      msg: "Photo uploaded successfully",
      photo: req.body.filePath,
      update,
    });
  });
};

const getUserPhoto = async (req: Request, res: Response) => {
  const { uid } = req.body;

  const user = await UserModel.findById(uid);

  if (!user) {
    return res.status(400).json({
      msg: "User not found",
    });
  }

  return res.sendFile(user.profileImage || "");
};

export { createUser, uploadPhoto, getUserPhoto };
