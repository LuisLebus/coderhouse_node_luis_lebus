const express = require("express");
const productsRouter = express.Router();

const { productManager } = require(__dirname + "/../ProductManager.js");

productsRouter.get("/", (req, res) => {
  let products = productManager.getProducts();

  if (req.query.limit !== undefined) {
    let limit = Number(req.query.limit);

    if (isNaN(limit)) {
      res.send({ error: "Invalid parameter." });
    } else {
      res.send(products.slice(0, limit));
    }
  } else {
    res.send(products);
  }
});

productsRouter.get("/:pid", (req, res) => {
  let pid = Number(req.params.pid);

  if (isNaN(pid)) {
    res.send({ error: "Invalid parameter." });
  } else {
    let product = productManager.getProductById(pid);

    if (!product) {
      res.send({ error: "Something failed." });
    } else {
      res.send(product);
    }
  }
});

productsRouter.put("/:pid", (req, res) => {
  let pid = Number(req.params.pid);
  let product = req.body;

  if (isNaN(pid)) {
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

  if (isNaN(pid)) {
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

productsRouter.post("/", (req, res) => {
  let product = req.body;
  let err = productManager.addProduct(product);

  if (!err) {
    res.send({ error: "Something failed." });
  } else {
    res.send("Ok");
  }
});

module.exports = { productsRouter };
