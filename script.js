let timerDuration = 15;
let prevVal = 15; 

let playedBefore = false;

let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore'), 10) : 0;



document.addEventListener('DOMContentLoaded', function() {
    function checkScreenWidth() {
        if (window.innerWidth < 500) {
            document.getElementById('overlay').style.display = 'flex';
        } else {
            document.getElementById('overlay').style.display = 'none';
        }
    }

    // Check screen width on page load
    checkScreenWidth();

    // Check screen width on resize
    window.addEventListener('resize', checkScreenWidth);

    // Add event listener for proceed button
    document.getElementById('proceed-button').addEventListener('click', function() {
        document.getElementById('overlay').style.display = 'none';
        // Optionally, display the hidden elements
        document.querySelectorAll('.banner, .card, .button-container, #timer-modal, #rules-container, #game-container, #result-container').forEach(function(element) {
            element.style.display = 'block';
        });
    });
});


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

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && document.getElementById('start-button').style.display !== 'hidden') {
        document.getElementById('start-button').click();
    }
});


    

    // Other game functions (like showQuestion, handleAnswer) should remain the same but utilize the updated timer logic

// Get the start button and settings button elements
const startButton = document.getElementById('start-button');
const settingsButton = document.getElementById('settings-button');




// Get the audio element

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
}

