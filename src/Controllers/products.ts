import { Request, Response } from "express";
import { ProductModel } from "../Models/Product";

export const createNewProduct = async (req: Request, res: Response) => {
  const body = req.body;

  const product = new ProductModel(body);
  await product.save();

  return res.json({
    msg: "Product created successfully",
  });
};
