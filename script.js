let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0; // Store the time elapsed before pause
let running = false;
let lapCounter = 0;

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const lapButton = document.getElementById('lapButton');
const timerDisplay = document.getElementById('timer');
const lapList = document.createElement('ul');

document.body.appendChild(lapList);

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - savedTime; // Subtract savedTime if resuming
        tInterval = setInterval(getShowTime, 10); // Update time every 10 milliseconds
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference; // Save the time elapsed when paused
        running = false;
       
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}


function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.classList.add('lap-item'); // Added class for styling
        lapTime.innerText = `Lap ${lapCounter}: ${timerDisplay.innerText}`;
        lapList.appendChild(lapTime);
    }
}


function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerText = `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;
}
