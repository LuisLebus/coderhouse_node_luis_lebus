const express = require("express");
const cartsRouter = express.Router();

const { cartManager } = require(__dirname + "/../CartManager.js");

cartsRouter.post("/", (req, res) => {
  let err = cartManager.createCart();

  if (!err) {
    res.send({ error: "Something failed." });
  } else {
    res.send("Ok");
  }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  let cid = Number(req.params.cid);
  let pid = Number(req.params.pid);

  if (isNaN(cid) || isNaN(pid)) {
    res.send({ error: "Invalid parameter." });
  } else {
    let err = cartManager.addProductToCart(cid, pid);

    if (!err) {
      res.send({ error: "Something failed." });
    } else {
      res.send("Ok");
    }
  }
});

cartsRouter.get("/:cid", (req, res) => {
  let cid = Number(req.params.cid);

  if (isNaN(cid)) {
    res.send({ error: "Invalid parameter." });
  } else {
    let cart = cartManager.getCartById(cid);

    if (!cart) {
      res.send({ error: "Something failed." });
    } else {
      res.send(cart);
    }
  }
});

module.exports = { cartsRouter };
