document.addEventListener("DOMContentLoaded", () => {
    const quizSelectionButtons = document.querySelectorAll("#quiz-selection button");
    const quizContainer = document.getElementById("quiz-container");
    const questionsContainer = document.getElementById("questions-container");
    const quizForm = document.getElementById("quiz-form");
    const scoreDisplay = document.getElementById("score-display");

    const quizzes = {
        1: [
            { question: "What is the capital of China?", choices: ["Beijing", "Shanghai", "Tokyo", "Seoul"], answer: "Beijing" },
            { question: "Which planet is closest to the Sun?", choices: ["Mars", "Earth", "Mercury", "Venus"], answer: "Mercury" },
            { question: "Who discovered gravity?", choices: ["Newton", "Einstein", "Galileo", "Copernicus"], answer: "Newton" },
            { question: "What year did World War II end?", choices: ["1945", "1939", "1941", "1950"], answer: "1945" },
            { question: "Which sport uses a shuttlecock?", choices: ["Tennis", "Badminton", "Squash", "Cricket"], answer: "Badminton" },
            { question: "Which element has the atomic number 1?", choices: ["Oxygen", "Hydrogen", "Helium", "Carbon"], answer: "Hydrogen" },
            { question: "Who painted the Mona Lisa?", choices: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Raphael"], answer: "Leonardo da Vinci" },
            { question: "What is the freezing point of water (°C)?", choices: ["0", "100", "-10", "50"], answer: "0" },
            { question: "Who won the FIFA World Cup in 2018?", choices: ["Brazil", "France", "Germany", "Argentina"], answer: "France" },
            { question: "What is the largest mammal?", choices: ["Elephant", "Whale Shark", "Blue Whale", "Orca"], answer: "Blue Whale" },
        ],
        2: [
            { question: "What is the powerhouse of the cell?", choices: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"], answer: "Mitochondria" },
            { question: "What year did the French Revolution begin?", choices: ["1789", "1800", "1776", "1799"], answer: "1789" },
            { question: "How many players are on a basketball team?", choices: ["5", "6", "7", "11"], answer: "5" },
            { question: "What is the chemical symbol for gold?", choices: ["G", "Au", "Ag", "Go"], answer: "Au" },
            { question: "Which gas is most abundant in Earth's atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
            { question: "Who was the first president of the USA?", choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
            { question: "Which country hosted the Olympics in 2020?", choices: ["Japan", "USA", "China", "Russia"], answer: "Japan" },
            { question: "What is the square root of 81?", choices: ["8", "9", "7", "10"], answer: "9" },
            { question: "Who painted the Sistine Chapel ceiling?", choices: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Donatello"], answer: "Michelangelo" },
            { question: "Which team has the most NBA titles?", choices: ["Lakers", "Celtics", "Bulls", "Warriors"], answer: "Celtics" },
        ],
        3: [
            { question: "What is the speed of light in vacuum (km/s)?", choices: ["300,000", "150,000", "299,792", "200,000"], answer: "299,792" },
            { question: "Who developed the theory of general relativity?", choices: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"], answer: "Albert Einstein" },
            { question: "Who was the first emperor of Rome?", choices: ["Augustus", "Julius Caesar", "Nero", "Caligula"], answer: "Augustus" },
            { question: "What is the chemical formula of glucose?", choices: ["C6H12O6", "C5H10O5", "CH4", "C2H6"], answer: "C6H12O6" },
            { question: "What is the SI unit of electric current?", choices: ["Volt", "Ampere", "Ohm", "Coulomb"], answer: "Ampere" },
            { question: "What is the national sport of Japan?", choices: ["Judo", "Sumo Wrestling", "Karate", "Baseball"], answer: "Sumo Wrestling" },
            { question: "What year did the Titanic sink?", choices: ["1912", "1905", "1915", "1920"], answer: "1912" },
            { question: "Which team has the most World Series wins?", choices: ["Yankees", "Dodgers", "Cardinals", "Red Sox"], answer: "Yankees" },
            { question: "What is the approximate age of the Earth?", choices: ["4.5 billion years", "3.5 billion years", "2.5 billion years", "5.5 billion years"], answer: "4.5 billion years" },
            { question: "Who discovered penicillin?", choices: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Edward Jenner"], answer: "Alexander Fleming" },
        ],
    };

    quizSelectionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const level = button.dataset.level;
            startQuiz(level);
        });
    });

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        calculateScore();
    });

    function startQuiz(level) {
        const questions = quizzes[level];
        questionsContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");

            const questionText = document.createElement("h3");
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            q.choices.forEach(choice => {
                const label = document.createElement("label");
                label.innerHTML = `
                    <input type="radio" name="question-${index}" value="${choice}">
                    ${choice}
                `;
                questionDiv.appendChild(label);
            });

            questionsContainer.appendChild(questionDiv);
        });

        quizContainer.classList.remove("hidden");
        scoreDisplay.classList.add("hidden");
    }

    function calculateScore() {
        const formData = new FormData(quizForm);
        let score = 0;
        const level = Object.keys(quizzes).find(l => quizzes[l] === quizzes[formData.get("level")]);
        quizzes[level].forEach((q, index) => {
            if (formData.get(`question-${index}`) === q.answer) {
                score++;
            }
        });
        const percentage = Math.round((score / quizzes[level].length) * 100);
        scoreDisplay.textContent = `Your score: ${percentage}%`;
        scoreDisplay.classList.remove("hidden");
    }
});
