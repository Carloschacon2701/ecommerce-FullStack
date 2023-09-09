import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const ValidateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({
      msg: "No token provided",
    });
  }

  try {
    const checkToken = jwt.verify(authorization, process.env.SECRET_KEY || "");
    const { uid, name } = checkToken as JwtPayload;
    console.log(checkToken);

    console.log("hola");

    req.body.uid = uid;
    req.body.name = name;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Invalid token",
      error: error,
    });
  }
};
