const fs = require("fs");

class ProductManager {
  #products;
  #path;
  #pathId;
  static #pruductId;

  constructor(path) {
    this.#products = [];
    ProductManager.#pruductId = 0;
    this.#path = path;

    let dotPosition = this.#path.lastIndexOf(".");

    //This file is used to save the product id.
    this.#pathId =
      this.#path.substring(0, dotPosition) +
      "Id" +
      this.#path.substring(dotPosition, this.#path.length);

    if (fs.existsSync(this.#path)) {
      this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    }

    if (fs.existsSync(this.#pathId)) {
      ProductManager.#pruductId = JSON.parse(
        fs.readFileSync(this.#pathId, "utf-8")
      );
    }
  }

  productCodeExist(code) {
    let productExist = this.#products.some((element) => {
      return element.code === code;
    });

    return productExist;
  }

  productIdExist(id) {
    let productExist = this.#products.some((element) => {
      return element.id === id;
    });

    return productExist;
  }

  addProduct(product) {
    //Check if argument are valid.
    if (!product) {
      console.log("Error:", "Invalid argument.");
      return;
    }

    // Check if the product code exists.
    if (this.productCodeExist(product.code)) {
      console.log(
        "Error:",
        `The product already exists. Code: ${product.code}.`
      );
      return;
    }

    //Add id to object.
    product["id"] = ProductManager.#pruductId;

    //Add object to array.
    this.#products.push(product);
    fs.writeFileSync(this.#path, JSON.stringify(this.#products));

    ProductManager.#pruductId++;
    fs.writeFileSync(this.#pathId, JSON.stringify(ProductManager.#pruductId));

    console.log("Success:", `Product added. Code: ${product.code}.`);
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    //Check if argument are valid.
    if (id === undefined) {
      console.log("Error:", "Invalid argument.");
      return;
    }

    // Check if the product id exists.
    if (!this.productIdExist(id)) {
      console.log("Error:", `Product not found. Id: ${id}.`);
      return `Product not found. Id: ${id}.`;
    }

    return this.#products.find((element) => {
      return element.id === id;
    });
  }

  updateProduct(id, product) {
    //Check if argument are valid.
    if (id === undefined || !product) {
      console.log("Error:", "Invalid argument.");
      return false;
    }

    // Check if the product id exists.
    if (!this.productIdExist(id)) {
      console.log("Error:", `Product not found. Id: ${id}.`);
      return false;
    }

    const temp_id = id;

    this.deleteProduct(id);

    //Add id to object.
    product["id"] = temp_id;

    //Add object to array.
    this.#products.push(product);

    console.log("Success:", `Product updated. Id: ${id}.`);

    fs.writeFileSync(this.#path, JSON.stringify(this.#products));

    return true;
  }

  deleteProduct(id) {
    //Check if argument are valid.
    if (id === undefined) {
      console.log("Error:", "Invalid argument.");
      return false;
    }

    // Check if the product id exists.
    if (!this.productIdExist(id)) {
      console.log("Error:", `Product not found. Id: ${id}.`);
      return false;
    }

    //Remove object from array.
    this.#products = this.#products.filter((element) => {
      return element.id !== id;
    });

    console.log("Success:", `Product deleted. Id: ${id}.`);

    fs.writeFileSync(this.#path, JSON.stringify(this.#products));

    return true;
  }
}

const productManager = new ProductManager(
  __dirname + "/../databases/products.json"
);

module.exports = { productManager };
