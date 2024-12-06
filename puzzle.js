document.addEventListener("DOMContentLoaded", () => {
    const scrambledContainer = document.getElementById("scrambled-pieces");
    const gridContainer = document.getElementById("puzzle-grid");
    const message = document.getElementById("message");

    const imageSrc = "images/puzzle.jpg"; // Path to your puzzle image
    const gridSize = 3; // 3x3 grid
    const tileSize = 100; // Size of each tile (px)
    let tiles = [];
    let selectedTile = null;

    // Create the tiles
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const tile = document.createElement("div");
            tile.classList.add("puzzle-piece");
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            tile.style.backgroundImage = `url(${imageSrc})`;
            tile.style.backgroundSize = `${gridSize * tileSize}px ${gridSize * tileSize}px`;
            tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;

            // Assign correct position data
            tile.dataset.row = row;
            tile.dataset.col = col;

            tiles.push(tile);
        }
    }

    // Shuffle the tiles
    tiles = tiles.sort(() => Math.random() - 0.5);

    // Add tiles to the scrambled container
    tiles.forEach(tile => scrambledContainer.appendChild(tile));

    // Add empty slots to the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const slot = document.createElement("div");
        slot.classList.add("puzzle-slot");
        gridContainer.appendChild(slot);
    }

    // Select a tile from the scrambled container
    scrambledContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            selectedTile = e.target;
            message.textContent = "Now click an empty spot to place the tile!";
        }
    });

    // Place the tile into the selected grid slot
    gridContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("puzzle-slot") && !e.target.hasChildNodes()) {
            if (selectedTile) {
                e.target.appendChild(selectedTile);
                selectedTile = null;

                // Check for win condition
                if (checkWin()) {
                    message.textContent = "Congratulations! You solved the puzzle!";
                } else {
                    message.textContent = "Tile placed! Select another one.";
                }
            }
        }
    });

    // Check win condition
    function checkWin() {
        return Array.from(gridContainer.children).every((slot, index) => {
            const tile = slot.firstChild;
            if (tile) {
                const correctRow = Math.floor(index / gridSize);
                const correctCol = index % gridSize;
                return (
                    parseInt(tile.dataset.row) === correctRow &&
                    parseInt(tile.dataset.col) === correctCol
                );
            }
            return false;
        });
    }
});

