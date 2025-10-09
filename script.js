// -------------------
// Mobile Navigation
// -------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// -------------------
// Modal Functionality
// -------------------
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close");

if (modal && closeModal) {
  document.querySelectorAll(".gallery-item, .product-card").forEach(item => {
    item.addEventListener("click", (e) => {
      // Prevent opening modal when Add-to-Cart is clicked
      if (e.target.classList.contains("add-to-cart")) return;

      const name = item.getAttribute("data-name") || "Unnamed Product";
      const price = item.getAttribute("data-price") || "N/A";
      const age = item.getAttribute("data-age") || "-";
      const description = item.getAttribute("data-description") || "No description available.";
      const imgSrc = item.querySelector("img") ? item.querySelector("img").src : "";

      document.getElementById("modalImage").src = imgSrc;
      document.getElementById("modalName").textContent = name;
      document.getElementById("modalPrice").textContent = `Price: ${price}`;
      document.getElementById("modalAge").textContent = `Age: ${age}`;
      document.getElementById("modalDescription").textContent = description;

      modal.style.display = "block";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// -------------------
// Cart Functionality
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const product = e.target.closest(".gallery-item, .product-card");
      if (!product) return;

      const name = product.dataset.name || "Unnamed Product";
      const priceText = product.dataset.price || "0";
      const rawPrice = priceText.replace(/[^\d]/g, "");
      const price = parseInt(rawPrice, 10) || 0;

      cart.push({ name, price });
      renderCart();
    });
  });

  renderCart();
});

// -------------------
// View / Manage Cart Modal
// -------------------
const cartModal = document.getElementById("cartModal");
const closeCart = document.querySelector(".close-cart");
const cartBtn = document.getElementById("cartBtn");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

if (cartBtn && cartModal) {
  // Open cart modal
  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
    renderCartModal();
  });

  // Close cart modal
  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
}

// Function to render cart contents
function renderCartModal() {
  cartItemsList.innerHTML = "";
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (savedCart.length === 0) {
    cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    return;
  }

  let total = 0;
  savedCart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - KSh ${item.price}
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = `Total: KSh ${total}`;

  // Handle removing individual items
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      savedCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(savedCart));
      renderCartModal();
      renderCart(); // update cart count
    });
  });
}

// Clear all items
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCartModal();
    renderCart();
  });
}

