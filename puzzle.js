document.addEventListener("DOMContentLoaded", () => {
    const scrambledContainer = document.getElementById("scrambled-pieces");
    const gridContainer = document.getElementById("puzzle-grid");
    const message = document.getElementById("message");

    const imageSrc = "images/puzzle.jpg"; // Path to your puzzle image
    const gridSize = 3; // 3x3 grid
    const tileSize = 100; // Size of each tile (px)
    let tiles = [];

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

            // Leave one slot empty
            if (!(row === gridSize - 1 && col === gridSize - 1)) {
                tiles.push(tile);
            }
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

    // Move tiles from scrambled to grid
    scrambledContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            const selectedTile = e.target;
            const emptySlot = Array.from(gridContainer.children).find(
                slot => !slot.hasChildNodes()
            );

            if (emptySlot) {
                emptySlot.appendChild(selectedTile);

                // Check for win condition
                if (checkWin()) {
                    message.textContent = "Congratulations! You solved the puzzle!";
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

