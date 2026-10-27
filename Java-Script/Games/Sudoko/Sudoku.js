let size;
let boxRows;
let boxCols;
let currentLevel;

let solution = [];

let selectedCell = null;

let timerInterval;
let seconds = 0;

let gameFinished = false;

let undoStack = [];

let notesMode = false;

let mistakes = 0;

let hintsRemaining = 0;

let previousTime =
    localStorage.getItem("sudokuPreviousTime");

let streak =
    parseInt(
        localStorage.getItem("sudokuStreak")
    ) || 0;


// ==========================================
// SET LEVEL
// ==========================================

function setLevel() {

    let level =
        document.getElementById("level").value;

    currentLevel = level;

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


// ==========================================
// SHUFFLE
// ==========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        let j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];
    }

    return array;
}


// ==========================================
// CHECK SAFE
// ==========================================

function isSafe(
    grid,
    row,
    col,
    number
) {

    // Row

    for (
        let i = 0;
        i < size;
        i++
    ) {

        if (
            grid[row][i] === number
        ) {
            return false;
        }
    }


    // Column

    for (
        let i = 0;
        i < size;
        i++
    ) {

        if (
            grid[i][col] === number
        ) {
            return false;
        }
    }


    // Box

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

            if (
                grid[r][c] === number
            ) {
                return false;
            }
        }
    }


    return true;
}


// ==========================================
// CREATE SUDOKU
// ==========================================

