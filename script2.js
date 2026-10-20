// ============================
// Curseur signal
// ============================
const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailX = mouseX;
let trailY = mouseY;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;

  cursorTrail.style.left = `${trailX}px`;
  cursorTrail.style.top = `${trailY}px`;

  requestAnimationFrame(animateTrail);
}

animateTrail();

// Le curseur grandit sur les éléments interactifs
const interactiveElements = document.querySelectorAll(
  "a, button, select, .reveal-card, .flip-card"
);

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("grow");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
  });
});

// ============================
// Couleur du curseur selon la section
// ============================
const sections = document.querySelectorAll(".artist-section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveSection() {
  let currentSection = "accueil";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= window.innerHeight * 0.4) {
      currentSection = section.dataset.theme;
    }
  });

  document.body.dataset.theme = currentSection;

  navLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    const section = document.getElementById(target);

    if (
      section &&
      section.getBoundingClientRect().top <= window.innerHeight * 0.4 &&
      section.getBoundingClientRect().bottom >= window.innerHeight * 0.4
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);

// ============================
// Zoom sur les œuvres
// ============================
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImage = document.getElementById("zoomImage");
const zoomTitle = document.getElementById("zoomTitle");
const zoomDescription = document.getElementById("zoomDescription");
const zoomClose = document.getElementById("zoomClose");

const revealCards = document.querySelectorAll(".reveal-card");

revealCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    const title = card.dataset.title;
    const description = card.dataset.description || card.dataset.text;

    zoomImage.src = image.src;
    zoomImage.alt = image.alt;
    zoomTitle.textContent = title;
    zoomDescription.textContent = description;

    zoomOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeZoom() {
  zoomOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

zoomClose.addEventListener("click", closeZoom);

zoomOverlay.addEventListener("click", (event) => {
  if (event.target === zoomOverlay) {
    closeZoom();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeZoom();
  }
});

// ============================
// Cartes qui se retournent
// ============================
const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// ============================
// Correspondances
// ============================
const firstChoice = document.getElementById("firstChoice");
const secondChoice = document.getElementById("secondChoice");
const createConnection = document.getElementById("createConnection");
const connectionResult = document.getElementById("connectionResult");

const connections = {
  "abramovic-bourgeois": [
    "Le corps garde la trace de ce que la mémoire tente de réparer.",
    "La douleur devient matière ; la mémoire devient architecture.",
    "Entre endurance et fil, chaque blessure cherche une forme."
  ],
  "abramovic-lamarr": [
    "La présence est un signal : elle transmet sans toujours se voir.",
    "Le corps et la fréquence peuvent tous deux traverser le silence.",
    "Derrière l’image visible, une énergie invisible circule."
  ],
  "abramovic-nemo": [
    "La performance rencontre le code : le corps devient interface.",
    "La présence humaine se prolonge dans les espaces numériques.",
    "L’interaction transforme le spectateur en participant."
  ],
  "bourgeois-lamarr": [
    "La mémoire se tisse comme un signal : invisible, répété, protecteur.",
    "Le fil et la fréquence relient ce qui semble séparé.",
    "Toutes deux transforment l’invisible en structure."
  ],
  "bourgeois-nemo": [
    "La maison devient espace numérique : un lieu à la fois intime et extensible.",
    "Les Cellules rencontrent les environnements immersifs.",
    "La mémoire peut être habitée, projetée, codée."
  ],
  "lamarr-nemo": [
    "Le signal devient image, l’image devient environnement.",
    "La technologie cachée devient matière artistique.",
    "Entre cinéma, invention et code, la perception se déplace."
  ]
};

function getConnectionKey(first, second) {
  return [first, second].sort().join("-");
}

createConnection.addEventListener("click", () => {
  const first = firstChoice.value;
  const second = secondChoice.value;

  if (!first || !second) {
    connectionResult.innerHTML = `
      <p class="placeholder">
        Choisis deux références pour créer une correspondance.
      </p>
    `;
    return;
  }

  if (first === second) {
    connectionResult.innerHTML = `
      <p>
        <strong>${firstChoice.options[firstChoice.selectedIndex].text}</strong>
        se retourne sur elle-même : l’archive révèle alors une nouvelle
        couche d’elle-même.
      </p>
    `;
    return;
  }

  const key = getConnectionKey(first, second);
  const options = connections[key] || [
    "Ces deux références se répondent dans l’espace entre le visible et l’invisible."
  ];

  const sentence = options[Math.floor(Math.random() * options.length)];

  connectionResult.innerHTML = `
    <p>
      <strong>
        ${firstChoice.options[firstChoice.selectedIndex].text}
        +
        ${secondChoice.options[secondChoice.selectedIndex].text}
      </strong>
      <br /><br />
      ${sentence}
    </p>
  `;
});