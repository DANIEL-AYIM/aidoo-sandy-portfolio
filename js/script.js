const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Open and close the mobile navigation menu.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after a visitor chooses a section.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Keep the footer year up to date automatically.
const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* Gallery lightbox */

const galleryButtons = [...document.querySelectorAll(".gallery-open")];
const lightbox = document.getElementById("gallery-lightbox");
const largeImage = document.getElementById("gallery-large-image");
const counter = document.getElementById("gallery-counter");
const previousButton = document.getElementById("gallery-prev");
const nextButton = document.getElementById("gallery-next");
const closeButton = document.getElementById("gallery-close");

let currentImageIndex = 0;

function showGalleryImage(index) {
  if (!galleryButtons.length) return;

  currentImageIndex =
    (index + galleryButtons.length) % galleryButtons.length;

  const button = galleryButtons[currentImageIndex];
  const thumbnail = button.querySelector("img");

  largeImage.src = button.dataset.full;
  largeImage.alt = thumbnail.alt;
  counter.textContent =
    `${currentImageIndex + 1} / ${galleryButtons.length}`;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showGalleryImage(index);
    lightbox.showModal();
  });
});

previousButton.addEventListener("click", () => {
  showGalleryImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", () => {
  showGalleryImage(currentImageIndex + 1);
});

closeButton.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;

  if (event.key === "ArrowLeft") {
    showGalleryImage(currentImageIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(currentImageIndex + 1);
  }
});

