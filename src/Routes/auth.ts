import { Router } from "express";
import { check } from "express-validator";
import { validateErrors } from "../middlewares/ValidateErrors";
import { login, register } from "../Controllers/Auth";

const router = Router();

router.post(
  "/authenticate",
  [
    check("email", "Email Required").isEmail(),
    check("password", "Password Required").notEmpty(),
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "Name Required").notEmpty(),
    check("email", "Email Required").isEmail(),
    check("password", "Password Required").notEmpty(),
    check("role", "Role Required")
      .notEmpty()
      .custom((role) => {
        if (role !== "ADMIN_ROLE" && role !== "USER_ROLE") {
          throw new Error("Invalid Role");
        }
        return true;
      }),
    validateErrors,
  ],
  register
);

export default router;
