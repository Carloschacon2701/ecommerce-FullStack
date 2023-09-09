import { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.cid = _id;
  return category;
};
