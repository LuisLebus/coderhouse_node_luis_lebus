import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import { ProductManager } from "./dao/DBManager.js";

const productManager = new ProductManager();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export async function loader() {
  for (let i = 0; i < 60; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productMaterial(),
      price: faker.commerce.price(100, 700, 0),
      status: true,
      category: faker.commerce.department(),
      code: faker.finance.amount(1, 300, 0),
      stock: faker.finance.amount(1, 50, 0),
      thumbnails: [],
    };

    try {
      await productManager.create(product);
    } catch (err) {
      throw err;
    }
  }
}
