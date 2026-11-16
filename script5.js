const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const levelLabel = document.getElementById("levelLabel");
const livesLabel = document.getElementById("livesLabel");

const projectModal = document.getElementById("projectModal");
const projectNumber = document.getElementById("projectNumber");
const projectTitle = document.getElementById("projectTitle");
const projectArtist = document.getElementById("projectArtist");
const projectImage = document.getElementById("projectImage");
const projectText = document.getElementById("projectText");
const nextLevelButton = document.getElementById("nextLevelButton");

const winScreen = document.getElementById("winScreen");
const restartButton = document.getElementById("restartButton");
const restartGameButton = document.getElementById("restartGameButton");

const GRAVITY = 0.65;
const MOVE_SPEED = 4.2;
const JUMP_FORCE = -12.5;

const projects = [
  {
    number: "Projet 01",
    title: "Rhythm 0",
    artist: "Marina Abramović — 1974",
    image: "images/rhythm0.jpg",
    text: "Pendant six heures, Marina Abramović se place passivement devant 72 objets, dont un couteau et une arme, que le public peut utiliser sur elle. La performance révèle l’agressivité, la vulnérabilité et la responsabilité du spectateur.",
    theme: "corps"
  },
  {
    number: "Projet 02",
    title: "Ever Is Over All",
    artist: "Pipilotti Rist — 1997",
    image: "images/ever-is-over-all.jpg",
    text: "Dans cette installation vidéo, une femme marche joyeusement dans la rue en brisant des vitres avec une grande fleur, tandis que des fleurs rouges occupent l’autre projection. L’œuvre mêle douceur, transgression et révolte féministe.",
    theme: "couleur"
  },
  {
    number: "Projet 03",
    title: "Pixel Forest",
    artist: "Pipilotti Rist — 2012–2016",
    image: "images/pixel-forest.jpg",
    text: "Pixel Forest est une installation immersive composée de milliers de LED suspendues. Le spectateur entre littéralement dans l’image, entouré de lumière, de couleur et de vidéo : une forêt de pixels habitable.",
    theme: "immersion"
  },
  {
    number: "Projet 04",
    title: "Madotsuki the Dreamer",
    artist: "Ismäel Joffroy Chandoutis",
    image: "images/madotsuki.jpg",
    text: "L’œuvre suit un homme qui cumule près de 74 personnalités en ligne, aux positions politiques contradictoires. Elle interroge la fragmentation de l’identité à l’ère des réseaux sociaux, où les profils deviennent masques, rôles ou refuges.",
    theme: "identite"
  },
  {
    number: "Projet 05",
    title: "Manifeste cyborg",
    artist: "Donna Haraway — 1985",
    image: "images/cyborg.jpg",
    text: "Le cyborg est une créature à la frontière entre l’organisme et la machine. Dans son Manifeste cyborg, Donna Haraway utilise cette figure pour défaire les oppositions entre nature et culture, humain et machine, et repenser le féminisme à l’ère technologique.",
    theme: "cyborg"
  },
  {
    number: "Projet 06",
    title: "Pulse",
    artist: "Kiyoshi Kurosawa — 2001",
    image: "images/pulse.jpg",
    text: "Dans Pulse, Internet devient un espace hanté par la solitude et la disparition. Le film explore le paradoxe d’une époque hyperconnectée où la technologie promet le lien tout en produisant l’isolement.",
    theme: "reseau"
  },
  {
    number: "Projet 07",
    title: "OFF",
    artist: "Mortis Ghost — 2008",
    image: "images/off.jpg",
    text: "OFF est un RPG indépendant dans lequel le Batteur est envoyé purifier un monde étrange et désespéré. Le jeu transforme la purification en question morale : purifier, est-ce sauver ou détruire ?",
    theme: "jeu"
  }
];

