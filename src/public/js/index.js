const mainDiv = document.getElementById("mainDiv");

const socket = io();

socket.on("products", (data) => {
  mainDiv.innerHTML = "";
  data.forEach((element) => {
    mainDiv.innerHTML += `
      <div>
          <h4>${element.title}</h3>
          <h5>Descripción: ${element.description}</h5>
          <h5>Código: ${element.code}</h5>
          <h5>Id: ${element.id}</h5>
      </div>`;
  });
});

const btnDelProduct = document.getElementById("btnDelProduct");
const inputDelProd = document.getElementById("inputDelProd");

btnDelProduct.addEventListener("click", () => {
  socket.emit("deleteProduct", inputDelProd.value);
});

const btnAddProduct = document.getElementById("btnAddProduct");
const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const inputCode = document.getElementById("inputCode");

btnAddProduct.addEventListener("click", () => {
  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: 123,
    status: true,
    category: "home",
    thumbnails: ["no"],
    code: inputCode.value,
    stock: 46,
  };

  socket.emit("addProduct", product);
});
