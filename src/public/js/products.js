const cid = "63f3ebcfc1b16b712dd39af9"; //This is a hard-code cart id
const port = "8080";

//Add producto to cart
async function btnAddProduct(pid) {
  const url = `http://localhost:${port}/api/carts/${cid}/product/${pid}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
    });

    alert(`Se agregó el producto al carrito!`);
  } catch (err) {
    throw err;
  }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const limit = urlParams.get("limit");
const page = urlParams.get("page");
const sort = urlParams.get("sort");
const filterVal = urlParams.get("filter");
const filterField = urlParams.get("filterField");

const limitedSelect = document.getElementById("limitedSelect");
const lblPage = document.getElementById("lblPage");
const sortSelect = document.getElementById("sortSelect");
const filterValSelect = document.getElementById("filterValSelect");

limitedSelect.value = limit || "10";
lblPage.innerText = page || "1";
sortSelect.value = sort || "1";
filterValSelect.value = filterVal || "all";

async function limitSelectChanged() {
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=1&sort=${sortSelect.value}&filter=${filterValSelect.value}&filterField=category`;
}

async function sortSelectChanged() {
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=${lblPage.innerText}&sort=${sortSelect.value}&filter=${filterValSelect.value}&filterField=category`;
}

async function filterValSelectChanged() {
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=1&sort=${sortSelect.value}&filter=${filterValSelect.value}&filterField=category`;
}

const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

btnNext.addEventListener("click", () => {
  const nextPage = Number(lblPage.innerText) + 1;
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=${nextPage}&sort=${sortSelect.value}&filter=${filterValSelect.value}&filterField=category`;
});

btnPrev.addEventListener("click", () => {
  const prevPage = Number(lblPage.innerText) - 1;
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=${prevPage}&sort=${sortSelect.value}&filter=${filterValSelect.value}&filterField=category`;
});

const btnCart = document.getElementById("btnCart");

btnCart.addEventListener("click", () => {
  window.location.href = `http://localhost:${port}/carts/${cid}`;
});
