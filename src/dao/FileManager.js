const fs = require("fs");

export class CartManager {
  #carts;
  #path;
  static #cartsId;

  constructor(path) {
    this.#carts = [];
    CartManager.#cartsId = 0;
    this.#path = path;

    if (fs.existsSync(this.#path)) {
      this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    }

    //Find max id in product array
    if (this.#carts.length > 0) {
      CartManager.#cartsId =
        Math.max(
          ...this.#carts.map((element) => {
            return element.id;
          })
        ) + 1;
    }
  }

  cartIdExist(id) {
    const cartExist = this.#carts.some((element) => {
      return element.id === id;
    });

    return cartExist;
  }

  createCart() {
    const cart = {
      id: CartManager.#cartsId,
      products: [],
    };

    CartManager.#cartsId++;

    //Add object to array.
    this.#carts.push(cart);
    fs.writeFileSync(this.#path, JSON.stringify(this.#carts));

    console.log("Success:", `Cart added. Id: ${cart.id}.`);

    return true;
  }

  addProductToCart(cid, pid) {
    // Check if the cart id exists.
    if (!this.cartIdExist(cid)) {
      console.log("Error:", `Cart not found. Id: ${cid}.`);
      return false;
    }

    //Find index of cart in array
    const cIndex = this.#carts.findIndex((element) => {
      return element.id === cid;
    });

    //Find index of pruduct in array
    const pIndex = this.#carts[cIndex].products.findIndex((element) => {
      return element.product === pid;
    });

    //If product already exists increment its quantity, otherwise create object and push it
    if (pIndex !== -1) {
      this.#carts[cIndex].products[pIndex].quantity++;
    } else {
      const item = { product: pid, quantity: 1 };
      this.#carts[cIndex].products.push(item);
    }

    fs.writeFileSync(this.#path, JSON.stringify(this.#carts));

    console.log("Success:", `Pruduct added. Cid: ${cid} Pid: ${pid}.`);

    return true;
  }

  getCartById(cid) {
    //Check if argument are valid.
    if (cid === undefined) {
      console.log("Error:", "Invalid argument.");
      return false;
    }

    // Check if the cart id exists.
    if (!this.cartIdExist(cid)) {
      console.log("Error:", `Cart not found. Id: ${cid}.`);
      return false;
    }

    return this.#carts.find((element) => {
      return element.id === cid;
    });
  }
}

export class ProductManager {
  #products;
  #path;
  static #pruductId;

  constructor(path) {
    this.#products = [];
    ProductManager.#pruductId = 0;
    this.#path = path;

    if (fs.existsSync(this.#path)) {
      this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    }

    //Find max id in product array
    if (this.#products.length > 0) {
      ProductManager.#pruductId =
        Math.max(
          ...this.#products.map((element) => {
            return element.id;
          })
        ) + 1;
    }
  }

  productCodeExist(code) {
    const productExist = this.#products.some((element) => {
      return element.code === code;
    });

    return productExist;
  }

  productIdExist(id) {
    const productExist = this.#products.some((element) => {
      return element.id === id;
    });

    return productExist;
  }

  addProduct(product) {
    //Check if argument are valid.
    if (!product) {
      console.log("Error:", "Invalid argument.");
      return false;
    }

    // Check if the product code exists.
    if (this.productCodeExist(product.code)) {
      console.log("Error:", `The product already exists. Code: ${product.code}.`);
      return false;
    }

    //Add id to object.
    product["id"] = ProductManager.#pruductId;
    ProductManager.#pruductId++;

    //Add object to array.
    this.#products.push(product);
    fs.writeFileSync(this.#path, JSON.stringify(this.#products));

    console.log("Success:", `Product added. Id: ${product.id}.`);

    return true;
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
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

    //Find index of product in array
    const pIndex = this.#products.findIndex((element) => {
      return element.id === id;
    });

    this.#products[pIndex].title = product.title;
    this.#products[pIndex].description = product.description;
    this.#products[pIndex].price = product.price;
    this.#products[pIndex].status = product.status;
    this.#products[pIndex].category = product.category;
    this.#products[pIndex].thumbnails = product.thumbnails;
    this.#products[pIndex].code = product.code;
    this.#products[pIndex].stock = product.stock;

    console.log(this.#products);

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
