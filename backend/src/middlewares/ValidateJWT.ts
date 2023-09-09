import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const ValidateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      msg: "No token provided",
    });
  }

  try {
    console.log(authorization);
    const checkToken = jwt.verify(authorization, process.env.SECRET_KEY || "");
    const { uid, userName, role } = checkToken as JwtPayload;

    req.body.uid = uid;
    req.body.userName = userName;
    req.body.role = role;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Invalid token",
      error: error,
    });
  }
};
