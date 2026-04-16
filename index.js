const form = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const categoryInput = document.getElementById("product-category");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");

const searchInput = document.getElementById("search");
const filterInput = document.getElementById("category-filter");

const table = document.querySelector("table");
//======DATA LOADING======
let products = JSON.parse(localStorage.getItem("products")) || [];

//======ADDING PRODUCT======
form.addEventListener("submit", function (e){
    e.preventDefault();

    const product = {
        name: nameInput.value.trim(),
        category: categoryInput.value,
        price: Number(priceInput.value),
        quantity: Number(quantityInput.value)
    };

    if (!product.name || !product.category){
        alert("Please fill all fields");
        return;
    }

    products.push(product);

    saveToStorage();
    displayProducts();

    form.reset();
});
function saveToStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}
//------DISPLAYING------
function displayProducts(list = products){
    table.innerHTML = `
    <table>
    <tr>
    <th>Product</th>
    <th>Category</th>
    <th>Price</th>
    <th>Stock</th>
    <th>Actions</th>
    </tr>
    </table>
    `;
    list.forEach((product,index) => {
        const row = `
        <tr class="">
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>Ksh.${product.price.toFixed(2)}</td>
        <td class="${product.quantity < 5 ? 'Low-stock' : ''}">${product.quantity}</td>
        <td class="action">
        <button class="edit" onclick="editProduct(${index})">Edit</button>
        <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
        </tr>
        `;
        table.innerHTML += row;
    });
    updateSummary();
}
//------DELETING------
function deleteProduct(index){
    if(!confirm("Delete this product?")){
        return;
    }
    products.splice(index,1);
    saveToStorage();
    displayProducts();
}

//-----EDITING------
function editProduct(index){
    const product = products[index];

    const newName = prompt("Edit name:", product.name);
    const newCategory = prompt("Edit category:", product.category);
    const newPrice = prompt("Edit price:", product.price);
    const newQuantity = prompt("Edit quantity:", product.quantity);

    if (!newName || !newCategory) {
        //alert("Please fill all fields");
        return;
    }

    products[index] = {
        name: newName,
        category: newCategory,
        price: Number(newPrice),
        quantity: Number(newQuantity)
    };

    saveToStorage();
    displayProducts();
 }
 //--Search--
 searchInput.addEventListener("input", function(){
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
 });

 //Total
 function updateSummary(){
    const totalProducts = products.length;
    const totalValue = products.reduce((sum,p) => {
        return sum + p.price * p.quantity;
    }, 0);
    document.querySelector(".total p").textContent = totalProducts;
    document.querySelector(".value p").textContent = `Ksh ${totalValue}`;
 }
 displayProducts();