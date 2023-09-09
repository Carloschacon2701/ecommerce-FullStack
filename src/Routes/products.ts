import { Router } from "express";
import { createNewProduct } from "../Controllers/products";
import { ValidateJWT } from "../middlewares/ValidateJWT";

const router = Router();

router.post("/new-product", [ValidateJWT], createNewProduct);

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGZjOTZlYWY1OTNjNTM5YWNhZmI4ZmIiLCJuYW1lIjoiQ2FybG9zIGNoYWNvbiIsImlhdCI6MTY5NDI3NTM5MiwiZXhwIjoxNjk0MjgyNTkyfQ.v5qn0OKb2EepAGbQTSimERA-5otZ9yONx7KhqZEltTg
