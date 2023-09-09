import { Server } from "./Models/Server";
import { config } from "dotenv";

config();

const server = new Server();

server.listen();
