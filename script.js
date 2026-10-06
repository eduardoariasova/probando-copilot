const moves = {
  piedra: { icon: "✊", beats: "tijera" },
  papel: { icon: "✋", beats: "piedra" },
  tijera: { icon: "✌️", beats: "papel" },
};

const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const playerChoiceElement = document.querySelector("#player-choice");
const computerChoiceElement = document.querySelector("#computer-choice");
const playerChoiceNameElement = document.querySelector("#player-choice-name");
const computerChoiceNameElement = document.querySelector("#computer-choice-name");
const resultElement = document.querySelector("#result");
const messageElement = document.querySelector("#message");
const moveButtons = document.querySelectorAll(".move");
const resetButton = document.querySelector("#reset");
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");

let playerScore = 0;
let computerScore = 0;

function playRound(playerChoice) {
  const choices = Object.keys(moves);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  playerChoiceElement.textContent = moves[playerChoice].icon;
  computerChoiceElement.textContent = moves[computerChoice].icon;
  playerChoiceNameElement.textContent = playerChoice;
  computerChoiceNameElement.textContent = computerChoice;

  if (playerChoice === computerChoice) {
    resultElement.textContent = "¡Es un empate!";
    messageElement.textContent = "Los dos eligieron lo mismo. ¡Otra ronda!";
  } else if (moves[playerChoice].beats === computerChoice) {
    playerScore += 1;
    resultElement.textContent = "¡Ganaste esta ronda!";
    messageElement.textContent = `${capitalize(playerChoice)} le gana a ${computerChoice}.`;
  } else {
    computerScore += 1;
    resultElement.textContent = "Esta ronda es de la computadora";
    messageElement.textContent = `${capitalize(computerChoice)} le gana a ${playerChoice}.`;
  }

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  playerChoiceElement.textContent = "?";
  computerChoiceElement.textContent = "?";
  playerChoiceNameElement.textContent = "Elige abajo";
  computerChoiceNameElement.textContent = "Esperando...";
  resultElement.textContent = "¿Listo para jugar?";
  messageElement.textContent = "La primera ronda es tuya.";
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  const nextMode = nextTheme === "light" ? "oscuro" : "claro";

  document.documentElement.dataset.theme = nextTheme;
  themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
  themeToggle.setAttribute("aria-label", `Cambiar a modo ${nextMode}`);
  themeLabel.textContent = `Modo ${nextMode}`;
  themeToggle.querySelector(".theme-toggle__icon").textContent =
    nextTheme === "light" ? "☾" : "☀";
}

moveButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetButton.addEventListener("click", resetGame);
themeToggle.addEventListener("click", toggleTheme);
