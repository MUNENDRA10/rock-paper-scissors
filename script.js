const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".next-btn");
const scoreNumber = document.querySelector(".pcscore");
const userScoreNumber = document.querySelector(".yourscore");



const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
let userScore = getStoredUserScore() || 0;
let pcScore = getStoredPcScore() || 0;



function getStoredUserScore() {
  return parseInt(localStorage.getItem("userScore")) || 0;
}

function getStoredPcScore() {
  return parseInt(localStorage.getItem("pcScore")) || 0;
}

function storeUserScore(score) {
  localStorage.setItem("userScore", score);
}

function storePcScore(score) {
  localStorage.setItem("pcScore", score);
}

function updateScoreDisplay() {
  userScoreNumber.innerText = userScore;
  scoreNumber.innerText = pcScore;
}



function keepScore(point, winner) {
  if (winner === "user") {
    userScore += point;
    userScore = Math.max(userScore, 0);
    storeUserScore(userScore);
  } else if (winner === "pc") {
    pcScore += point;
    pcScore = Math.max(pcScore, 0);
    storePcScore(pcScore);
  }
  updateScoreDisplay();
}



choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}



function displayResults(results) {
  const basePath = window.location.href.replace("index.html", "");
  resultDivs.forEach((resultDiv, ex) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[ex].name}">
          <img src="${basePath}Images/icon-${results[ex].name}.png" alt="${results[ex].name}" />
        </div>
      `;
    }, ex * 100);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}





function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "You win<br><p class='against-pc'>Against pc</p>";
      resultDivs[0].classList.toggle("winner");
      keepScore(1, "user");
      nextBtn.classList.remove("hidden");
      positionButtonsForWin();
    } else if (pcWins) {
      resultText.innerHTML = "You lost<br><p class='against-pc'>Against pc</p>";
      resultDivs[1].classList.toggle("winner");
      keepScore(1, "pc");
      nextBtn.classList.add("hidden");
    } else {
      resultText.innerHTML = "tie up";
      playAgainBtn.textContent = "replay";
      resultDivs[0].classList.toggle("winner");
      resultDivs[0].classList.toggle("winner");
      nextBtn.classList.add("hidden");
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 100);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}



playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});



function homepage() {
  window.location.href = 'index.html';
  }

function nextButton() {
  window.location.href = 'hurray.html';
}

document.querySelector('.next-btn').addEventListener('click', function() {
  nextButton();
})

document.querySelector('.play-again').addEventListener('click', function() {
  homepage();
});



btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
updateScoreDisplay();

setTimeout(() => {
  document.body.classList.remove("first");
}, 500);



function positionButtonsForWin() {
  nextBtn.style.position = "absolute";
  nextBtn.style.bottom = "1.5rem";
  nextBtn.style.right = "2rem";
  btnRules.style.position = "absolute";
  btnRules.style.bottom = "1.5rem";
  btnRules.style.right = "9rem";
}


