import { Router } from "express";
import { check } from "express-validator";
import { checkValidatorErrors } from "../middlewares/checkValidatorErrors";
import { createUser } from "../Controllers/users";

const router = Router();

router.post(
  "/newUser",
  [
    check("name", "Name Required").notEmpty(),
    check("email", "Email Required").isEmail(),
    check("role", "Role required for  creation"),
    checkValidatorErrors,
  ],
  createUser
);

export default router;
