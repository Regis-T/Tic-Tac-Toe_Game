// Get elements from the HTML
const board = document.getElementById("game-board");
const text = document.getElementById("game-text");
const restartButton = document.getElementById("restart-button");

// Store the board state (empty at start)
let squares = ["", "", "", "", "", "", "", "", ""];

// Set starting player
let player = "X";

// Game over flag
let finished = false;

// Function to create the game board
function makeBoard() {
  board.innerHTML = ""; // Clear previous board

  // Create 9 squares
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "square";
    cell.textContent = squares[i];

    // Add click event for each square
    cell.addEventListener("click", () => handleClick(i));

    board.appendChild(cell);
  }
}

// Handle a square being clicked
function handleClick(i) {
  // Only allow if square is empty and game is not over
  if (squares[i] === "" && !finished) {
    // Mark the square with the player's symbol
    squares[i] = player;

    // Check if the player wins
    if (checkWin()) {
      text.textContent = "Player " + player + " wins!";
      finished = true;
    }
    // Check for draw (no empty squares)
    else if (!squares.includes("")) {
      text.textContent = "It's a draw!";
      finished = true;
    }
    // Switch turns
    else {
      player = player === "X" ? "O" : "X";
      text.textContent = "Player " + player + "'s turn";
    }

    // Redraw board
    makeBoard();
  }
}

// Function to check for winning combinations
function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  return wins.some(([a, b, c]) =>
    squares[a] && squares[a] === squares[b] && squares[b] === squares[c]
  );
}

// When the restart button is clicked
restartButton.addEventListener("click", () => {
  // Reset game state
  squares = ["", "", "", "", "", "", "", "", ""];
  player = "X";
  finished = false;
  text.textContent = "Player X's turn";

  // Redraw the board
  makeBoard();
});

// Start the game when page loads
makeBoard();
