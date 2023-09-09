import { Request, Response } from "express";
import { ProductModel } from "../Models/Product";
import { CategoryModel } from "../Models/Category";

const createNewProduct = async (req: Request, res: Response) => {
  const body = req.body;

  const product = new ProductModel(body);
  await product.save();

  return res.json({
    msg: "Product created successfully",
  });
};

const createNewCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await CategoryModel.findOne({ name });

  if (category) {
    return res.status(400).json({
      msg: "Category already exists",
    });
  }

  const newCategory = new CategoryModel({ name });
  await newCategory.save();

  return res.json({
    msg: "Category created successfully",
  });
};

export { createNewProduct, createNewCategory };
