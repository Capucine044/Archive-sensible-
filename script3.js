// =========================
// Présence : souris ou toucher
// =========================
const body = document.body;
const presence = document.getElementById("presence");

function movePresence(x, y) {
  body.classList.add("is-active");
  presence.style.left = `${x}px`;
  presence.style.top = `${y}px`;
}

document.addEventListener("mousemove", (event) => {
  movePresence(event.clientX, event.clientY);
});

document.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    movePresence(touch.clientX, touch.clientY);
  },
  { passive: true }
);

document.addEventListener("mouseleave", () => {
  body.classList.remove("is-active");
});

// =========================
// Apparition des fragments
// =========================
const revealElements = document.querySelectorAll(
  ".work, .artist-title, .artist-intro, .section-index"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  element.classList.add("before-reveal");
  revealObserver.observe(element);
});

// =========================
// Fiche sensible au clic / toucher
// =========================
const workOverlay = document.getElementById("workOverlay");
const overlayImage = document.getElementById("overlayImage");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDate = document.getElementById("overlayDate");
const overlayDescription = document.getElementById("overlayDescription");
const overlayQuote = document.getElementById("overlayQuote");
const overlayClose = document.getElementById("overlayClose");

const works = document.querySelectorAll(".work");

works.forEach((work, index) => {
  work.addEventListener("click", () => {
    const image = work.querySelector("img");
    const title = work.querySelector("h3").textContent;
    const date = work.querySelector(".work-date").textContent;
    const description = work.querySelectorAll("p")[1].textContent;
    const quote = work.querySelector(".work-quote").textContent;

    overlayImage.src = image.src;
    overlayImage.alt = image.alt;
    overlayTitle.textContent = title;
    overlayDate.textContent = date;
    overlayDescription.textContent = description;
    overlayQuote.textContent = quote;
    document.getElementById("overlayIndex").textContent =
      `Frag. ${String(index + 1).padStart(2, "0")}`;

    workOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    overlayClose.focus();
  });
});

function closeOverlay() {
  workOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

overlayClose.addEventListener("click", closeOverlay);

workOverlay.addEventListener("click", (event) => {
  if (event.target === workOverlay) {
    closeOverlay();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlay();
  }
});

// =========================
// Navigation active
// =========================
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll(".fragment-section");

function updateNavigation() {
  navLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    const rect = target.getBoundingClientRect();
    const isVisible =
      rect.top <= window.innerHeight * 0.45 &&
      rect.bottom >= window.innerHeight * 0.45;

    link.classList.toggle("active", isVisible);
  });
}

window.addEventListener("scroll", updateNavigation);
window.addEventListener("load", updateNavigation);