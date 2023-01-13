const express = require("express");
const cartsRouter = express.Router();

const { cartManager } = require(__dirname + "/../CartManager.js");

cartsRouter.post("/", (req, res) => {
  //TODO: Complete cart router
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  //TODO: Complete cart router
});

cartsRouter.get("/:cid", (req, res) => {
  //TODO: Complete cart router
});

module.exports = { cartsRouter };