function createSudoku() {

    let grid = [];


    for (
        let row = 0;
        row < size;
        row++
    ) {

        grid[row] = [];

        for (
            let col = 0;
            col < size;
            col++
        ) {

            grid[row][col] = 0;
        }
    }


    function fillGrid(
        row,
        col
    ) {

        if (
            row === size
        ) {
            return true;
        }


        let nextRow = row;

        let nextCol =
            col + 1;


        if (
            nextCol === size
        ) {

            nextRow++;

            nextCol = 0;
        }


        let numbers = [];


        for (
            let i = 1;
            i <= size;
            i++
        ) {

            numbers.push(i);
        }


        shuffle(numbers);


        for (
            let number of numbers
        ) {

            if (
                isSafe(
                    grid,
                    row,
                    col,
                    number
                )
            ) {

                grid[row][col] =
                    number;


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


// ==========================================
// GET EMPTY CELLS
// ==========================================

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


// ==========================================
// CREATE GAME UI
// ==========================================

function updateNumberPad() {

    let numberPad =
        document.querySelector(
            ".number-pad"
        );


    numberPad.querySelectorAll("[data-number]").forEach(
        function (button) {
            button.remove();
        }
    );

    numberPad.className =
        `number-pad size-${size}`;


    for (
        let number = 1;
        number <= size;
        number++
    ) {

        let button =
            document.createElement(
                "button"
            );


        button.className =
            "number-button";


        button.textContent =
            number;


        button.dataset.number =
            number;

        button.style.gridColumn =
            String((number - 1) % 3 + 1);

        button.style.gridRow =
            String(Math.floor((number - 1) / 3) + 1);


        button.addEventListener(
            "click",
            function () {

                enterNumber(number);
            }
        );


        numberPad.appendChild(
            button
        );
    }

    let clearButton =
        document.getElementById("clearButton");

    clearButton.style.gridColumn =
        "4";

    clearButton.style.gridRow =
        "1";

    numberPad.appendChild(clearButton);

    let undoButton =
        document.getElementById("undoButton");

    undoButton.style.gridColumn =
        "4";

    undoButton.style.gridRow =
        "2";

    numberPad.appendChild(undoButton);

    let hintButton =
        document.getElementById("hintButton");

    hintButton.hidden =
        size === 4;

    hintsRemaining =
        size === 6 ? 3 : size === 9 ? 5 : 0;

    updateHintCount();
}


function createGameUI() {

    if (
        document.querySelector(
            ".game-panel"
        )
    ) {
        return;
    }


    let sudoku =
        document.getElementById(
            "sudoku"
        );


    // ------------------------------
    // TIME / SCORE
    // ------------------------------

    let gameInfo =
        document.createElement(
            "div"
        );

    gameInfo.className =
        "game-info";


    gameInfo.innerHTML = `

        <div class="info-item">

            <span class="info-label">
                TIME
            </span>

            <span
                id="timer"
                class="info-value"
            >
                00:00
            </span>

        </div>

        <div class="info-item">

            <span class="info-label">
                POINTS
            </span>

            <span
                id="score"
                class="info-value"
            >
                0
            </span>

        </div>


    `;


    sudoku.parentNode.insertBefore(
        gameInfo,
        sudoku
    );


    // ------------------------------
    // GAME PANEL
    // ------------------------------

    let panel =
        document.createElement(
            "div"
        );

    panel.className =
        "game-panel";


    // ------------------------------
    // GAME OPTIONS
    // ------------------------------

    let options =
        document.createElement(
            "div"
        );

    options.className =
        "game-options";

    let hintButton =
        document.createElement(
            "button"
        );

    hintButton.id =
        "hintButton";

    hintButton.className =
        "option-control hint-control";

    hintButton.innerHTML =
        '<span aria-hidden="true">💡</span><span>Hint</span><span id="hint-count"></span>';

    hintButton.onclick =
        giveHint;

    let notesButton =
        document.createElement(
            "button"
        );

    notesButton.id =
        "notesButton";

    notesButton.className =
        "option-control notes-control";

    notesButton.innerHTML =
        '<span aria-hidden="true">✎</span><span>Notes</span><span id="notes-state">OFF</span>';

    notesButton.onclick =
        toggleNotes;

    options.appendChild(
        hintButton
    );

    options.appendChild(
        notesButton
    );

    panel.appendChild(
        options
    );


    // ------------------------------
    // NUMBER PAD
    // ------------------------------

    let numberPad =
        document.createElement(
            "div"
        );

    numberPad.className =
        "number-pad";


    panel.appendChild(
        numberPad
    );


    let clearButton =
        document.createElement(
            "button"
        );

    clearButton.id =
        "clearButton";

    clearButton.className =
        "number-button utility-button";

    clearButton.innerHTML =
        '<span class="utility-icon" aria-hidden="true">×</span><span>Erase</span>';

    clearButton.onclick =
        clearSelectedCell;

    let undoButton =
        document.createElement(
            "button"
        );

    undoButton.id =
        "undoButton";

    undoButton.className =
        "number-button utility-button";

    undoButton.innerHTML =
        '<span class="utility-icon" aria-hidden="true">↶</span><span>Undo</span>';

    undoButton.onclick =
        undoMove;

    numberPad.appendChild(
        clearButton
    );

    numberPad.appendChild(
        undoButton
    );


    sudoku.parentNode.insertBefore(
        panel,
        document.querySelector(
            "#new-game-button"
        )
    );
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(
        timerInterval
    );


    seconds = 0;

    gameFinished = false;


    updateTimer();


    timerInterval =
        setInterval(
            function () {

                if (
                    !gameFinished
                ) {

                    seconds++;

                    updateTimer();
                }

            },
            1000
        );
}


function updateTimer() {

    let minutes =
        Math.floor(
            seconds / 60
        );


    let secs =
        seconds % 60;


    let text =
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secs)
            .padStart(2, "0");


    let timer =
        document.getElementById(
            "timer"
        );


    if (timer) {

        timer.textContent =
            text;
    }
}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(totalSeconds) {

    let minutes =
        Math.floor(
            totalSeconds / 60
        );


    let secs =
        totalSeconds % 60;


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secs)
            .padStart(2, "0")
    );
}


// ==========================================
// SELECT CELL
// ==========================================

function selectCell(cell) {

    if (
        !cell.querySelector(
            "input"
        )
    ) {
        return;
    }


    selectedCell = cell;


    highlightBoard();


    // Highlight same number

    let input =
        cell.querySelector(
            "input"
        );


    if (
        input.value
    ) {

        highlightSameNumber(
            input.value
        );
    }
}


// ==========================================
// HIGHLIGHT ROW / COLUMN / BOX
// ==========================================

function highlightBoard() {

    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );


    cells.forEach(
        function (cell) {

            cell.classList.remove(
                "selected-cell",
                "related-cell",
                "same-number"
            );
        }
    );


    if (
        !selectedCell
    ) {
        return;
    }


    let row =
        parseInt(
            selectedCell.dataset.row
        );


    let col =
        parseInt(
            selectedCell.dataset.col
        );


    cells.forEach(
        function (cell) {

            let r =
                parseInt(
                    cell.dataset.row
                );

            let c =
                parseInt(
                    cell.dataset.col
                );


            if (
                r === row ||
                c === col
            ) {

                cell.classList.add(
                    "related-cell"
                );
            }


            let sameBox =
                Math.floor(
                    r / boxRows
                )
                ===
                Math.floor(
                    row / boxRows
                )
                &&
                Math.floor(
                    c / boxCols
                )
                ===
                Math.floor(
                    col / boxCols
                );


            if (
                sameBox
            ) {

                cell.classList.add(
                    "related-cell"
                );
            }
        }
    );


    selectedCell.classList.add(
        "selected-cell"
    );


    let input =
        selectedCell.querySelector(
            "input"
        );


    if (
        input &&
        input.value
    ) {

        highlightSameNumber(
            input.value
        );
    }
}


