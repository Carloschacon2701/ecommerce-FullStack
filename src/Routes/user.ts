import { Router } from "express";
import { check } from "express-validator";
import { checkValidatorErrors } from "../middlewares/checkValidatorErrors";

const router = Router();

router.post("/newUser", [
  check("name", "Name Required").notEmpty(),
  check("email", "Email Required").isEmail(),
  check("role", "Role required for  creation"),
  checkValidatorErrors,
]);
