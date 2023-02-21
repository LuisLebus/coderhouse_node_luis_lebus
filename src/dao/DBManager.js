import { productModel } from "./models/product.model.js";
import { cartModel } from "./models/cart.model.js";
import { query } from "express";

export class ProductManager {
  async readAll(limitVal, pageVal, filterField, filterVal, sortVal) {
    const query = {};

    if (filterVal && filterField) {
      query[`${filterField}`] = filterVal;
    }

    try {
      const products = await productModel.paginate(query, {
        lean: true,
        limit: limitVal,
        page: pageVal,
        sort: { price: sortVal },
      });
      return products;
    } catch (err) {
      throw err;
    }
  }

  async read(pid) {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async create(product) {
    try {
      const newProduct = new productModel(product);
      await newProduct.save();
      return newProduct;
    } catch (err) {
      throw err;
    }
  }

  async delete(pid) {
    try {
      await productModel.findByIdAndDelete(pid);
      return true;
    } catch (err) {
      throw err;
    }
  }

  async update(pid, newProduct) {
    try {
      const product = await productModel.findById(pid);

      if (product) {
        await productModel.findByIdAndUpdate(pid, newProduct);
        return true;
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      throw err;
    }
  }
}

export class CartManager {
  async read(cid) {
    try {
      const cart = await cartModel
        .findById(cid)
        .populate("products.product")
        .lean();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async create() {
    try {
      const newCart = new cartModel();
      await newCart.save();
      return newCart;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll(cid) {
    try {
      const cart = await cartModel.findById(cid);

      if (cart) {
        cart.products = [];

        await cartModel.findByIdAndUpdate(cid, cart);

        return true;
      } else {
        throw new Error("Cart not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);

      if (cart) {
        //Check if product exists in this cid
        const productExist = cart.products.some((element) => {
          return element.product.toString() === pid;
        });

        if (!productExist) {
          throw new Error("Product not found");
        }

        //Filter to remove pid from cid
        const filteredProducts = cart.products.filter((element) => {
          return element.product.toString() !== pid;
        });

        cart.products = filteredProducts;

        await cartModel.findByIdAndUpdate(cid, cart);

        return true;
      } else {
        throw new Error("Cart not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async update(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);

      if (cart) {
        //Find index of pruduct in array
        const pIndex = cart.products.findIndex((element) => {
          return element.product.toString() === pid;
        });

        //If product already exists increment its quantity, otherwise create object and push it
        if (pIndex !== -1) {
          cart.products[pIndex].quantity++;
        } else {
          const item = { product: pid, quantity: 1 };
          cart.products.push(item);
        }

        await cartModel.findByIdAndUpdate(cid, cart);

        return true;
      } else {
        throw new Error("Cart not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async updateAll(cid, products) {
    try {
      await this.deleteAll(cid);

      for (const element of products) {
        for (let i = 0; i < element.quantity; i++) {
          await this.update(cid, element.product);
        }
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);

      if (cart) {
        //Check if product exists in this cid
        const productExist = cart.products.some((element) => {
          console.log(element);
          return element.product.toString() === pid;
        });

        if (!productExist) {
          throw new Error("Product not found");
        }

        //Find index of pruduct in array
        const pIndex = cart.products.findIndex((element) => {
          return element.product.toString() === pid;
        });

        //Update quantity
        cart.products[pIndex].quantity = quantity;

        await cartModel.findByIdAndUpdate(cid, cart);

        return true;
      } else {
        throw new Error("Cart not found");
      }
    } catch (err) {
      throw err;
    }
  }
}
