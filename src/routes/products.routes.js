import { Router } from "express";
import { ProductManager } from "../dao/DBManager.js";

const productManager = new ProductManager();
export const router = Router();

router.get("/", async (req, res) => {
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

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  if (!pid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const product = await productManager.read(pid);

      if (!product) {
        res.status(500).send({ message: "Something failed" });
      } else {
        res.status(200).send(product);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = req.body;

  if (!pid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await productManager.update(pid, product);

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

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  if (!pid) {
    res.status(400).send({ message: "Invalid parameters" });
  } else {
    try {
      const result = await productManager.delete(pid);

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

router.post("/", async (req, res) => {
  const product = req.body;

  //TODO: Check if the product code already exists before creating it, if so reject the operation.

  try {
    const result = await productManager.create(product);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
