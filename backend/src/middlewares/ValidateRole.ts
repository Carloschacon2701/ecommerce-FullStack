import { NextFunction, Request, Response } from "express";

export const ValidateRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `Role ${role} is not allowed to perform this action`,
      });
    }
    return next();
  };
};
