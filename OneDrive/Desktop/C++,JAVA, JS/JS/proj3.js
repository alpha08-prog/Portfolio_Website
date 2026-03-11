const startStop = document.querySelector("#startStop");
const reset = document.querySelector("#resetBtn");
const timerDisplay = document.querySelector(".timer"); // Corrected reference

let seconds = 0;
let minutes = 0;
let hrs = 0;

let timerInterval = null;
let timerStatus = "stopped";

function stopWatch() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hrs++;
        }
    }

    // Formatting time values
    let leadingSeconds = seconds < 10 ? "0" + seconds : seconds;
    let leadingMinutes = minutes < 10 ? "0" + minutes : minutes;
    let leadingHours = hrs < 10 ? "0" + hrs : hrs;

    // Update the timer display
    timerDisplay.innerText = `${leadingHours}:${leadingMinutes}:${leadingSeconds}`;
}

// Start/Stop Button Event Listener
startStop.addEventListener("click", function () {
    if (timerStatus === "stopped") {
        timerInterval = setInterval(stopWatch, 1000);
        startStop.innerHTML = `<i class="fa-solid fa-pause"></i>`; // Pause icon
        timerStatus = "started";
    } else {
        clearInterval(timerInterval);
        startStop.innerHTML = `<i class="fa-solid fa-play"></i>`; // Play icon
        timerStatus = "stopped";
    }
});

// Reset Button Event Listener
reset.addEventListener("click", function () {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hrs = 0;

    timerDisplay.innerText = "00:00:00"; // Reset the display
    startStop.innerHTML = `<i class="fa-solid fa-play"></i>`; // Reset to play icon
    timerStatus = "stopped";
});
