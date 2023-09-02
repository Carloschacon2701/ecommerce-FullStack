import express, { Express } from "express";
import cors from "cors";
import upload from "../Routes/upload";

export class Server {
  app: Express;
  port: number;
  paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.paths = {
      upload: "/api/upload",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.upload, upload);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
