let size;
let boxRows;
let boxCols;
let solution = [];


// Set level
function setLevel() {

    let level = document.getElementById("level").value;

    if (level === "easy") {

        size = 4;
        boxRows = 2;
        boxCols = 2;

    } else if (level === "hard") {

        size = 6;
        boxRows = 2;
        boxCols = 3;

    } else {

        size = 9;
        boxRows = 3;
        boxCols = 3;
    }
}


// Shuffle array
function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}


// Check whether a number can be placed
function isSafe(grid, row, col, number) {

    // Check row
    for (let i = 0; i < size; i++) {

        if (grid[row][i] === number) {
            return false;
        }
    }


    // Check column
    for (let i = 0; i < size; i++) {

        if (grid[i][col] === number) {
            return false;
        }
    }


    // Check big box
    let startRow =
        row - (row % boxRows);

    let startCol =
        col - (col % boxCols);


    for (
        let r = startRow;
        r < startRow + boxRows;
        r++
    ) {

        for (
            let c = startCol;
            c < startCol + boxCols;
            c++
        ) {

            if (grid[r][c] === number) {
                return false;
            }
        }
    }


    return true;
}


// Generate a proper Sudoku solution
function createSudoku() {

    let grid = [];


    // Empty grid
    for (let row = 0; row < size; row++) {

        grid[row] = [];

        for (let col = 0; col < size; col++) {

            grid[row][col] = 0;
        }
    }


    // Fill grid using backtracking
    function fillGrid(row, col) {

        if (row === size) {
            return true;
        }


        let nextRow = row;
        let nextCol = col + 1;


        if (nextCol === size) {

            nextRow++;
            nextCol = 0;
        }


        let numbers = [];


        for (let i = 1; i <= size; i++) {
            numbers.push(i);
        }


        shuffle(numbers);


        for (let number of numbers) {

            if (
                isSafe(
                    grid,
                    row,
                    col,
                    number
                )
            ) {

                grid[row][col] = number;


                if (
                    fillGrid(
                        nextRow,
                        nextCol
                    )
                ) {

                    return true;
                }


                grid[row][col] = 0;
            }
        }


        return false;
    }


    fillGrid(0, 0);

    return grid;
}


// Get random empty cells from every big box
function getEmptyCells() {

    let emptyPositions = [];

    let emptyPerBox;


    if (size === 4) {

        emptyPerBox = 2;

    } else if (size === 6) {

        emptyPerBox = 3;

    } else {

        emptyPerBox = 5;
    }


    // Visit every big box
    for (
        let boxRow = 0;
        boxRow < size;
        boxRow += boxRows
    ) {

        for (
            let boxCol = 0;
            boxCol < size;
            boxCol += boxCols
        ) {

            let boxPositions = [];


            // Get positions inside this box
            for (
                let row = boxRow;
                row < boxRow + boxRows;
                row++
            ) {

                for (
                    let col = boxCol;
                    col < boxCol + boxCols;
                    col++
                ) {

                    boxPositions.push([
                        row,
                        col
                    ]);
                }
            }


            shuffle(boxPositions);


            // Select empty cells
            for (
                let i = 0;
                i < emptyPerBox;
                i++
            ) {

                emptyPositions.push(
                    boxPositions[i]
                );
            }
        }
    }


    return emptyPositions;
}


// Generate new game
function newGame() {

    setLevel();


    // Create the correct solution
    solution = createSudoku();


    let sudoku =
        document.getElementById("sudoku");

    sudoku.innerHTML = "";


    sudoku.style.gridTemplateColumns =
        `repeat(${size}, 55px)`;


    // Get empty positions
    let emptyPositions =
        getEmptyCells();


    // Create cells
    for (let row = 0; row < size; row++) {

        for (let col = 0; col < size; col++) {

            let cell =
                document.createElement("div");

            cell.className = "cell";


            // Normal borders
            cell.style.borderRight =
                "1px solid #999";

            cell.style.borderBottom =
                "1px solid #999";


            // Outer borders
            if (col === 0) {

                cell.style.borderLeft =
                    "2px solid #222";
            }

            if (row === 0) {

                cell.style.borderTop =
                    "2px solid #222";
            }


            // Big box vertical border
            if (
                (col + 1) % boxCols === 0
            ) {

                cell.style.borderRight =
                    "3px solid #222";
            }


            // Big box horizontal border
            if (
                (row + 1) % boxRows === 0
            ) {

                cell.style.borderBottom =
                    "3px solid #222";
            }


            // Check empty cell
            let isEmpty =
                emptyPositions.some(
                    position =>
                        position[0] === row &&
                        position[1] === col
                );


            if (isEmpty) {

                let input =
                    document.createElement("input");

                input.type = "number";

                input.min = 1;

                input.max = size;

                cell.appendChild(input);

            } else {

                cell.textContent =
                    solution[row][col];
            }


            sudoku.appendChild(cell);
        }
    }


    document.getElementById(
        "message"
    ).textContent = "";
}


// Check answer
function checkSolution() {

    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );

    let index = 0;


    for (let row = 0; row < size; row++) {

        for (let col = 0; col < size; col++) {

            let cell = cells[index++];

            let value;


            if (cell.textContent) {

                value =
                    parseInt(
                        cell.textContent,
                        10
                    );

            } else {

                let input =
                    cell.querySelector("input");


                if (!input.value) {

                    document.getElementById(
                        "message"
                    ).textContent =
                        "❌ Please fill all the cells.";

                    return;
                }


                value =
                    parseInt(
                        input.value,
                        10
                    );


                if (
                    value < 1 ||
                    value > size
                ) {

                    document.getElementById(
                        "message"
                    ).textContent =
                        `❌ Enter numbers from 1 to ${size}.`;

                    return;
                }
            }


            // Compare with the exact solution
            if (
                value !==
                solution[row][col]
            ) {

                document.getElementById(
                    "message"
                ).textContent =
                    "❌ Wrong answer. Try again!";

                return;
            }
        }
    }


    // All values are correct
    document.getElementById(
        "message"
    ).textContent =
        "🎉 Congratulations! You solved it!";
}


// Start first game
newGame();