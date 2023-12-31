export function openLightbox() {
  const flexImages = document.querySelectorAll(".media > img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector("#lightbox .close");
  const navLeft = document.getElementById("lightbox-nav-left");
  const navRight = document.getElementById("lightbox-nav-right");

  let currentIndex = 0;

  function setInitialFocus() {
    const firstInteractiveElement = document.getElementsByClassName("close")[0];
    if (firstInteractiveElement) {
      firstInteractiveElement.focus();
    }
  }

  // to open lightbox
  flexImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      currentIndex = index;
      lightboxImg.src = img.src;

      lightbox.setAttribute("aria-label", "imagecloseup view");
      setInitialFocus();
    });
  });

  function showMedia(index) {
    const images = Array.from(flexImages);
    currentIndex = (index + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  // To close lightbox when clicking on the close button
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-label", "imagecloseup");
  });

  // Close lightbox on "Enter" key press for close button
  closeBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-label", "imagecloseup");
    }
  });

  // Navigate to the previous media
  navLeft.addEventListener("click", () => {
    showMedia(currentIndex - 1);
  });

  // Navigate to the next media
  navRight.addEventListener("click", () => {
    showMedia(currentIndex + 1);
  });

  // Close lightbox on "Enter" key press for navigation buttons
  navLeft.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showMedia(currentIndex - 1);
    }
  });

  navRight.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showMedia(currentIndex + 1);
    }
  });

  // Navigate with arrow keys
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showMedia(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showMedia(currentIndex + 1);
    }
  });

  // To close lightbox when clicking outside the media
  lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-label", "imagecloseup");
  });
}
