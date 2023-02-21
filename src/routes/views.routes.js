import { Router } from "express";
import { ProductManager, CartManager } from "../dao/DBManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
export const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.readAll(10, 1, null, null, 1);

    res.render("home", {
      products: products.docs,
    });
  } catch (err) {
    throw err;
  }
});

router.get("/products", async (req, res) => {
  const limitVal = req.query.limit || "10";
  const pageVal = req.query.page || "1";
  const filterVal = req.query.filter;
  const filterField = req.query.filterField;
  const sortVal = req.query.sort || "1";

  try {
    const products = await productManager.readAll(
      limitVal,
      pageVal,
      filterField,
      filterVal,
      sortVal
    );

    res.render("products", {
      products: products.docs,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;

  if (!cid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const car = await cartManager.read(cid);

      res.render("cart", {
        cart: await cartManager.read(cid),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});
