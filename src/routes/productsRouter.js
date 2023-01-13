const express = require("express");
const productsRouter = express.Router();

const { productManager } = require(__dirname + "/../ProductManager.js");

productsRouter.get("/", (req, res) => {
  let limit = Number(req.query.limit);
  let products = productManager.getProducts();

  if (!limit) {
    res.send(products);
  } else {
    res.send(products.slice(0, limit));
  }
});

productsRouter.get("/:pid", (req, res) => {
  let pid = Number(req.params.pid);

  if (!pid) {
    res.send({ error: "Invalid parameter." });
  } else {
    res.send(productManager.getProductById(Number(pid)));
  }
});

productsRouter.put("/:pid", (req, res) => {
  let pid = Number(req.params.pid);
  let product = req.body;

  if (!pid) {
    res.send({ error: "Invalid parameter." });
  } else {
    let err = productManager.updateProduct(pid, product);

    if (!err) {
      res.send({ error: "Something failed." });
    } else {
      res.send("Ok");
    }
  }
});

productsRouter.delete("/:pid", (req, res) => {
  let pid = Number(req.params.pid);

  if (!pid) {
    res.send({ error: "Invalid parameter." });
  } else {
    let err = productManager.deleteProduct(pid);

    if (!err) {
      res.send({ error: "Something failed." });
    } else {
      res.send("Ok");
    }
  }
});

module.exports = { productsRouter };