// ==========================================
// SAME NUMBER HIGHLIGHT
// ==========================================

function highlightSameNumber(
    number
) {

    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );


    cells.forEach(
        function (cell) {

            let value;


            if (
                cell.textContent
            ) {

                value =
                    cell.textContent;

            } else {

                let input =
                    cell.querySelector(
                        "input"
                    );


                if (input) {

                    value =
                        input.value;
                }
            }


            if (
                value ===
                String(number)
            ) {

                cell.classList.add(
                    "same-number"
                );
            }
        }
    );
}


// ==========================================
// ENTER NUMBER
// ==========================================

function enterNumber(number) {

    if (
        !selectedCell
    ) {

        showMessage(
            "Select a cell first.",
            "warning"
        );

        return;
    }


    let input =
        selectedCell.querySelector(
            "input"
        );


    if (!input) {
        return;
    }


    let row =
        parseInt(
            selectedCell.dataset.row
        );


    let col =
        parseInt(
            selectedCell.dataset.col
        );


    // NOTES MODE

    if (
        notesMode
    ) {

        toggleNote(
            selectedCell,
            number
        );

        return;
    }


    // Save previous value

    undoStack.push({
        cell: selectedCell,
        oldValue: input.value,
        row: row,
        col: col
    });

    input.classList.remove(
        "hint-number"
    );

    // Check answer immediately

    if (
        number !==
        solution[row][col]
    ) {

        input.value =
            number;


        input.classList.add(
            "wrong-number"
        );


        mistakes++;


        showMessage(
            "❌ Incorrect number.",
            "error"
        );

    } else {

        input.value =
            number;


        input.classList.remove(
            "wrong-number"
        );

        input.classList.remove(
            "hint-number"
        );


        showMessage(
            "✓ Correct!",
            "success"
        );
    }

    updateConflictHighlights();

    highlightBoard();


    checkCompletedUnits();


    checkGameComplete();
}


function handleNumberKey(event) {

    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
    ) {
        return;
    }


    if (
        event.target.matches(
            "input, textarea, select, button"
        ) &&
        !event.target.matches(
            "#sudoku input[readonly]"
        )
    ) {
        return;
    }


    let key =
        event.key.match(/^[1-9]$/)
            ? event.key
            : event.code.match(/^Numpad([1-9])$/)?.[1];


    if (
        !key ||
        Number(key) > size
    ) {
        return;
    }


    enterNumber(Number(key));
}