// Function to start the game and play the music
function startGame() {
    // Play the music
    shuffleArray(questions); // Shuffle questions when the game starts
    document.getElementById('rules-container').style.display = 'block'; // Show the rules

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

const questions = [
    {
        wrong: "Him plays soccer every weekend.",
        correct: ["He plays soccer every weekend.", "He plays football every weekend."],
        explanation: "Use the subject pronoun 'He' instead of 'Him'."
    },
    {
        wrong: "She goed to the store.",
        correct: ["She went to the store.", "She has gone to the store."],
        explanation: "'Goed' is incorrect; the past tense of 'go' is 'went'."
    },
    {
        wrong: "There is many people here.",
        correct: ["There are many people here.", "There are a lot of people here."],
        explanation: "Use 'are' instead of 'is' with plural nouns like 'people'."
    },
    {
        wrong: "He don't need no help.",
        correct: ["He doesn't need any help.", "He doesn’t need help.", "He needs no help."],
        explanation: "Use 'doesn't' instead of 'don't' for third person singular, and avoid double negatives."
    },
    {
        wrong: "She has less books than I do.",
        correct: ["She has fewer books than I do.", "She has fewer books than me."],
        explanation: "Use 'fewer' with countable nouns like 'books'."
    },
    {
        wrong: "Their going to visit us.",
        correct: ["They're going to visit us.", "They are going to visit us."],
        explanation: "Use 'They're' (they are) instead of 'Their'."
    },
    {
        wrong: "The car need washed.",
        correct: ["The car needs washing.", "The car needs to be washed."],
        explanation: "Use 'needs washing' instead of 'need washed'."
    },
    {
        wrong: "Me and her went to the mall.",
        correct: ["She and I went to the mall.", "I and she went to the mall."],
        explanation: "Use the subject pronouns 'She' and 'I' when they are the subject of the sentence."
    },
    {
        wrong: "It's a long ways to go.",
        correct: ["It's a long way to go.", "It’s a long way to go."],
        explanation: "'Ways' is incorrect; use 'way' in this context."
    },
    {
        wrong: "He gave it to I.",
        correct: ["He gave it to me.", "He handed it to me."],
        explanation: "Use the object pronoun 'me' instead of 'I' after a preposition."
    },
    {
        wrong: "The team are winning.",
        correct: ["The team is winning.", "The team’s winning."],
        explanation: "Use 'is' instead of 'are' with collective nouns like 'team'."
    },
    {
        wrong: "She didn't told me.",
        correct: ["She didn't tell me.", "She did not tell me."],
        explanation: "Use the base form of the verb 'tell' after 'didn't'."
    },
    {
        wrong: "The bag of apples are on the table.",
        correct: ["The bag of apples is on the table.", "The apples are in the bag on the table."],
        explanation: "Use 'is' instead of 'are' as the subject 'bag' is singular."
    },
    {
        wrong: "We was at the movies.",
        correct: ["We were at the movies.", "We were at the cinema."],
        explanation: "Use 'were' instead of 'was' with the plural subject 'we'."
    },
    {
        wrong: "Him and her are dancing.",
        correct: ["He and she are dancing.", "She and he are dancing."],
        explanation: "Use the subject pronouns 'He' and 'She' when they are the subject of the sentence."
    },
    {
        wrong: "She sings good.",
        correct: ["She sings well.", "She sings beautifully."],
        explanation: "Use 'well' instead of 'good' as an adverb to describe how she sings."
    },
    {
        wrong: "He gots a new car.",
        correct: ["He got a new car.", "He bought a new car."],
        explanation: "'Gots' is incorrect; the past tense of 'get' is 'got'."
    },
    {
        wrong: "She drawed a picture.",
        correct: ["She drew a picture.", "She has drawn a picture."],
        explanation: "'Drawed' is incorrect; the past tense of 'draw' is 'drew'."
    },
    {
        wrong: "There is a lot of peoples here.",
        correct: ["There are a lot of people here.", "There are many people here."],
        explanation: "Use 'people' instead of 'peoples', and 'are' instead of 'is' with plural nouns."
    },
    {
        wrong: "They has finished the project.",
        correct: ["They have finished the project.", "They’ve completed the project."],
        explanation: "Use 'have' instead of 'has' with plural subjects like 'they'."
    },
    {
        wrong: "I seen him at the store.",
        correct: ["I saw him at the store.", "I have seen him at the store."],
        explanation: "Use 'saw' instead of 'seen' as the past tense of 'see'."
    },
    {
        wrong: "She was more prettier than her sister.",
        correct: ["She was prettier than her sister.", "She was more attractive than her sister."],
        explanation: "Avoid using 'more' with comparative adjectives like 'prettier'."
    },
    {
        wrong: "He don't know nothing.",
        correct: ["He doesn't know anything.", "He knows nothing."],
        explanation: "Use 'doesn't' instead of 'don't' for third person singular, and avoid double negatives."
    },
    {
        wrong: "I didn't saw the movie.",
        correct: ["I didn't see the movie.", "I did not see the movie."],
        explanation: "Use the base form 'see' after 'didn't'."
    },
    {
        wrong: "Her is going to the party.",
        correct: ["She is going to the party.", "She’s going to the party."],
        explanation: "Use the subject pronoun 'She' instead of 'Her'."
    },
    {
        wrong: "We didn't did it.",
        correct: ["We didn't do it.", "We did not do it."],
        explanation: "Use the base form 'do' after 'didn't'."
    },
    {
        wrong: "They was talking loudly.",
        correct: ["They were talking loudly.", "They talked loudly."],
        explanation: "Use 'were' instead of 'was' with the plural subject 'they'."
    },
    {
        wrong: "Him don't likes pizza.",
        correct: ["He doesn't like pizza.", "He dislikes pizza."],
        explanation: "Use 'He' instead of 'Him' as the subject and 'doesn't like' instead of 'don't likes'."
    },
    {
        wrong: "He is more stronger than me.",
        correct: ["He is stronger than me.", "He is much stronger than me."],
        explanation: "Avoid using 'more' with comparative adjectives like 'stronger'."
    },
    {
        wrong: "The datas are incorrect.",
        correct: ["The data is incorrect.", "The information is incorrect."],
        explanation: "Use 'is' with 'data' as it is usually treated as an uncountable noun."
    },
    {
        wrong: "She didn't knew the answer.",
        correct: ["She didn't know the answer.", "She did not know the answer."],
        explanation: "Use the base form 'know' after 'didn't'."
    },
    {
        wrong: "Me and him went to the concert.",
        correct: ["He and I went to the concert.", "I and he went to the concert."],
        explanation: "Use the subject pronouns 'He' and 'I' when they are the subject of the sentence."
    },
    {
        wrong: "There is less cars on the road.",
        correct: ["There are fewer cars on the road.", "Fewer cars are on the road."],
        explanation: "Use 'fewer' with countable nouns like 'cars'."
    },
    {
        wrong: "The childrens are playing outside.",
        correct: ["The children are playing outside.", "The kids are playing outside."],
        explanation: "'Childrens' is incorrect; the plural of 'child' is 'children'."
    },
    {
        wrong: "She taked the test yesterday.",
        correct: ["She took the test yesterday.", "She has taken the test yesterday."],
        explanation: "'Taked' is incorrect; the past tense of 'take' is 'took'."
    }
    // Add more questions as needed...
];


let currentQuestionIndex = 0;
let score = 0; // Initialize the score
let timer; // Variable to hold the timer
let musicPlaying = true; // Track if the music is playing



// Show the first question
// Function to show the question and focus on the answer input
// Function to show the question image and focus on the answer input
function showQuestion() {
    clearInterval(timer); // Stop any previous timers
    
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

    if (currentQuestion.correct.includes(userAnswer)) {

        score++; // Increase the score for a correct answer
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            clearInterval(timer);
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

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);  // Save the new best score to localStorage
    }
    
    document.getElementById('best-score').textContent = `Your best score is ${bestScore}.`;
    

    document.getElementById('best-score').textContent = `Your best score is ${bestScore}.`
    document.getElementById('question').textContent = `The question was: "${questions[currentQuestionIndex].wrong}"`;
    document.getElementById('user-answer').textContent = `Your answer was: "${document.getElementById('answer-input').value.trim()}"`;
    document.getElementById('correct-answer').textContent = `The correct answer was: "${correctAnswer}".`;
    document.getElementById('explanation').textContent = `Explanation: ${explanation}`;

    resultScreenActive = true; 
    setTimeout(() => resultScreenActive = false, 50);
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
    showQuestion(); // Show the first question after shuffling
});
