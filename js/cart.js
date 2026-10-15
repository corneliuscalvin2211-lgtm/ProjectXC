let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name: name, price: Number(price) });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " has been added to your cart!");
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // The products page does not have these cart elements.
    if (!cartItems || !cartTotal) return;

    // Reload the latest saved cart before displaying it.
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: ₦0";
        return;
    }

    let total = 0;

    cart.forEach(function(product, index) {
        const item = document.createElement("div");
        const details = document.createElement("span");
        const removeButton = document.createElement("button");

        details.textContent = product.name + " - ₦" + product.price;
        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", function() {
            removeItem(index);
        });

        item.appendChild(details);
        item.appendChild(document.createTextNode(" "));
        item.appendChild(removeButton);
        cartItems.appendChild(item);

        total += Number(product.price);
    });

    cartTotal.textContent = "Total: ₦" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

displayCart();