const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');

let countdown;

function startTimer() {
    clearInterval(countdown);
    const seconds = parseInt(timeInput.value);
    
    if (isNaN(seconds) || seconds <= 0) {
        alert('Please enter a valid number of seconds.');
        return;
    }

    let timeLeft = seconds;
    updateTimerDisplay(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up!");
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}

startButton.addEventListener('click', startTimer);