const fs = require("fs");

class CartManager {
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

const cartManager = new CartManager(__dirname + "/../databases/carts.json");

module.exports = { cartManager };
