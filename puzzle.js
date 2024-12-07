document.addEventListener("DOMContentLoaded", () => {
    const levels = [
        { id: "level-1", image: "images/puzzle.jpg", gridSize: 3 },
        { id: "level-2", image: "images/puzzle2.jpg", gridSize: 4 },
        { id: "level-3", image: "images/puzzle3.jpg", gridSize: 6 }
    ];

    levels.forEach(({ id, image, gridSize }) => setupPuzzle(id, image, gridSize));

    function setupPuzzle(containerId, imageSrc, gridSize) {
        const container = document.getElementById(containerId);
        const scrambledContainer = container.querySelector(".scrambled");
        const gridContainer = container.querySelector(".grid");
        const message = container.querySelector(".message");
        const tileSize = 300 / gridSize; // Dynamically adjust tile size for uniform gaps
        let selectedTile = null;

        // Generate tiles
        const tiles = [];
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
        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("puzzle-piece") || e.target.classList.contains("grid-slot")) {
                if (!selectedTile) {
                    selectedTile = e.target;
                    selectedTile.classList.add("selected"); // Optional visual feedback
                } else {
                    if (e.target.classList.contains("grid-slot") && !e.target.hasChildNodes()) {
                        e.target.appendChild(selectedTile);
                    } else if (e.target.classList.contains("scrambled") && !e.target.hasChildNodes()) {
                        e.target.appendChild(selectedTile);
                    } else if (e.target.classList.contains("puzzle-piece")) {
                        const parent = selectedTile.parentNode;
                        parent.appendChild(e.target);
                        e.target.parentNode.appendChild(selectedTile);
                    }

                    selectedTile.classList.remove("selected");
                    selectedTile = null;

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
    }
});
