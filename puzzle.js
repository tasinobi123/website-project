const scrambled = document.getElementById("scrambled-pieces");
const grid = document.getElementById("puzzle-grid");
const message = document.getElementById("message");

// Image splitting function
const imageSrc = "puzzle.jpg";
let selectedPiece = null;

// Initialize the puzzle
function initializePuzzle() {
    const pieceIndices = [...Array(9).keys()]; // Create array [0, 1, 2, ..., 8]
    const scrambledIndices = pieceIndices.sort(() => Math.random() - 0.5); // Shuffle indices

    // Populate scrambled pieces
    scrambledIndices.forEach((index) => {
        const piece = document.createElement("div");
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundPosition = `${-(index % 3) * 100}px ${-Math.floor(index / 3) * 100}px`;
        piece.dataset.index = index;
        piece.addEventListener("click", selectPiece);
        scrambled.appendChild(piece);
    });

    // Populate empty grid
    for (let i = 0; i < 9; i++) {
        const slot = document.createElement("div");
        slot.dataset.index = i;
        slot.addEventListener("click", placePiece);
        grid.appendChild(slot);
    }
}

// Select a piece from scrambled
function selectPiece(event) {
    const piece = event.target;

    // Highlight the selected piece
    if (selectedPiece) selectedPiece.classList.remove("selected");
    selectedPiece = piece;
    selectedPiece.classList.add("selected");
}

// Place the piece on the grid
function placePiece(event) {
    if (!selectedPiece) return;

    const slot = event.target;

    // Ensure the slot is empty
    if (!slot.style.backgroundImage) {
        slot.style.backgroundImage = selectedPiece.style.backgroundImage;
        slot.style.backgroundPosition = selectedPiece.style.backgroundPosition;

        // Remove piece from scrambled
        selectedPiece.remove();
        selectedPiece = null;

        checkCompletion();
    }
}

// Check if the puzzle is complete
function checkCompletion() {
    const slots = Array.from(grid.children);

    const isComplete = slots.every((slot, index) => {
        return (
            slot.style.backgroundImage &&
            slot.style.backgroundPosition === `${-(index % 3) * 100}px ${-Math.floor(index / 3) * 100}px`
        );
    });

    if (isComplete) {
        message.textContent = "Congratulations! You've completed the puzzle!";
    }
}

// Initialize on load
initializePuzzle();


