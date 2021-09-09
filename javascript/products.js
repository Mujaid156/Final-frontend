let products = [];
let cart = [];
console.log(cart);

const Storage = window.localStorage

fetch("https://sleepy-crag-84730.herokuapp.com/get-products/")
.then((res) => res.json())
.then((data) => {
    console.log(data);
    products = data.Data;
    console.log(products)
    renderProducts(products)
}); 

function renderProducts(products) {
    let productContainer = document.querySelector("#products-container");
    productContainer.innerHTML = "";
    products.forEach((product) => {
        console.log(product);
        productContainer.innerHTML += `
        <div class="product">
        <img src="${ product.image}" class="product-image">
        <div class="product-content">
            <h4 class="product-name">${product.product_name} </h4>
            <p class="product-description">${product.description} </p>
            <p class="product-price">R${product.product_price} </p>
            <button onclick="addToCart(${product.item_id})">Add to Cart</button>
        </div>
        </div>`;
    });
}

function renderCart(cartItems) {
    let cartContainer = document.querySelector("#cart");
    cartContainer.innerHTML = ""
    if (cartItems.length > 0) {
        cartItems.map(cartItem => {
            cartContainer.innerHTML += `
            <div class="product">
            <img src="${ cartItem.image}" class="product-image">
            <div class="product-content">
                <h4 class="product-name">${cartItem.product_name} </h4>
                <p class="product-description">${cartItem.description} </p>
                <p class="product-price">R${cartItem.product_price} </p>
            </div>
            </div>
            <button onclick="clearCart()" class="clear">Remove item</button>
            <button onclick="deleteCart()" class="clear">Clear Cart</button>`;
        })
        let totalPrice = cartItems.reduce((total, product) => total + product.product_price, 0);
        cartContainer.innerHTML += `<h3>Your total is: ${totalPrice} </h3>`
    } else {
        cartContainer.innerHTML = "<h2>No items in cart.</h2>";
    }
}

function addToCart(item_id) {
    let product = products.find(item => {
        return item.item_id == item_id
    })
    console.log(product)
    cart.push(product);

    console.log(cart );
    renderCart(cart);
    
    Storage.setItem("cart", JSON.stringify(cart))
    console.log(cart)
}

function clearCart() {
   let cart = []

    window.localStorage.setItem("cart", JSON.stringify(cart))
    window.localStorage.removeItem("item_id")
    console.log(cart);
    document.querySelector("#cart").innerHTML = "<h2>No items in cart.</h2>";
    window.location.reload()
}
if(document.querySelectorAll(".deleteItem")) {
    document.querySelectorAll(".deleteItem").forEach(button => button.addEventListener("click", deleteFromCart))
}

function deleteCart() {
for(let item in cart){
    if (id==cart[item].id){
        cart.splice(item, 1)
        window.localStorage.setItem("cart", json.stringify(cart))
        // window.location.reload()
        console.log(cart);
    }
    
}
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
    renderProducts(searchedProducts)
}

function toggleCart() {
    document.querySelector("#cart").classList.toggle("active");
    let storedcart = JSON.parse(window.localStorage['cart'])
    renderCart(storedcart)
}

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createProduct() {
    const name = document.querySelector("#name").value;
    const image = document.querySelector("#image").value;
    const desc = document.querySelector("#desc").value;
    const price = document.querySelector("#price").value;

    fetch('https://sleepy-crag-84730.herokuapp.com/products/', {
        method: 'POST',
        body: JSON.stringify({
            product_name:name,
            image:image,
            description:desc,
            product_price:price
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.Status_code == 201) {
                window.location.reload
            }
        })
}