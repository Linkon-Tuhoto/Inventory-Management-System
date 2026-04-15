const form = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const categoryINput = document.getElementById("product-category");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");

const searchInput = document.getElementById("search");
const filterInput = document.getElementById("category-filter");

const table = document.querySelector("table");
//======DATA LOADING======
let products = JSON.parse(localStorage.getItem("products")) || [];