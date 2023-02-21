const cid = "63f3ebcfc1b16b712dd39af9"; //This is a hard-code cart id
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const limit = urlParams.get("limit");
const page = urlParams.get("page");

const limitedSelect = document.getElementById("limitedSelect");
const lblPage = document.getElementById("lblPage");

limitedSelect.value = limit || "10";
lblPage.innerText = page || "1";

async function limitSelectChanged() {
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=1`;
}

const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

btnNext.addEventListener("click", () => {
  const nextPage = Number(lblPage.innerText) + 1;
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=${nextPage}`;
});

btnPrev.addEventListener("click", () => {
  const prevPage = Number(lblPage.innerText) - 1;
  window.location.href = `http://localhost:${port}/products/?limit=${limitedSelect.value}&page=${prevPage}`;
});
