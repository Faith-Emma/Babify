// script.js
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Select all gallery items const galleryItems = document.querySelectorAll(".gallery-item"); const modal = document.getElementById("productModal"); const closeModal = document.querySelector(".close"); // When clicking a gallery item galleryItems.forEach(item => { item.addEventListener("click", () => { // Grab details from data attributes const name = item.getAttribute("data-name"); const price = item.getAttribute("data-price"); const age = item.getAttribute("data-age"); const description = item.getAttribute("data-description"); // Get the image src directly from <img> const imgSrc = item.querySelector("img").src; // Populate modal content document.getElementById("modalImage").src = imgSrc; document.getElementById("modalName").textContent = name; document.getElementById("modalPrice").textContent = Price: ${price}; document.getElementById("modalAge").textContent = Age: ${age}; document.getElementById("modalDescription").textContent = description; // Show modal modal.style.display = "block"; }); }); // Close modal when clicking the X closeModal.addEventListener("click", () => { modal.style.display = "none"; }); // Close modal when clicking outside the content window.addEventListener("click", (e) => { if (e.target === modal) { modal.style.display = "none"; } })

// -------------------
// Modal Functionality
// -------------------
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close");

// Open modal on gallery/product click
document.querySelectorAll(".gallery-item, .product-card").forEach(item => {
  item.addEventListener("click", (e) => {
    // Prevent modal from opening if "Add to Cart" was clicked
    if (e.target.classList.contains("add-to-cart")) return;

    const name = item.getAttribute("data-name");
    const price = item.getAttribute("data-price");
    const age = item.getAttribute("data-age");
    const description = item.getAttribute("data-description");
    const imgSrc = item.querySelector("img").src;

    document.getElementById("modalImage").src = imgSrc;
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalPrice").textContent = `Price: ${price}`;
    document.getElementById("modalAge").textContent = `Age: ${age}`;
    document.getElementById("modalDescription").textContent = description;

    modal.style.display = "block";
  });
});

// Close modal with X
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// -------------------
// Cart Functionality
// -------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Handle Add to Cart clicks
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent modal from opening

    const product = e.target.closest(".gallery-item, .product-card");
    const name = product.dataset.name;

    // Clean price value (remove KSh, commas, spaces)
    const rawPrice = product.dataset.price.replace(/[^\d]/g, "");
    const price = parseInt(rawPrice, 10);

    // Add product to cart
    cart.push({ name, price });

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart UI
    renderCart();
  });
});

// Update cart count
function renderCart() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// Call renderCart() on page load so count is correct
renderCart();