// ==========================================
// NOTES
// ==========================================

function toggleNotes() {

    notesMode =
        !notesMode;


    document.getElementById("notes-state").textContent =
        notesMode ? "ON" : "OFF";

    document.getElementById("notesButton").setAttribute(
        "aria-pressed",
        String(notesMode)
    );

    document.getElementById("notesButton").classList.toggle(
        "is-active",
        notesMode
    );
}


function updateHintCount() {

    let count =
        document.getElementById("hint-count");

    if (count) {
        count.textContent =
            hintsRemaining > 0
                ? String(hintsRemaining)
                : "";
    }
}


function updateConflictHighlights() {

    let cells =
        Array.from(
            document.querySelectorAll("#sudoku .cell")
        );

    let values =
        cells.map(function (cell) {
            let input = cell.querySelector("input");
            return input ? input.value : cell.textContent;
        });

    cells.forEach(function (cell, index) {
        let row = Number(cell.dataset.row);
        let col = Number(cell.dataset.col);
        let value = values[index];
        let hasDuplicate = value !== "" &&
            cells.some(function (otherCell, otherIndex) {
                if (otherIndex === index || values[otherIndex] !== value) {
                    return false;
                }

                let otherRow = Number(otherCell.dataset.row);
                let otherCol = Number(otherCell.dataset.col);
                let sameRow = row === otherRow;
                let sameColumn = col === otherCol;
                let sameBox =
                    Math.floor(row / boxRows) === Math.floor(otherRow / boxRows) &&
                    Math.floor(col / boxCols) === Math.floor(otherCol / boxCols);

                return sameRow || sameColumn || sameBox;
            });

        let input = cell.querySelector("input");

        cell.classList.toggle(
            "incorrect-cell",
            Boolean(input && input.classList.contains("wrong-number"))
        );

        cell.classList.toggle(
            "conflict-cell",
            hasDuplicate
        );
    });
}


function toggleNote(
    cell,
    number
) {

    let notes =
        cell.querySelector(
            ".notes"
        );


    if (!notes) {

        notes =
            document.createElement(
                "div"
            );

        notes.className =
            "notes";


        cell.appendChild(
            notes
        );
    }


    let note =
        notes.querySelector(
            `[data-note="${number}"]`
        );


    if (note) {

        note.remove();

    } else {

        let span =
            document.createElement(
                "span"
            );

        span.dataset.note =
            number;

        span.textContent =
            number;


        notes.appendChild(
            span
        );
    }
}


// ==========================================
// UNDO
// ==========================================

function undoMove() {

    if (
        undoStack.length === 0
    ) {

        showMessage(
            "Nothing to undo.",
            "warning"
        );

        return;
    }


    let move =
        undoStack.pop();


    let input =
        move.cell.querySelector(
            "input"
        );


    if (input) {

        input.value =
            move.oldValue;


        input.classList.remove(
            "wrong-number"
        );
    }

    updateConflictHighlights();

    highlightBoard();


    showMessage(
        "↩ Move undone.",
        "normal"
    );
}


// ==========================================
// CLEAR SELECTED CELL
// ==========================================

function clearSelectedCell() {

    if (
        !selectedCell
    ) {

        showMessage(
            "Select a cell first.",
            "warning"
        );

        return;
    }


    let input =
        selectedCell.querySelector(
            "input"
        );


    if (
        input
    ) {

        undoStack.push({
            cell: selectedCell,
            oldValue: input.value,
            row: selectedCell.dataset.row,
            col: selectedCell.dataset.col
        });


        input.value = "";


        input.classList.remove(
            "wrong-number"
        );
    }

    updateConflictHighlights();

    highlightBoard();
}


// ==========================================
// CHECK ROW / COLUMN / BOX
// ==========================================

