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

// slider of photo gallery

const track = document.querySelector(".gallery-track");
const slides = document.querySelectorAll(".gallery-track img");
const nextBtn = document.querySelector(".gallery-btn.next");
const prevBtn = document.querySelector(".gallery-btn.prev");
const thumbs = document.querySelectorAll(".gallery-thumbnails img");

// Clone first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

let index = 1;
const slideWidth = slides[0].clientWidth + 20; // +gap size
track.style.transform = `translateX(-${slideWidth * index}px)`;

function updateThumbnails() {
  thumbs.forEach((t) => t.classList.remove("active"));
  thumbs[(index - 1 + slides.length) % slides.length].classList.add("active");
}

function moveToSlide() {
  track.style.transition = "transform 0.8s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  updateThumbnails();
}

function nextSlide() {
  if (index >= slides.length + 1) return;
  index++;
  moveToSlide();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  moveToSlide();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Reset position when reaching cloned slides (for infinite loop)
track.addEventListener("transitionend", () => {
  const realSlides = document.querySelectorAll(".gallery-track img");
  if (realSlides[index].src === firstClone.src) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (realSlides[index].src === lastClone.src) {
    track.style.transition = "none";
    index = slides.length;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

// Clickable thumbnails
thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    index = i + 1;
    moveToSlide();
  });
});

// Auto-slide every 5s
setInterval(() => {
  nextSlide();
}, 5000);

updateThumbnails();
