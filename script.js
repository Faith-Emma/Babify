// script.js
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Select all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close");

// When clicking a gallery item
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    // Grab details from data attributes
    const name = item.getAttribute("data-name");
    const price = item.getAttribute("data-price");
    const age = item.getAttribute("data-age");
    const description = item.getAttribute("data-description");
    
    // Get the image src directly from <img>
    const imgSrc = item.querySelector("img").src;

    // Populate modal content
    document.getElementById("modalImage").src = imgSrc;
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalPrice").textContent = `Price: ${price}`;
    document.getElementById("modalAge").textContent = `Age: ${age}`;
    document.getElementById("modalDescription").textContent = description;

    // Show modal
    modal.style.display = "block";
  });
});

// Close modal when clicking the X
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});