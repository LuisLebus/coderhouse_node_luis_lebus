const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const { productsRouter } = require(__dirname + "/routes/productsRouter.js");
const { cartsRouter } = require(__dirname + "/routes/cartsRouter.js");
const { viewsRouter } = require(__dirname + "/routes/viewsRouter.js");
const { productManager } = require(__dirname + "/ProductManager.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

const PORT = 8080;
const httpServer = app.listen(8080, () => {
  console.log(`Server ready in http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Client connected. Id: ${socket.id}`);

  socket.emit("products", productManager.getProducts());

  socket.on("deleteProduct", (data) => {
    productManager.deleteProduct(Number(data));
    socket.emit("products", productManager.getProducts());
  });

  socket.on("addProduct", (data) => {
    productManager.addProduct(data);
    socket.emit("products", productManager.getProducts());
  });
});
