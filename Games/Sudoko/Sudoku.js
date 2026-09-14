function generateGrid() {
  let sudoku = document.getElementById("sudoku");
  sudoku.innerHTML = ""; // clear old grid

  // Create a 4x4 matrix
  let grid = Array.from({ length: 4 }, () => Array(4).fill(null));

  // Fill grid with unique numbers per row and column
  for (let row = 0; row < 4; row++) {
    let used = new Set(); // track numbers in this row
    for (let col = 0; col < 4; col++) {
      let num;
      do {
        num = Math.floor(Math.random() * 4) + 1;
      } while (used.has(num) || grid.some(r => r[col] === num));
      grid[row][col] = num;
      used.add(num);
    }
  }

  // Display grid with random blanks
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let cell = document.createElement("div");
      cell.className = "cell";

      if (Math.random() > 0.5) {
        cell.textContent = grid[row][col]; // pre-filled number
      } else {
        let input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 4;
        cell.appendChild(input); // empty cell for user
      }

      sudoku.appendChild(cell);
    }
  }

  document.getElementById("message").textContent = "";
}

function checkSolution() {
  let cells = document.querySelectorAll("#sudoku .cell");
  let grid = Array.from({ length: 4 }, () => Array(4).fill(null));

  let index = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let cell = cells[index++];
      if (cell.textContent) {
        grid[row][col] = parseInt(cell.textContent);
      } else {
        let input = cell.querySelector("input");
        if (!input.value) {
          document.getElementById("message").textContent = "❌ You lose! Empty cells.";
          return; // stop here, don’t start new game
        }
        grid[row][col] = parseInt(input.value);
      }
    }
  }

  // Check rows and columns for duplicates
  for (let i = 0; i < 4; i++) {
    let rowSet = new Set(grid[i]);
    let colSet = new Set(grid.map(r => r[i]));
    if (rowSet.size !== 4 || colSet.size !== 4) {
      document.getElementById("message").textContent = "❌ You lose! Duplicate in row/column.";
      return; // stop here, don’t start new game
    }
  }

  document.getElementById("message").textContent = "🎉 You win!";
}

// Generate puzzle when page loads
generateGrid();
