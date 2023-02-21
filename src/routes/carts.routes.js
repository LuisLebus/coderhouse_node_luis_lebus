import { Router } from "express";
import { CartManager } from "../dao/DBManager.js";

const cartManager = new CartManager();
export const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await cartManager.create();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (!cid || !pid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await cartManager.update(cid, pid);

      if (!result) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send({ message: "Ok" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  if (!cid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const cart = await cartManager.read(cid);

      if (!cart) {
        res.status(500).send({ message: "Cart not found" });
      } else {
        res.status(200).send(cart);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (!cid || !pid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await cartManager.delete(cid, pid);

      if (!result) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send({ message: "Ok" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  if (!cid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await cartManager.deleteAll(cid);

      if (!result) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send({ message: "Ok" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;

  if (!cid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await cartManager.updateAll(cid, products);

      if (!result) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send({ message: "Ok" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;

  console.log(cid);

  console.log(pid);

  console.log(quantity);

  if (!cid || !pid || !quantity) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await cartManager.updateQuantity(cid, pid, quantity);

      if (!result) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send({ message: "Ok" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});
