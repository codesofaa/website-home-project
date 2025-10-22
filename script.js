
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
  heroOverlay.style.overflowX = "hidden"; // add this line to remove horizontal overflow
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

// JavaScript for Gallery Interaction
const thumbnails = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
const thumbnailLength = thumbnails.length;
let currentIndex = 0;

// Change the main image when a thumbnail is clicked
thumbnails.forEach((thumb) => {
  thumb.addEventListener('click', function() {
    const newSrc = this.src;
    mainImage.src = newSrc;
    currentIndex = thumbnails.indexOf(this);
  });
});

// Automatic next function
setInterval(() => {
  currentIndex = (currentIndex + 1) % thumbnailLength;
  const newSrc = thumbnails[currentIndex].src;

  // Add a CSS transition to smoothly animate the change in the main image source
  mainImage.style.transition = 'opacity 1s ease';
  mainImage.style.opacity = 0;

  // Update the main image source after the transition has completed
  setTimeout(() => {
    mainImage.src = newSrc;
    mainImage.style.opacity = 1;
  }, 1000);
}, 5000); // Change the thumbnail every 5 seconds

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});