import { productModel } from "./models/product.model.js";
import { cartModel } from "./models/cart.model.js";

export class ProductManager {
  async readAll() {
    try {
      const products = await productModel.find().lean();
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
      const cart = await cartModel.findById(cid).lean();
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

  async delete(cid) {
    try {
      await cartModel.findByIdAndDelete(cid);
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
          return element.product === pid;
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
}
