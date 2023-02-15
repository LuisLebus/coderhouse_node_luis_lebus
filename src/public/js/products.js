const cid = "63e98bc6089f4749624cb4ed"; //This is a hard-code cart id
const port = "8080";

//Add producto to cart
async function btnAddProduct(pid) {
  const url = `http://localhost:${port}/api/carts/${cid}/product/${pid}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
    });
  } catch (err) {
    throw err;
  }
}
