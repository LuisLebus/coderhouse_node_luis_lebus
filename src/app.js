const { productManager } = require("./ProductManager");
const express = require("express");

const app = express();

app.get("/products/:pid", (req, res) => {
  let pid = Number(req.params.pid);

  if (!pid) {
    res.send({ error: "Invalid parameter." });
  } else {
    res.send(productManager.getProductById(Number(req.params.pid)));
  }
});

app.get("/products/", (req, res) => {
  let limit = Number(req.query.limit);
  let products = productManager.getProducts();

  if (!limit) {
    res.send(products);
  } else {
    res.send(products.slice(0, limit));
  }
});

app.listen(8080, () => {
  console.log("Listening port 8080...");
});
