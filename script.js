let timerDuration = 15; // Default timer duration
let playedBefore = false;

let prevVal = 15; // Initialize prevVal with default timerDuration

document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settings-button");
    const timerModal = document.getElementById("timer-modal");
    const closeButton = document.querySelector(".close-button");
    const saveTimerButton = document.getElementById("save-timer-button");
    const timerDisplay = document.getElementById("game-timer");

    // Retrieve the timer value from local storage or default to 15
    const storedTimerDuration = localStorage.getItem("timerDuration");
    timerDuration = storedTimerDuration ? parseInt(storedTimerDuration, 10) : 15;

    // Set the display for timer
    timerDisplay.textContent = `Countdown: ${timerDuration}s`;

    // Open the modal when settings button is clicked
    settingsButton.addEventListener("click", () => {
        timerModal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", () => {
        timerModal.style.display = "none";
    });

    saveTimerButton.addEventListener("click", () => {
        const timerInput = parseInt(document.getElementById("timer-input").value, 10);
        timerDuration = timerInput;

        // Save timer value to local storage
        localStorage.setItem("timerDuration", timerDuration);

        timerDisplay.textContent = `Countdown: ${timerDuration}s`;
        timerModal.style.display = "none";
    });

    // Other game functions should remain the same but utilize the updated timer logic
});




    

    // Other game functions (like showQuestion, handleAnswer) should remain the same but utilize the updated timer logic

// Get the start button and settings button elements
const startButton = document.getElementById('start-button');
const settingsButton = document.getElementById('settings-button');


// Get the audio element

// Function to start the game and play the music
function startGame() {
    // Play the music
    
    // Start the game (your game start logic here)
}



// Add click event listener to the start button
startButton.addEventListener('click', startGame);



// Disable the settings button


// Function to update the time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Update the time immediately and then every minute
updateTime();
setInterval(updateTime, 1000); // Update every minute

function updateQuestionNumber() {
    const voteCountElement = document.querySelector('.vote-count');
    voteCountElement.textContent = currentQuestionIndex + 1;
}

// Show rules when the start button is clicked
document.getElementById('start-button').addEventListener('click', function() {
    // Hide the start button, settings button, and card
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('settings-button').style.display = 'none';
    document.querySelector('.card').style.display = 'none';
    
    // Show the rules container
    document.getElementById('rules-container').style.display = 'block';
});

// Listen for the "Enter" key press on the home screen
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && document.getElementById('rules-container').style.display === 'none') {
        // Hide the start button, settings button, and card
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('settings-button').style.display = 'none';
        document.querySelector('.card').style.display = 'none';
        
        // Show the rules container
        document.getElementById('rules-container').style.display = 'block';
    }
});

// Hide rules and continue with the game when the continue button is clicked
document.getElementById('continue-button').addEventListener('click', function() {
    document.getElementById('rules-container').style.display = 'none';
});

// Proceed to the game when the "Enter" key is pressed in the rules container
document.addEventListener('keypress', function(event) {
    const rulesContainer = document.getElementById('rules-container');
    if (rulesContainer.style.display === 'block' && event.key === 'Enter') {
        rulesContainer.style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        showQuestion();
    }
});


// JavaScript to handle the grammar game logic

// Questions array with wrong sentences, their correct versions, and explanations
const questions = [
    { 
        wrong: "She don't like apples.", 
        correct: "She doesn't like apples.", 
        explanation: "Use 'doesn't' instead of 'don't' for third person singular subjects." 
    },
    { 
        wrong: "He go to school everyday.", 
        correct: "He goes to school every day.", 
        explanation: "Use 'goes' instead of 'go' for third person singular subjects. 'Every day' as two words means each day." 
    },
    { 
        wrong: "They was playing soccer.", 
        correct: "They were playing soccer.", 
        explanation: "Use 'were' instead of 'was' with the plural subject 'they'." 
    },
    { 
        wrong: "The childs are happy.", 
        correct: "The children are happy.", 
        explanation: "'Childs' is incorrect; the plural of 'child' is 'children'." 
    },
    { 
        wrong: "She have a new car.", 
        correct: "She has a new car.", 
        explanation: "Use 'has' instead of 'have' for third person singular subjects." 
    }
];

