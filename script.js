const header = document.getElementById("mainHeader");
const headerLogo = document.getElementById("headerLogo");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 80;
  header.classList.toggle("scrolled", scrolled);

  // Swap logo based on scroll
  if (scrolled) {
    headerLogo.src = "images/logo.png"; // normal logo after scroll
  } else {
    headerLogo.src = "images/white-logo.png"; // white logo at top
  }
});



// Make hero content transform on scroll
const heroOverlay = document.querySelector(".about-overlay");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // scale down the hero content a little
  const scale = 1 - Math.min(scrollY / 1000, 0.1); // max shrink 10%
  const translateY = Math.min(scrollY / 3, 50); // move up max 50px
  const opacity = 1 - Math.min(scrollY / 400, 0.5); // fade a bit

  heroOverlay.style.transform = `translateY(-${translateY}px) scale(${scale})`;
  heroOverlay.style.opacity = opacity;
});

// Icon Hero zoom on scroll
const iconHero = document.querySelector(".icon-hero");
window.addEventListener("scroll", () => {
  const iconTop = iconHero.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (iconTop < windowHeight) {
    // small zoom effect (scale up to 1.05)
    const scale = 1 + (windowHeight - iconTop) / (windowHeight * 20);
    iconHero.style.transform = `scale(${scale})`;
  } else {
    iconHero.style.transform = `scale(1)`; // reset if out of view
  }
});

// Detect elements entering the viewport
const soldItems = document.querySelectorAll(".sold-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.2 } // triggers when 20% of the section is visible
);

soldItems.forEach((item) => observer.observe(item));

// find your dream home section
const dreamSection = document.querySelector(".find-dream-home");
const dreamObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dreamSection.classList.add("show");
        dreamObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

dreamObserver.observe(dreamSection);
const galleryTrack = document.querySelector('.gallery-track');
const galleryImages = document.querySelectorAll('.gallery-track img');
const prevButton = document.querySelector('.gallery-btn.prev');
const nextButton = document.querySelector('.gallery-btn.next');
const thumbnails = document.querySelectorAll('.gallery-thumbnails img');

// Current index to keep track of the active image
let currentIndex = 0;

// Variables for swipe functionality
let touchStartX = 0;
let touchEndX = 0;

// Function to update the gallery slider
function updateGallery(index) {
  // Ensure the index stays within bounds
  if (index < 0) {
    currentIndex = galleryImages.length - 1;
  } else if (index >= galleryImages.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Move the gallery track to the correct image
  galleryTrack.style.transform = `translateX(-${100 * currentIndex}%)`;

  // Update the active class for the images
  galleryImages.forEach((img, idx) => {
    img.classList.toggle('active', idx === currentIndex); // Make the current image visible
  });

  // Update the active thumbnail
  thumbnails.forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === currentIndex);
  });
}

// Add click event listeners to the arrows
prevButton.addEventListener('click', () => {
  updateGallery(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  updateGallery(currentIndex + 1);
});

// Add click event listeners to the thumbnails
thumbnails.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    updateGallery(idx);
  });
});

// Swipe functionality for mobile
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;  // Get starting position
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;    // Get ending position
  if (touchEndX < touchStartX) {
    // Swiped left (next image)
    updateGallery(currentIndex + 1);
  }
  if (touchEndX > touchStartX) {
    // Swiped right (previous image)
    updateGallery(currentIndex - 1);
  }
}

// Add swipe event listeners
galleryTrack.addEventListener('touchstart', handleTouchStart);
galleryTrack.addEventListener('touchend', handleTouchEnd);

// Initialize the gallery to the first image
updateGallery(currentIndex);
