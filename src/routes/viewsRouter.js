const express = require("express");
const viewsRouter = express.Router();

const { productManager } = require(__dirname + "/../ProductManager.js");

viewsRouter.get("/", (req, res) => {
  res.render("home", {
    products: productManager.getProducts(),
  });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = { viewsRouter };
