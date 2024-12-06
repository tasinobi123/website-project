document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.querySelector(".puzzle-container");
    const pieces = Array.from(puzzleContainer.children);

    // Shuffle pieces initially
    shufflePieces();

    // Add event listeners for dragging
    pieces.forEach((piece) => {
        piece.addEventListener("click", () => {
            movePiece(piece);
        });
    });

    function shufflePieces() {
        const shuffled = pieces.sort(() => Math.random() - 0.5);
        puzzleContainer.innerHTML = "";
        shuffled.forEach((piece) => puzzleContainer.appendChild(piece));
    }

    function movePiece(selectedPiece) {
        const emptyPiece = document.querySelector(".empty");
        const emptyIndex = Array.from(puzzleContainer.children).indexOf(emptyPiece);
        const selectedIndex = Array.from(puzzleContainer.children).indexOf(selectedPiece);

        const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];

        if (validMoves.includes(selectedIndex)) {
            // Swap positions
            puzzleContainer.insertBefore(selectedPiece, emptyPiece);
            puzzleContainer.insertBefore(emptyPiece, puzzleContainer.children[selectedIndex]);
        }

        checkCompletion();
    }

    function checkCompletion() {
        const currentOrder = Array.from(puzzleContainer.children).map((child) => child.dataset.order);
        const isComplete = currentOrder.every((order, index) => order == index);
        if (isComplete) {
            alert("Congratulations! You completed the puzzle!");
        }
    }
});