const levels = [
  {
    theme: "corps",
    platforms: [
      { x: 0, y: 500, w: 300, h: 40 },
      { x: 360, y: 440, w: 150, h: 20 },
      { x: 580, y: 380, w: 150, h: 20 },
      { x: 800, y: 460, w: 160, h: 40 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 420, y: 400, minX: 380, maxX: 500 },
      { x: 640, y: 340, minX: 600, maxX: 720 }
    ],
    spikes: [{ x: 720, y: 520, w: 60, h: 20 }],
    goal: { x: 880, y: 380, w: 40, h: 80 }
  },
  {
    theme: "couleur",
    platforms: [
      { x: 0, y: 500, w: 220, h: 40 },
      { x: 300, y: 450, w: 120, h: 20 },
      { x: 500, y: 390, w: 120, h: 20 },
      { x: 700, y: 450, w: 120, h: 20 },
      { x: 880, y: 500, w: 80, h: 40 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 330, y: 410, minX: 300, maxX: 420 },
      { x: 730, y: 410, minX: 700, maxX: 820 }
    ],
    spikes: [{ x: 540, y: 520, w: 80, h: 20 }],
    goal: { x: 900, y: 420, w: 40, h: 80 }
  },
  {
    theme: "immersion",
    platforms: [
      { x: 0, y: 500, w: 180, h: 40 },
      { x: 250, y: 460, w: 100, h: 20 },
      { x: 420, y: 400, w: 100, h: 20 },
      { x: 590, y: 340, w: 100, h: 20 },
      { x: 760, y: 420, w: 120, h: 20 },
      { x: 920, y: 500, w: 40, h: 40 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 450, y: 360, minX: 420, maxX: 520 },
      { x: 790, y: 380, minX: 760, maxX: 880 }
    ],
    spikes: [{ x: 640, y: 520, w: 80, h: 20 }],
    goal: { x: 920, y: 420, w: 40, h: 80 }
  },
  {
    theme: "identite",
    platforms: [
      { x: 0, y: 500, w: 200, h: 40 },
      { x: 280, y: 470, w: 100, h: 20 },
      { x: 460, y: 420, w: 100, h: 20 },
      { x: 640, y: 470, w: 100, h: 20 },
      { x: 820, y: 400, w: 120, h: 20 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 300, y: 430, minX: 280, maxX: 380 },
      { x: 660, y: 430, minX: 640, maxX: 740 }
    ],
    spikes: [{ x: 500, y: 520, w: 70, h: 20 }],
    goal: { x: 880, y: 320, w: 40, h: 80 }
  },
  {
    theme: "cyborg",
    platforms: [
      { x: 0, y: 500, w: 240, h: 40 },
      { x: 320, y: 450, w: 110, h: 20 },
      { x: 510, y: 390, w: 110, h: 20 },
      { x: 700, y: 450, w: 110, h: 20 },
      { x: 880, y: 500, w: 80, h: 40 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 350, y: 410, minX: 320, maxX: 430 },
      { x: 730, y: 410, minX: 700, maxX: 810 }
    ],
    spikes: [{ x: 540, y: 520, w: 90, h: 20 }],
    goal: { x: 900, y: 420, w: 40, h: 80 }
  },
  {
    theme: "reseau",
    platforms: [
      { x: 0, y: 500, w: 180, h: 40 },
      { x: 260, y: 440, w: 100, h: 20 },
      { x: 440, y: 480, w: 100, h: 20 },
      { x: 620, y: 400, w: 100, h: 20 },
      { x: 800, y: 460, w: 140, h: 20 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 280, y: 400, minX: 260, maxX: 360 },
      { x: 640, y: 360, minX: 620, maxX: 720 }
    ],
    spikes: [{ x: 460, y: 520, w: 60, h: 20 }],
    goal: { x: 880, y: 380, w: 40, h: 80 }
  },
  {
    theme: "jeu",
    platforms: [
      { x: 0, y: 500, w: 200, h: 40 },
      { x: 280, y: 460, w: 100, h: 20 },
      { x: 460, y: 400, w: 100, h: 20 },
      { x: 640, y: 460, w: 100, h: 20 },
      { x: 820, y: 400, w: 120, h: 20 },
      { x: 940, y: 300, w: 20, h: 240 }
    ],
    enemies: [
      { x: 300, y: 420, minX: 280, maxX: 380 },
      { x: 480, y: 360, minX: 460, maxX: 560 },
      { x: 660, y: 420, minX: 640, maxX: 740 }
    ],
    spikes: [{ x: 540, y: 520, w: 60, h: 20 }],
    goal: { x: 880, y: 320, w: 40, h: 80 }
  }
];

