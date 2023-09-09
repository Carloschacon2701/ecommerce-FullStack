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
    const checkToken = jwt.verify(authorization, process.env.SECRET_KEY || "");
    const { uid, name } = checkToken as JwtPayload;

    req.body.user.uid = uid;
    req.body.user.name = name;

    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};
