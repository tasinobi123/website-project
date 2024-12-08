document.addEventListener("DOMContentLoaded", () => {
    const wheel = document.getElementById("wheel");
    const spinButton = document.getElementById("spin-button");
    const result = document.getElementById("result");

    const options = [
        "Try Again!",
        "Win a Prize!",
        "Free Hint!",
        "Lose a Turn!",
        "Double Points!",
        "Play Again!",
        "Jackpot!",
        "Small Reward!"
    ];

    let isSpinning = false;

    spinButton.addEventListener("click", () => {
        if (isSpinning) return;

        isSpinning = true;
        result.textContent = ""; // Clear previous result

        const randomIndex = Math.floor(Math.random() * options.length);
        const rotation = 360 * 3 + (randomIndex * (360 / options.length)); // Spin 3 full rounds + land on segment

        wheel.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
        wheel.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            wheel.style.transition = "none";
            wheel.style.transform = `rotate(${(randomIndex * (360 / options.length))}deg)`; // Adjust to final position
            result.textContent = `Result: ${options[randomIndex]}`;
            isSpinning = false;
        }, 3000);
    });
});
