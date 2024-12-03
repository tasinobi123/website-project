document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("puzzle-container");
    const message = document.getElementById("message");
    const rows = 3; // Number of rows
    const cols = 3; // Number of columns
    const pieces = [];
    let emptyPosition = { row: rows - 1, col: cols - 1 }; // Tracks the empty space

    // Create the tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (row === rows - 1 && col === cols - 1) continue; // Leave one empty space
            const piece = document.createElement("div");
            piece.classList.add("tile");
            piece.style.backgroundImage = "url('images/puzzle.jpg')";
            piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
            piece.dataset.row = row;
            piece.dataset.col = col;
            container.appendChild(piece);
            pieces.push(piece);
        }
    }

    // Randomize the tiles
    shuffle(pieces).forEach((piece) => container.appendChild(piece));

    // Add click event to move tiles
    container.addEventListener("click", (e) => {
        const tile = e.target;
        if (!tile.classList.contains("tile")) return;

        const tileRow = parseInt(tile.dataset.row, 10);
        const tileCol = parseInt(tile.dataset.col, 10);

        if (canMove(tileRow, tileCol)) {
            moveTile(tile, tileRow, tileCol);
            if (isSolved()) {
                message.textContent = "Congrats! You've completed the puzzle!";
            }
        }
    });

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Check if a tile can move
    function canMove(row, col) {
        return (
            (Math.abs(row - emptyPosition.row) === 1 && col === emptyPosition.col) ||
            (Math.abs(col - emptyPosition.col) === 1 && row === emptyPosition.row)
        );
    }

    // Move a tile into the empty space
    function moveTile(tile, row, col) {
        // Update the tile's position visually
        const emptyRow = emptyPosition.row;
        const emptyCol = emptyPosition.col;

        tile.style.transform = `translate(${emptyCol * 100}px, ${emptyRow * 100}px)`;

        // Update tile's dataset to the empty space
        tile.dataset.row = emptyRow;
        tile.dataset.col = emptyCol;

        // Update the empty position to the tile's old position
        emptyPosition = { row, col };
    }

    // Check if puzzle is solved
    function isSolved() {
        return Array.from(container.children).every((tile, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            return parseInt(tile.dataset.row, 10) === row && parseInt(tile.dataset.col, 10) === col;
        });
    }
});

