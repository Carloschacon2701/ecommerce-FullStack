import express, { Express } from "express";
import cors from "cors";
import upload from "../Routes/upload";
import products from "../Routes/products";
import { connectToDatabase } from "../Database/config";

export class Server {
  app: Express;
  port: number;
  paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.paths = {
      upload: "/api/upload",
      products: "/api/products",
    };

    this.middlewares();
    this.routes();
    this.databaseConnection();
  }

  async databaseConnection() {
    await connectToDatabase();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.upload, upload);
    this.app.use(this.paths.products, products);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
