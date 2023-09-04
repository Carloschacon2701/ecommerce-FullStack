import { Request, Response } from "express";
import { hashImportantInfo } from "../Helpers/HashImportantInfo";
import { UserModel } from "../Models/Users";

export const createUser = async (req: Request, res: Response) => {
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
