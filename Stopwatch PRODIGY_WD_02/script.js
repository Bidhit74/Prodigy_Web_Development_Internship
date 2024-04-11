let [milliSeconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const laps = document.querySelector(".laps");
let int = null;
startBtn.addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(int);
});

resetBtn.addEventListener("click", () => {
    clearInterval(int);
    [milliSeconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerDisplay.innerHTML = "00 : 00 : 00 : 000";
    // let child = document.querySelector("p");
    // laps.removeChild(child);
    laps.innerHTML = "";
});

lapBtn.addEventListener("click", (e) => {
    let lap = document.createElement("p");
    lap.innerText =
        hours + " : " + minutes + " : " + seconds + " : " + milliSeconds;
    laps.appendChild(lap);
    console.log(e.pointerId);
});

function displayTimer() {
    milliSeconds += 10;
    if (milliSeconds == 1000) {
        milliSeconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
        milliSeconds < 10
            ? "00" + milliSeconds
            : milliSeconds < 100
            ? "0" + milliSeconds
            : milliSeconds;

    timerDisplay.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