function checkCompletedUnits() {

    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );


    // --------------------------
    // ROWS
    // --------------------------

    for (
        let row = 0;
        row < size;
        row++
    ) {

        let values = [];


        for (
            let col = 0;
            col < size;
            col++
        ) {

            let cell =
                getCell(
                    row,
                    col
                );


            let value =
                getCellValue(cell);


            if (
                value === null
            ) {

                values = [];

                break;
            }


            values.push(
                value
            );
        }


        if (
            values.length === size
        ) {

            checkUnit(
                values,
                `Row ${row + 1}`,
                row,
                "row"
            );
        }
    }


    // --------------------------
    // COLUMNS
    // --------------------------

    for (
        let col = 0;
        col < size;
        col++
    ) {

        let values = [];


        for (
            let row = 0;
            row < size;
            row++
        ) {

            let cell =
                getCell(
                    row,
                    col
                );


            let value =
                getCellValue(cell);


            if (
                value === null
            ) {

                values = [];

                break;
            }


            values.push(
                value
            );
        }


        if (
            values.length === size
        ) {

            checkUnit(
                values,
                `Column ${col + 1}`,
                col,
                "column"
            );
        }
    }


    // --------------------------
    // BOXES
    // --------------------------

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

            let values = [];


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

                    let cell =
                        getCell(
                            row,
                            col
                        );


                    let value =
                        getCellValue(
                            cell
                        );


                    if (
                        value === null
                    ) {

                        values = [];

                        break;
                    }


                    values.push(
                        value
                    );
                }
            }


            if (
                values.length ===
                boxRows * boxCols
            ) {

                checkUnit(
                    values,
                    "Box",
                    `${boxRow}-${boxCol}`,
                    "box"
                );
            }
        }
    }
}


// ==========================================
// CHECK UNIT
// ==========================================

function checkUnit(
    values,
    name,
    identifier,
    type
) {

    let correct = true;


    for (
        let number = 1;
        number <= size;
        number++
    ) {

        if (
            !values.includes(
                number
            )
        ) {

            correct = false;

            break;
        }
    }


    if (
        correct
    ) {

        showMessage(
            `✅ ${name} completed correctly!`,
            "success"
        );

        highlightCompletedUnit(
            identifier,
            type,
            true
        );

    } else {

        showMessage(
            `❌ ${name} is not correct yet.`,
            "error"
        );

        highlightCompletedUnit(
            identifier,
            type,
            false
        );
    }
}


// ==========================================
// HIGHLIGHT COMPLETED UNIT
// ==========================================

function highlightCompletedUnit(
    identifier,
    type,
    correct
) {

    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );


    cells.forEach(
        function (cell) {

            let row =
                parseInt(
                    cell.dataset.row
                );


            let col =
                parseInt(
                    cell.dataset.col
                );


            let match = false;


            if (
                type === "row"
            ) {

                match =
                    row === identifier;

            } else if (
                type === "column"
            ) {

                match =
                    col === identifier;

            } else {

                let parts =
                    identifier.split("-");


                let boxRow =
                    parseInt(
                        parts[0]
                    );

                let boxCol =
                    parseInt(
                        parts[1]
                    );


                match =
                    Math.floor(
                        row / boxRows
                    )
                    ===
                    Math.floor(
                        boxRow / boxRows
                    )
                    &&
                    Math.floor(
                        col / boxCols
                    )
                    ===
                    Math.floor(
                        boxCol / boxCols
                    );
            }


            if (
                match
            ) {

                if (
                    correct
                ) {

                    cell.classList.add(
                        "unit-correct"
                    );

                } else {

                    cell.classList.add(
                        "unit-wrong"
                    );
                }


                setTimeout(
                    function () {

                        cell.classList.remove(
                            "unit-correct",
                            "unit-wrong"
                        );

                    },
                    1200
                );
            }
        }
    );
}


// ==========================================
// GET CELL
// ==========================================

