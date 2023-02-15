import { Server } from "socket.io";
import { ProductManager } from "../dao/DBManager.js";

const productManager = new ProductManager();

export default function startSocket(httpServer) {
  const socketServer = new Server(httpServer);

  //TODO: Add try and catch here
  socketServer.on("connection", async (socket) => {
    console.log(`Client connected. Id: ${socket.id}`);

    socket.emit("products", await productManager.readAll());

    socket.on("deleteProduct", async (data) => {
      productManager.delete(data);
      socket.emit("products", await productManager.readAll());
    });

    socket.on("addProduct", async (data) => {
      await productManager.create(data);
      socket.emit("products", await productManager.readAll());
    });
  });
}
