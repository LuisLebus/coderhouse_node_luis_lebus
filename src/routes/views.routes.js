import { Router } from "express";
import { ProductManager, CartManager } from "../dao/DBManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
export const router = Router();

router.get("/", async (req, res) => {
  try {
    res.render("home", {
      products: await productManager.readAll(),
    });
  } catch (err) {
    throw err;
  }
});

router.get("/products", async (req, res) => {
  try {
    res.render("products", {
      products: await productManager.readAll(),
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;

  console.log(cid);

  if (!cid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const car = await cartManager.read(cid);
      console.log(car);

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
