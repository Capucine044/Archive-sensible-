/* =========================
   Base
   ========================= */
:root {
  --black: #050507;
  --panel: #101017;
  --white: #f5f5f5;
  --grey: #c9c9c9;
  --red: #ff4d6a;
  --blue: #4fd8ff;
  --green: #4dff9f;
  --purple: #d5a8ff;
  --yellow: #ffd166;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 77, 106, 0.15), transparent 38%),
    radial-gradient(circle at 88% 62%, rgba(79, 216, 255, 0.10), transparent 42%),
    var(--black);
  color: var(--white);
  font-family: "Courier New", monospace;
  font-size: 1.05rem;
  line-height: 1.75;
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a,
button {
  font-family: inherit;
}

a:focus-visible,
button:focus-visible,
.drift-piece:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 4px;
}

/* =========================
   Ouverture
   ========================= */
.opening,
.ending {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 7rem 1.5rem;
}

.small-label,
.section-marker span:first-child {
  color: var(--yellow);
  font-size: 0.8rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
}

.site-title,
.ending-title {
  font-size: clamp(2.2rem, 9vw, 5.2rem);
  letter-spacing: 0.22rem;
  text-transform: uppercase;
  margin: 1.4rem 0;
}

.opening-text,
.ending p {
  max-width: 640px;
  font-size: 1.15rem;
  color: var(--white);
}

.opening-help {
  margin-top: 2rem;
  color: var(--grey);
  font-size: 0.95rem;
}

/* =========================
   Sections
   ========================= */
.archive-section {
  max-width: 1140px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  border-top: 2px solid rgba(255, 255, 255, 0.12);
}

.section-marker {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2rem;
  font-size: 0.8rem;
  letter-spacing: 0.25rem;
  text-transform: uppercase;
  color: var(--grey);
}

.artist-title {
  font-size: clamp(1.8rem, 7vw, 3.4rem);
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

#lamarr .artist-title {
  color: var(--blue);
}

#nemo .artist-title {
  color: var(--green);
}

#abramovic .artist-title {
  color: var(--red);
}

#bourgeois .artist-title {
  color: var(--purple);
}

.section-text {
  max-width: 680px;
  margin-bottom: 3.5rem;
  color: var(--white);
}

/* =========================
   Grille sensible
   ========================= */
.drift-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.drift-piece {
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: var(--panel);
  padding: 0.8rem;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    transform 0.5s ease,
    box-shadow 0.5s ease;
}

.drift-piece:hover,
.drift-piece:focus-visible {
  border-color: var(--yellow);
  box-shadow: 0 0 0 4px rgba(255, 209, 102, 0.16);
}

.drift-piece img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  transition:
    transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 0.65s ease,
    opacity 0.65s ease;
}

.drift-piece figcaption {
  margin-top: 0.9rem;
  color: var(--grey);
  font-size: 0.85rem;
}

.drift-piece figcaption strong {
  color: var(--white);
}

/* États de dérèglement */
.drift-piece[data-state="1"] img {
  transform: scaleX(-1);
}

.drift-piece[data-state="2"] img {
  transform: scaleY(-1);
}

.drift-piece[data-state="3"] img {
  filter: invert(1) contrast(1.15);
}

.drift-piece[data-state="4"] img {
  filter: grayscale(1) contrast(2);
}

.drift-piece[data-state="4"] img {
  filter: blur(7px) contrast(1.2);
}

.drift-piece[data-state="5"] img {
  transform: scale(1.08) rotate(-4deg);
  filter: saturate(2) contrast(1.2);
}

.drift-piece[data-state="6"] img {
  transform: scale(1.04) rotate(3deg);
  filter: hue-rotate(140deg) contrast(1.2);
}

/* =========================
   Message sensible
   ========================= */
.drift-message {
  position: fixed;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: min(90vw, 520px);
  padding: 0.9rem 1.2rem;
  background: rgba(5, 5, 7, 0.94);
  border: 2px solid var(--red);
  color: var(--white);
  text-align: center;
  font-size: 0.9rem;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 12px);
  transition:
    opacity 0.35s ease,
    visibility 0.35s ease,
    transform 0.35s ease;
  z-index: 2000;
}

.drift-message.visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* =========================
   Footer
   ========================= */
.site-footer {
  padding: 4rem 1.5rem 6rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--grey);
}

/* =========================
   Glitch
   ========================= */
.glitch {
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.glitch::before {
  color: var(--red);
  clip-path: inset(18% 0 58% 0);
  animation: glitchOne 3s infinite steps(2, end);
}

.glitch::after {
  color: var(--green);
  clip-path: inset(62% 0 12% 0);
  animation: glitchTwo 3.6s infinite steps(2, end);
}

@keyframes glitchOne {
  0%, 91%, 100% {
    transform: translate(0);
  }
  93% {
    transform: translate(-4px, 2px);
  }
  96% {
    transform: translate(4px, -2px);
  }
}

@keyframes glitchTwo {
  0%, 89%, 100% {
    transform: translate(0);
  }
  92% {
    transform: translate(4px, -1px);
  }
  97% {
    transform: translate(-4px, 2px);
  }
}

/* =========================
   Responsive
   ========================= */
@media (max-width: 720px) {
  .archive-section {
    padding: 4.5rem 1rem;
  }

  .drift-grid {
    grid-template-columns: 1fr;
  }

  .drift-piece img {
    height: 260px;
  }
}

/* Accessibilité : réduit les animations */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