function getCell(
    row,
    col
) {

    return document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
    );
}


// ==========================================
// GET CELL VALUE
// ==========================================

function getCellValue(cell) {

    if (
        !cell
    ) {
        return null;
    }


    if (
        cell.dataset.fixed === "true"
    ) {

        return parseInt(
            cell.textContent
        );
    }


    let input =
        cell.querySelector(
            "input"
        );


    if (
        !input ||
        !input.value
    ) {

        return null;
    }


    return parseInt(
        input.value
    );
}


// ==========================================
// HINT
// ==========================================

function giveHint() {

    if (hintsRemaining <= 0) {
        return;
    }

    let emptyCells = [];


    for (
        let row = 0;
        row < size;
        row++
    ) {

        for (
            let col = 0;
            col < size;
            col++
        ) {

            let cell =
                getCell(
                    row,
                    col
                );


            if (
                cell.dataset.fixed !==
                "true"
            ) {

                let input =
                    cell.querySelector(
                        "input"
                    );


                if (
                    input &&
                    !input.value
                ) {

                    emptyCells.push(
                        {
                            cell: cell,
                            row: row,
                            col: col
                        }
                    );
                }
            }
        }
    }


    if (
        emptyCells.length === 0
    ) {

        showMessage(
            "No empty cells left.",
            "normal"
        );

        return;
    }


    let random =
        emptyCells[
            Math.floor(
                Math.random() *
                emptyCells.length
            )
        ];


    selectedCell =
        random.cell;


    let input =
        random.cell.querySelector(
            "input"
        );


    input.value =
        solution[
            random.row
        ][
            random.col
        ];

    hintsRemaining--;
    updateHintCount();


    input.classList.add(
        "hint-number"
    );


    showMessage(
        "💡 Hint used.",
        "warning"
    );

    updateConflictHighlights();

    highlightBoard();


    checkCompletedUnits();


    checkGameComplete();
}


// ==========================================
// CHECK COMPLETE GAME
// ==========================================

function checkGameComplete() {

    if (
        gameFinished
    ) {
        return;
    }


    let cells =
        document.querySelectorAll(
            "#sudoku .cell"
        );


    for (
        let row = 0;
        row < size;
        row++
    ) {

        for (
            let col = 0;
            col < size;
            col++
        ) {

            let cell =
                getCell(
                    row,
                    col
                );


            let value =
                getCellValue(cell);


            if (
                value !==
                solution[row][col]
            ) {

                return;
            }
        }
    }


    // Completed

    gameFinished = true;

    document.getElementById(
        "sudoku"
    ).classList.add(
        "game-won"
    );

    let winOverlay =
        document.getElementById(
            "win-overlay"
        );

    let level =
        currentLevel;

    let bestScoreKey =
        `sudokuBestScore-${level}`;

    let previousBestScore =
        parseInt(
            localStorage.getItem(bestScoreKey)
        ) || 0;

    let previousGameTime =
        previousTime
            ? formatTime(parseInt(previousTime))
            : "None yet";


    clearInterval(
        timerInterval
    );


    let baseScore =
        size === 4
            ? 100
            : size === 6
                ? 200
                : 300;


    let timeBonus =
        Math.max(
            0,
            300 - seconds
        );


    let mistakePenalty =
        mistakes * 10;


    let score =
        Math.max(
            10,
            baseScore
            +
            timeBonus
            -
            mistakePenalty
        );


    document.getElementById(
        "score"
    ).textContent =
        score;

    if (
        score > previousBestScore
    ) {
        localStorage.setItem(
            bestScoreKey,
            score
        );
    }


    // Streak

    streak++;


    localStorage.setItem(
        "sudokuStreak",
        streak
    );


    localStorage.setItem(
        "sudokuPreviousTime",
        seconds
    );


    previousTime =
        seconds;

    document.getElementById("win-banner").innerHTML =
        `<h2 id="win-title">🎉 You solved it! 🎉</h2><span class="win-details">⏱ Time: ${formatTime(seconds)}<br>🕘 Previous time: ${previousGameTime}<br>🔥 Streak: ${streak}<br>🏆 Points: ${score}<br>🏆 Previous best score: ${previousBestScore || "None yet"}</span>`;

    winOverlay.hidden = false;

    document.getElementById("win-new-game-button").focus();

    let message =
        document.getElementById(
            "message"
        );

    message.textContent =
        "";

    message.hidden =
        true;
}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    text,
    type
) {

    let message =
        document.getElementById(
            "message"
        );


    message.innerHTML =
        text;

    message.hidden =
        false;


    message.className =
        "message " + type;
}