const themeColors = {
  corps: { sky: "#2a0a12", ground: "#7a1626", accent: "#ff4d6a" },
  couleur: { sky: "#bfe7f5", ground: "#0b5f4a", accent: "#ff9ec4" },
  immersion: { sky: "#071a18", ground: "#0b5f4a", accent: "#7dff9f" },
  identite: { sky: "#07070d", ground: "#2f333a", accent: "#c78bff" },
  cyborg: { sky: "#1b1d22", ground: "#4d5560", accent: "#ffc6d9" },
  reseau: { sky: "#07070a", ground: "#22242c", accent: "#ff4d4d" },
  jeu: { sky: "#141418", ground: "#3a3a40", accent: "#ffd166" }
};

let currentLevel = 0;
let lives = 3;
let keys = {};
let gameRunning = true;

const player = {
  x: 40,
  y: 420,
  w: 28,
  h: 42,
  vx: 0,
  vy: 0,
  onGround: false,
  facing: 1
};

function loadLevel(index) {
  const level = levels[index];
  const colors = themeColors[level.theme];

  player.x = 40;
  player.y = 420;
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
  player.facing = 1;

  level.enemies.forEach(enemy => {
    enemy.currentX = enemy.x;
    enemy.direction = 1;
    enemy.speed = 1.4;
  });

  levelLabel.textContent = `Niveau ${index + 1} / ${levels.length}`;
  livesLabel.textContent = `Vies : ${lives}`;

  canvas.dataset.theme = level.theme;
  gameRunning = true;
}

function rectCollide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function updatePlayer(level) {
  if (keys.left) {
    player.vx = -MOVE_SPEED;
    player.facing = -1;
  } else if (keys.right) {
    player.vx = MOVE_SPEED;
    player.facing = 1;
  } else {
    player.vx *= 0.75;
  }

  if ((keys.jump || keys.up) && player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }

  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;

  level.platforms.forEach(platform => {
    const playerBox = {
      x: player.x,
      y: player.y,
      w: player.w,
      h: player.h
    };

    if (rectCollide(playerBox, platform)) {
      if (player.vy > 0 && player.y + player.h - player.vy <= platform.y + 4) {
        player.y = platform.y - player.h;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = platform.y + platform.h;
        player.vy = 0;
      }
    }
  });

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  if (player.y > canvas.height + 100) {
    loseLife();
  }
}

function updateEnemies(level) {
  level.enemies.forEach(enemy => {
    enemy.currentX += enemy.speed * enemy.direction;

    if (enemy.currentX <= enemy.minX) {
      enemy.currentX = enemy.minX;
      enemy.direction = 1;
    }

    if (enemy.currentX + 34 >= enemy.maxX) {
      enemy.currentX = enemy.maxX - 34;
      enemy.direction = -1;
    }

    const enemyBox = {
      x: enemy.currentX,
      y: enemy.y,
      w: 34,
      h: 30
    };

    if (rectCollide(player, enemyBox)) {
      loseLife();
    }
  });
}

function updateSpikes(level) {
  level.spikes.forEach(spike => {
    if (rectCollide(player, spike)) {
      loseLife();
    }
  });
}

function checkGoal(level) {
  if (rectCollide(player, level.goal)) {
    gameRunning = false;
    showProject(currentLevel);
  }
}

