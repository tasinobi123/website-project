const puzzleContainer = document.getElementById("puzzle-container");
const message = document.getElementById("message");

// Configuration
const rows = 3;
const cols = 3;
const totalTiles = rows * cols;

// Generate puzzle pieces
function createPuzzle() {
    puzzleContainer.innerHTML = ""; // Clear container
    const tilePositions = [];
    for (let i = 0; i < totalTiles; i++) {
        tilePositions.push(i);
    }

    // Shuffle positions
    shuffleArray(tilePositions);

    tilePositions.forEach((pos, index) => {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.dataset.index = index;

        if (index === totalTiles - 1) {
            // Last tile is the empty space
            piece.classList.add("empty");
        } else {
            const row = Math.floor(pos / cols);
            const col = pos % cols;
            piece.style.backgroundImage = "url('images/puzzle.jpg')";
            piece.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;
        }

        puzzleContainer.appendChild(piece);
    });

    enableTileMovement();
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Enable tile movement
function enableTileMovement() {
    const tiles = Array.from(document.querySelectorAll(".puzzle-piece"));

    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            if (tile.classList.contains("empty")) return;

            const emptyTile = document.querySelector(".puzzle-piece.empty");
            const tileIndex = tiles.indexOf(tile);
            const emptyIndex = tiles.indexOf(emptyTile);

            // Check if tile is adjacent to empty space
            const adjacent = isAdjacent(tileIndex, emptyIndex);
            if (adjacent) {
                swapTiles(tile, emptyTile);
                checkWin();
            }
        });
    });
}

// Check adjacency
function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / cols);
    const col1 = index1 % cols;
    const row2 = Math.floor(index2 / cols);
    const col2 = index2 % cols;

    return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) || // Same row
        (col1 === col2 && Math.abs(row1 - row2) === 1)    // Same column
    );
}

// Swap tiles
function swapTiles(tile1, tile2) {
    const tempClass = tile1.className;
    tile1.className = tile2.className;
    tile2.className = tempClass;

    const tempStyle = tile1.style.cssText;
    tile1.style.cssText = tile2.style.cssText;
    tile2.style.cssText = tempStyle;
}

// Check if puzzle is solved
function checkWin() {
    const tiles = Array.from(document.querySelectorAll(".puzzle-piece"));
    const isSolved = tiles.every((tile, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const correctPosition = `background-position: ${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;

        return tile.style.backgroundPosition === correctPosition || tile.classList.contains("empty");
    });

    if (isSolved) {
        message.textContent = "Congratulations! You solved the puzzle!";
    }
}

// Initialize puzzle
createPuzzle();