// ==========================================
// NEW GAME
// ==========================================

function newGame() {

    setLevel();


    createGameUI();


    updateNumberPad();


    startTimer();


    undoStack = [];

    selectedCell = null;

    notesMode = false;

    mistakes = 0;

    gameFinished = false;


    solution =
        createSudoku();


    let sudoku =
        document.getElementById(
            "sudoku"
        );


    sudoku.innerHTML =
        "";

    document.getElementById("notes-state").textContent =
        "OFF";

    document.getElementById("notesButton").classList.remove(
        "is-active"
    );

    document.getElementById("notesButton").setAttribute(
        "aria-pressed",
        "false"
    );

    sudoku.classList.remove(
        "game-won"
    );

    let winOverlay =
        document.getElementById(
            "win-overlay"
        );

    winOverlay.hidden = true;

    document.getElementById("win-banner").textContent =
        "";


    sudoku.style.gridTemplateColumns =
        `repeat(${size}, 55px)`;


    let emptyPositions =
        getEmptyCells();


    for (
        let row = 0;
        row < size;
        row++
    ) {

        for (
            let col = 0;
            col < size;
            col++
        ) {

            let cell =
                document.createElement(
                    "div"
                );


            cell.className =
                "cell";


            cell.dataset.row =
                row;


            cell.dataset.col =
                col;


            // Borders

            cell.style.borderRight =
                "1px solid #c5cbe0";

            cell.style.borderBottom =
                "1px solid #c5cbe0";


            if (
                col === 0
            ) {

                cell.style.borderLeft =
                    "2px solid #29335c";
            }


            if (
                row === 0
            ) {

                cell.style.borderTop =
                    "2px solid #29335c";
            }


            if (
                (col + 1) % boxCols === 0
            ) {

                cell.style.borderRight =
                    "3px solid #29335c";
            }


            if (
                (row + 1) % boxRows === 0
            ) {

                cell.style.borderBottom =
                    "3px solid #29335c";
            }


            let isEmpty =
                emptyPositions.some(
                    function (position) {

                        return (
                            position[0] === row &&
                            position[1] === col
                        );
                    }
                );


            if (
                isEmpty
            ) {

                cell.dataset.fixed =
                    "false";


                let input =
                    document.createElement(
                        "input"
                    );


                input.type =
                    "text";


                input.readOnly =
                    true;


                cell.appendChild(
                    input
                );


                cell.addEventListener(
                    "click",
                    function () {

                        selectCell(cell);
                    }
                );

            } else {

                cell.dataset.fixed =
                    "true";


                cell.textContent =
                    solution[row][col];
            }


            sudoku.appendChild(
                cell
            );
        }
    }


    document.getElementById(
        "message"
    ).textContent =
        "";

    document.getElementById(
        "message"
    ).hidden =
        true;

    document.getElementById(
        "score"
    ).textContent =
        "0";




    document.getElementById(
        "start-prompt"
    ).hidden = true;

    document.getElementById(
        "start-game-button"
    ).hidden = true;

    document.getElementById(
        "new-game-button"
    ).hidden = false;
}


function startGame() {

    newGame();
}


// ==========================================
// START
// ==========================================

document.addEventListener(
    "keydown",
    handleNumberKey
);