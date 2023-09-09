import { Request, Response } from "express";
import { UserModel } from "../Models/Users";
import bcrypt from "bcrypt";
import { generateJWT } from "../Helpers/GenerateJWT";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User / Password are not correct - email",
      });
    }

    if (!user.active) {
      return res.status(400).json({
        msg: "User disabled",
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "Incorrect password",
      });
    }

    const jwt = await generateJWT(user.id, user.name, user.role);

    return res.json({
      msg: "Login successfully",
      token: jwt,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const newUser = new UserModel({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    return res.json({
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export { login, register };
