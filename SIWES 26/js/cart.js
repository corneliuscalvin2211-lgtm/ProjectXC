let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const product = {
        name: name,
        price: price
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " has been added to your cart!");
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.lenght === 0) {
        cartItems.innerHTML = "<p>your cart is empty.</p>";
    }

    cart.forEach(function(product) {
        const item = document.createElement("p");

        item.textContent = product.name + " - ₦" + product.price;

        cartItems.appendChild(item);

        total += product.price;
    });

    cartTotal.textContent = "Total: ₦" + total;
}

function removeItem() {
    cart.splice(index, 1)

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

function clearCart() {
    cart = [];

    localStorage.removeItem("cart");

    displayCart();
}

displayCart();