function loseLife() {
  lives--;
  livesLabel.textContent = `Vies : ${lives}`;

  if (lives <= 0) {
    lives = 3;
    currentLevel = 0;
    loadLevel(currentLevel);
    return;
  }

  loadLevel(currentLevel);
}

function showProject(index) {
  const project = projects[index];

  projectNumber.textContent = project.number;
  projectTitle.textContent = project.title;
  projectArtist.textContent = project.artist;
  projectText.textContent = project.text;

  projectImage.src = project.image;
  projectImage.alt = `Illustration du projet ${project.title}`;

  projectModal.hidden = false;
}

function drawLevel(level) {
  const colors = themeColors[level.theme];

  ctx.fillStyle = colors.sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  for (let i = 0; i < canvas.width; i += 60) {
    ctx.fillRect(i, 0, 1, canvas.height);
  }

  level.platforms.forEach(platform => {
    ctx.fillStyle = colors.ground;
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);

    ctx.fillStyle = colors.accent;
    ctx.fillRect(platform.x, platform.y, platform.w, 4);
  });

  level.spikes.forEach(spike => {
    ctx.fillStyle = colors.accent;

    for (let i = 0; i < spike.w; i += 15) {
      ctx.beginPath();
      ctx.moveTo(spike.x + i, spike.y + spike.h);
      ctx.lineTo(spike.x + i + 7, spike.y);
      ctx.lineTo(spike.x + i + 14, spike.y + spike.h);
      ctx.closePath();
      ctx.fill();
    }
  });

  level.enemies.forEach(enemy => {
    ctx.fillStyle = colors.accent;
    ctx.fillRect(enemy.currentX, enemy.y, 34, 30);

    ctx.fillStyle = "#050507";
    ctx.fillRect(enemy.currentX + 7, enemy.y + 9, 6, 6);
    ctx.fillRect(enemy.currentX + 21, enemy.y + 9, 6, 6);
  });

  ctx.fillStyle = colors.accent;
  ctx.fillRect(level.goal.x, level.goal.y, level.goal.w, level.goal.h);

  ctx.fillStyle = "#050507";
  ctx.fillRect(level.goal.x + 12, level.goal.y + 20, 16, 30);

  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#050507";
  ctx.fillRect(player.x + 6, player.y + 10, 5, 5);
  ctx.fillRect(player.x + 17, player.y + 10, 5, 5);

  ctx.fillStyle = colors.accent;
  ctx.fillRect(player.x + 5, player.y + 26, 18, 5);
}

function gameLoop() {
  const level = levels[currentLevel];

  if (gameRunning) {
    updatePlayer(level);
    updateEnemies(level);
    updateSpikes(level);
    checkGoal(level);
  }

  drawLevel(level);
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "q", "d", "Q", "D"].includes(event.key)) {
    event.preventDefault();
  }

  if (event.key === "ArrowLeft" || event.key === "q" || event.key === "Q") {
    keys.left = true;
  }

  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    keys.right = true;
  }

  if (event.key === "ArrowUp" || event.key === " ") {
    keys.jump = true;
    keys.up = true;
  }
});

document.addEventListener("keyup", event => {
  if (event.key === "ArrowLeft" || event.key === "q" || event.key === "Q") {
    keys.left = false;
  }

  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    keys.right = false;
  }

  if (event.key === "ArrowUp" || event.key === " ") {
    keys.jump = false;
    keys.up = false;
  }
});

nextLevelButton.addEventListener("click", () => {
  projectModal.hidden = true;

  if (currentLevel < levels.length - 1) {
    currentLevel++;
    loadLevel(currentLevel);
  } else {
    winScreen.hidden = false;
  }
});

restartButton.addEventListener("click", () => {
  loadLevel(currentLevel);
});

restartGameButton.addEventListener("click", () => {
  winScreen.hidden = true;
  currentLevel = 0;
  lives = 3;
  loadLevel(currentLevel);
});

loadLevel(currentLevel);
gameLoop();
