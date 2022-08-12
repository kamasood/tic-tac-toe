const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let numberOfMoves = 0;
let currentPlayer = 1;

const gameHeading = document.getElementById('game-heading');
gameHeading.textContent = getCurrentGameHeading();

const squares = document.querySelectorAll('.game-square');
squares.forEach(square => {
  square.addEventListener('click', () => makeMove(square));
});

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

function getCurrentGameHeading() {
  return `Player ${currentPlayer}'s Turn!`;
}

function makeMove(square) {
  numberOfMoves++;

  square.textContent = currentPlayer === 1 ? 'X' : 'O';
  square.disabled = true;

  if (checkForVictory()) {
    declareVictory(currentPlayer);
  } else if (numberOfMoves === 9) {
    declareTie();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    gameHeading.textContent = getCurrentGameHeading();
  }
}

function checkForVictory() {
  const playerMarker = currentPlayer === 1 ? 'X' : 'O';

  return WIN_CONDITIONS.some(condition => {
    return condition.every(index => {
      return squares[index].textContent === playerMarker;
    });
  });
}

function declareVictory(player) {
  gameHeading.textContent = `Player ${currentPlayer} Wins!`;
  squares.forEach(square => square.disabled = true);
  restartButton.style.display = 'block';
}

function declareTie() {
  gameHeading.textContent = 'Tie Game!';
  squares.forEach(square => square.disabled = true);
  restartButton.style.display = 'block';
}

function restartGame() {
  numberOfMoves = 0;
  currentPlayer = 1;

  squares.forEach(square => {
    square.textContent = '';
    square.disabled = false;
  });

  gameHeading.textContent = getCurrentGameHeading();

  restartButton.style.display = 'none';
}
