const productNameInput = document.getElementById('productNameInput');
const productCategoryInput = document.getElementById('productCategoryInput');
const productPriceInput = document.getElementById('productPriceInput');
const productDiscountInput = document.getElementById('productDiscountInput');
const productQuantityInput = document.getElementById('productQuantityInput');
const productDescriptionInput = document.getElementById('productDescriptionInput');
const addProductBtn = document.getElementById('addProductBtn');
const searchId = document.getElementById('searchId');
let productsContainer = [];
let currentEditIndex = null;

// Display data from localStorage
if (localStorage.getItem('products')) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}

// Start add product logic
function addProduct() {
    const product = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        discount: productDiscountInput.value,
        quantity: productQuantityInput.value,
        description: productDescriptionInput.value,
    };

    if (currentEditIndex !== null) {
        productsContainer[currentEditIndex] = product;
        currentEditIndex = null;
    } else {
        productsContainer.push(product);
    }
    
    localStorage.setItem('products', JSON.stringify(productsContainer));
    displayProduct();
    clearInputs();
}

// Add event listener to the add product button
addProductBtn.addEventListener('click', addProduct);

function displayProduct() {
    let zo7la2a = '';
    for (let i = 0; i < productsContainer.length; i++) {
        zo7la2a += `
        <tr>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].discount}</td>
            <td>${productsContainer[i].quantity}</td>
            <td>${productsContainer[i].description}</td>
            <td><button class='button' onclick="editProduct(${i})">Edit</button></td>
            <td><button class='button' onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('showData').innerHTML = zo7la2a;
}

// Delete product
function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(productsContainer));
    displayProduct();
}

// Clear inputs
function clearInputs() {
    productNameInput.value = '';
    productCategoryInput.value = '';
    productPriceInput.value = '';
    productDiscountInput.value = '';
    productQuantityInput.value = '';
    productDescriptionInput.value = '';
}

// Edit product
function editProduct(productIndex) {
    const product = productsContainer[productIndex];
    productNameInput.value = product.name;
    productCategoryInput.value = product.category;
    productPriceInput.value = product.price;
    productDiscountInput.value = product.discount;
    productQuantityInput.value = product.quantity;
    productDescriptionInput.value = product.description;
    currentEditIndex = productIndex;
}

// Search product
function searchProduct() {
    const searchTerm = searchId.value.toLowerCase();
    const filteredProducts = productsContainer.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    let zo7la2a = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        zo7la2a += `
        <tr>
            <td>${filteredProducts[i].name}</td>
            <td>${filteredProducts[i].category}</td>
            <td>${filteredProducts[i].price}</td>
            <td>${filteredProducts[i].discount}</td>
            <td>${filteredProducts[i].quantity}</td>
            <td>${filteredProducts[i].description}</td>
            <td><button class='button' onclick="editProduct(${i})">Edit</button></td>
            <td><button class='button' onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('showData').innerHTML = zo7la2a;
}

// Add event listener to the search input
searchId.addEventListener('input', searchProduct);
