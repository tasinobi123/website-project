document.addEventListener("DOMContentLoaded", () => {
    const scrambledContainer = document.getElementById("scrambled-container");
    const gridContainer = document.getElementById("grid-container");
    const imageSrc = "images/puzzle.jpg"; // Ensure this path is correct
    const gridSize = 3; // 3x3 grid
    const tileSize = 100; // Size of each tile (px)
    const tiles = [];

    // Generate tiles for the scrambled container
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const tile = document.createElement("div");
            tile.classList.add("puzzle-piece");
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            tile.style.backgroundImage = `url(${imageSrc})`;
            tile.style.backgroundSize = `${gridSize * tileSize}px ${gridSize * tileSize}px`;
            tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
            tile.dataset.row = row;
            tile.dataset.col = col;

            tiles.push(tile);
        }
    }

    // Shuffle tiles and add to scrambled container
    tiles.sort(() => Math.random() - 0.5);
    tiles.forEach(tile => scrambledContainer.appendChild(tile));

    // Create empty slots in the grid container
    for (let i = 0; i < gridSize * gridSize; i++) {
        const slot = document.createElement("div");
        slot.classList.add("grid-slot");
        gridContainer.appendChild(slot);
    }

    // Allow movement of tiles
    let selectedTile = null;
    scrambledContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            selectedTile = e.target;
        }
    });

    gridContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("grid-slot") && selectedTile) {
            e.target.appendChild(selectedTile);
            selectedTile = null;
        }
    });
});
