let products = [];
let cart = [];
console.log(cart);

fetch("https://sleepy-crag-84730.herokuapp.com/get-products/")
.then((res) => res.json())
.then((data) => {
    console.log(data);
    products = data.Data;
    console.log(products)
    let productContainer = document.querySelector("#products-container");
    productContainer.innerHTML = "";
    products.forEach((product) => {
        console.log(product);
        productContainer.innerHTML += `
        <div class="product">
        <div class="product-content">
            <h4 class="product-name">${product.product_name} </h4>
            <p class="product-description">${product.description} </p>
            <p class="product-type">${product.product_type} </p>
            <p class="product-price">${product.product_price} </p>
            <button onclick="addToCart(${product.item_id})">Add to Cart</button>
        </div>
        </div>`;
    });
}); 

function addToCart(item_id) {
    let product = products.find(item => {
        return item.item_id == item_id
    })
    console.log(product)
    cart.push(product);
    console.log(cart );
}

function searchForProducts() {
    let searchTerm = document.querySelector("#searchTerm").value;
    console.log(searchTerm);

    let searchedProducts = products.filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(searchedProducts);

    if(searchedProducts.length == 0) {
        document.querySelector("#products-container").innerHTML =
        "<h2>Sorry, we do not have the item you are looking for.</h2>";
    } else
    products(searchedProducts)
}

function toggleCart() {
    document.querySelector("#cart").classList.toggle("active");
}