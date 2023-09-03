import { Router } from "express";
import { createNewProduct } from "../Controllers/products";

const router = Router();

router.post("/new-product", createNewProduct);

export default router;