let currentQuestionIndex = 0;
let score = 0; // Initialize the score
let timer; // Variable to hold the timer
let musicPlaying = true; // Track if the music is playing



// Show the first question
// Function to show the question and focus on the answer input
// Function to show the question image and focus on the answer input
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input'); // Reference to the input field

    // Update the question text based on the current question index
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.wrong;

    // Update the question number
    updateQuestionNumber();

    // Display the game container
    document.getElementById('game-container').style.display = 'block';
    
    // Focus on the answer input field
    answerInput.focus();
    
    startTimer(); // Start the timer for the question
}

// Handle the user's answer
function handleAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const currentQuestion = questions[currentQuestionIndex];

    clearInterval(timer); // Stop the timer when the answer is submitted

    if (userAnswer === currentQuestion.correct) {
        score++; // Increase the score for a correct answer
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            document.getElementById('answer-input').value = ""; // Clear input
        } else {
            showVictoryScreen();
        }
    } else {
        showLossScreen(currentQuestion.correct, currentQuestion.explanation);
    }
}

// Listen for the submit button click or enter key press
document.getElementById('submit-button').addEventListener('click', handleAnswer);
document.getElementById('answer-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleAnswer();
    }
});

let resultScreenActive = false; // Flag to track if result screen is active

function showLossScreen(correctAnswer, explanation) {
    prevVal = timerDuration; // Preserve timer value for next round
    playedBefore = true; 

    document.getElementById('game-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'none'; 
    document.getElementById('game-timer').style.display = 'none';
    document.getElementById('answer-input').style.display = 'none';

    document.getElementById('result-container').style.display = 'block';

    document.getElementById('result-message').textContent = "Game Over!";
    document.getElementById('score').textContent = `Your score was ${score}.`;

    document.getElementById('question').textContent = `The question was: "${questions[currentQuestionIndex].wrong}"`;
    document.getElementById('user-answer').textContent = `Your answer was: "${document.getElementById('answer-input').value.trim()}"`;
    document.getElementById('correct-answer').textContent = `The correct answer was: "${correctAnswer}".`;
    document.getElementById('explanation').textContent = `Explanation: ${explanation}`;

    resultScreenActive = true; 
    setTimeout(() => resultScreenActive = false, 1000);
}


function showVictoryScreen() {
    prevVal = timerDuration;
    playedBefore = true;
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    // Set the content for the win screen
    document.getElementById('result-message').textContent = "Congratulations!";
    document.getElementById('score').textContent = `You answered all questions correctly.`;
    document.getElementById('question').textContent = "";
    document.getElementById('user-answer').textContent = "";
    document.getElementById('correct-answer').textContent = "";
    document.getElementById('explanation').textContent = "";
    
    resultScreenActive = true; // Set the flag to true
    setTimeout(() => resultScreenActive = false, 1000); // Reset the flag after 1 second
}

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && document.getElementById('result-container').style.display === 'block' && !resultScreenActive) {
        location.reload(); // Reload the page to start the game again
    }
});



function startTimer() {
    let timeLeft = timerDuration;  // Use the timerDuration directly
    const timerDisplay = document.getElementById('game-timer'); 

    timer = setInterval(function() {
        timerDisplay.textContent = `Countdown: ${timeLeft}s`; // Display the current time left
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            const currentQuestion = questions[currentQuestionIndex];
            showLossScreen(currentQuestion.correct, currentQuestion.explanation);
        } else {
            timeLeft--; // Decrement the timer after displaying it
        }
    }, 1000);
}




// Go back to home (reload the page)
document.getElementById('home-button').addEventListener('click', function() {
    localStorage.removeItem("timerDuration"); // Clear the timer value
    location.reload();
    playedBefore = true;
});


// Initialize the game
document.getElementById('continue-button').addEventListener('click', function() {
    document.getElementById('rules-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    showQuestion();
});