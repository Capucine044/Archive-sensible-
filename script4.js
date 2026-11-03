// =========================
// Apparition au scroll
// =========================
const revealItems = document.querySelectorAll(
  ".work, .chapter-head, .highlight-quote, .quiz, .spoiler-box"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("highlight-quote")) {
          entry.target.classList.add("is-visible");
        }
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealItems.forEach((item) => {
  item.classList.add("before-reveal");
  revealObserver.observe(item);
});

// =========================
// QCM
// =========================
const quizzes = document.querySelectorAll(".quiz");

quizzes.forEach((quiz) => {
  const correctAnswer = quiz.dataset.answer;
  const feedback = quiz.querySelector(".quiz-feedback");
  const options = quiz.querySelectorAll(".quiz-option");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;

      options.forEach((otherOption) => {
        otherOption.disabled = true;

        if (otherOption.dataset.value === correctAnswer) {
          otherOption.classList.add("correct");
        }
      });

      if (value === correctAnswer) {
        feedback.textContent = "Oui. La performance rend visible cette violence.";
      } else {
        option.classList.add("wrong");
        feedback.textContent = "Pas tout à fait. La bonne réponse est maintenant indiquée.";
      }
    });
  });
});

// =========================
// Spoiler : The Curse
// =========================
const spoilerButton = document.getElementById("spoilerButton");
const spoilerContent = document.getElementById("spoilerContent");

if (spoilerButton && spoilerContent) {
  spoilerButton.addEventListener("click", () => {
    spoilerContent.hidden = false;
    spoilerButton.hidden = true;

    // Le texte s’envole après avoir été lu
    setTimeout(() => {
      spoilerContent.classList.add("fly-away");

      setTimeout(() => {
        spoilerContent.hidden = true;
        spoilerContent.classList.remove("fly-away");
      }, 2500);
    }, 7000);
  });
}



// =========================
// Messages sensibles
// =========================
const archiveMessage = document.getElementById("archiveMessage");

const messages = [
  "L’archive réagit à ton passage.",
  "Une référence attire une autre référence.",
  "Le corps, l’écran et la mémoire se répondent.",
  "Ce que tu regardes te regarde aussi.",
  "La culture ne reste jamais immobile."
];

let messageTimer = null;

function showMessage() {
  const text = messages[Math.floor(Math.random() * messages.length)];

  archiveMessage.textContent = text;
  archiveMessage.classList.add("visible");

  clearTimeout(messageTimer);

  messageTimer = setTimeout(() => {
    archiveMessage.classList.remove("visible");
  }, 2800);
}

// Un message apparaît parfois lors du scroll
let lastMessageTime = 0;

window.addEventListener("scroll", () => {
  const now = Date.now();

  if (now - lastMessageTime > 12000 && Math.random() > 0.82) {
    lastMessageTime = now;
    showMessage();
  }
// =========================
// OFF : descente progressive
// =========================
const batterTrack = document.querySelector(".batter-track");
const villagers = document.querySelectorAll(".villager");

const offObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.25
  }
);

if (batterTrack) {
  offObserver.observe(batterTrack);
}

villagers.forEach((villager) => {
  offObserver.observe(villager);
});
});
