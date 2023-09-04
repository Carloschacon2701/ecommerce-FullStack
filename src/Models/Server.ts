import express, { Express } from "express";
import cors from "cors";
import { upload, products, users } from "../Routes/index";

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
      users: "/api/users",
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
    this.app.use(this.paths.users, users);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
