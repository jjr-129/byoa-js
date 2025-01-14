// Initialize variables
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isBreak = false;

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Timer function
function startTimer() {
    if (timerId !== null) {
        // Timer is running, so pause it
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        return;
    }

    startButton.textContent = 'Pause';
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();

            // Switch between focus and break periods
            if (!isBreak) {
                timeLeft = 5 * 60; // 5 minute break
                isBreak = true;
                statusText.textContent = "Time for a break!";
            } else {
                timeLeft = 25 * 60; // 25 minute focus period
                isBreak = false;
                statusText.textContent = "Time to focus!";
            }
            updateDisplay();
            startButton.textContent = 'Start';
        }
    }, 1000);
}

// Reset function
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    isBreak = false;
    updateDisplay();
    startButton.textContent = 'Start';
    statusText.textContent = "Time to focus!";
}

// Add event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateDisplay(); 