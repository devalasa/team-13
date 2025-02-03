import { getLocalStorage } from "./utils.mjs"; // Remove qs and renderListWithTemplate

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart"); // Get cart items from localStorage

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListeners(cartItems); // Attach remove item listeners
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <p class="remove-item">X</p>
  </li>`;

  return newItem;
}

function addRemoveListeners(cartItems) {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeItemFromCart(cartItems);
      renderCartContents(); // Re-render the cart after removal
    });
  });
}

function removeItemFromCart(cartItems) {
  cartItems.splice(1); // Remove the item from the array
  localStorage.setItem("so-cart", JSON.stringify(cartItems)); // Update localStorage immediately
  // If cart is empty, clear the cart page
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
  }
}

renderCartContents();
