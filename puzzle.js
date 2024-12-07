document.addEventListener("DOMContentLoaded", () => {
    const scrambledContainer = document.getElementById("scrambled-container");
    const gridContainer = document.getElementById("grid-container");
    const imageSrc = "images/puzzle.jpg"; // Ensure this path is correct
    const gridSize = 3; // 3x3 grid
    const tileSize = 100; // Size of each tile (px)
    const tiles = [];
    let selectedTile = null; // Track the currently selected tile

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
    document.addEventListener("click", (e) => {
        // Check if a tile or slot is clicked
        if (e.target.classList.contains("puzzle-piece") || e.target.classList.contains("grid-slot")) {
            if (!selectedTile) {
                // Select the tile or slot
                selectedTile = e.target;
                selectedTile.classList.add("selected"); // Optional visual feedback
            } else {
                // Move the tile to the new slot or container
                if (e.target.classList.contains("grid-slot") && !e.target.hasChildNodes()) {
                    e.target.appendChild(selectedTile);
                } else if (e.target.classList.contains("scrambled") && !e.target.hasChildNodes()) {
                    e.target.appendChild(selectedTile);
                } else if (e.target.classList.contains("puzzle-piece")) {
                    const parent = selectedTile.parentNode;
                    parent.appendChild(e.target);
                    e.target.parentNode.appendChild(selectedTile);
                }

                selectedTile.classList.remove("selected"); // Remove visual feedback
                selectedTile = null; // Reset selectedTile
            }
        }
    });
});
