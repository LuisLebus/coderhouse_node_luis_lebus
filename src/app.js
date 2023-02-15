import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import startSocket from "./socket/socketManager.js";
import path from "path";
import { loader, __dirname, __filename } from "./utils.js";
import { router as cartsRouter } from "./routes/carts.routes.js";
import { router as productsRouter } from "./routes/products.routes.js";
import { router as viewsRouter } from "./routes/views.routes.js";

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configure handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(path.join(__dirname + "/public")));

//Configure routes
app.use("/", viewsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

//Start server
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server ready in http://localhost:${SERVER_PORT}`);
});

//Start socket.io
startSocket(httpServer);

//Connect to Atlas
const enviroment = async () => {
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.9lsdftr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  );

  //loader();
};

const isValidDBData = () => {
  return DB_USER && DB_PASS;
};

isValidDBData() && enviroment();
