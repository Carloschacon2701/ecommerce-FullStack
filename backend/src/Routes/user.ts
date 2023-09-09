import { Router } from "express";
import { check } from "express-validator";
import { checkValidatorErrors } from "../middlewares/checkValidatorErrors";
import { createUser, getUserPhoto, uploadPhoto } from "../Controllers/users";
import { ValidateJWT } from "../middlewares/ValidateJWT";

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

router.post("/upload-photo", [ValidateJWT], uploadPhoto);

router.get("/get-photo", [ValidateJWT], getUserPhoto);

export default router;
