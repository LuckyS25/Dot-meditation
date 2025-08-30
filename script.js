let meditationScreen = document.getElementById("meditationScreen");
let dot = document.getElementById("dot");
let dotPreview = document.getElementById("dotPreview");
let dotSizeInput = document.getElementById("dotSize");
let timerDisplay = document.getElementById("timerBig");

let hoursInput = document.getElementById("hours");
let minutesInput = document.getElementById("minutes");
let secondsInput = document.getElementById("seconds");

let countdown;
let totalSeconds = 0;

/* Update dot size preview */
dotSizeInput.addEventListener("input", () => {
  let size = dotSizeInput.value + "px";
  dotPreview.style.width = size;
  dotPreview.style.height = size;
});

/* Start Meditation */
function startMeditation() {
  // Get time
  let h = parseInt(hoursInput.value) || 0;
  let m = parseInt(minutesInput.value) || 0;
  let s = parseInt(secondsInput.value) || 0;
  totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) {
    alert("Please set a valid time.");
    return;
  }

  // Set dot size
  let size = dotSizeInput.value + "px";
  dot.style.width = size;
  dot.style.height = size;

  // Show meditation screen
  meditationScreen.style.display = "flex";

  // Request fullscreen
  if (meditationScreen.requestFullscreen) {
    meditationScreen.requestFullscreen();
  }

  // Start countdown
  updateTimerDisplay();
  countdown = setInterval(() => {
    totalSeconds--;
    updateTimerDisplay();

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      exitMeditation();
      alert("Meditation complete! 🌿");
    }
  }, 1000);
}

/* Update Timer Display */
function updateTimerDisplay() {
  let h = Math.floor(totalSeconds / 3600);
  let m = Math.floor((totalSeconds % 3600) / 60);
  let s = totalSeconds % 60;

  let timeStr = 
    (h > 0 ? String(h).padStart(2, '0') + ":" : "") +
    String(m).padStart(2, '0') + ":" +
    String(s).padStart(2, '0');

  timerDisplay.textContent = timeStr;
}

/* Exit Meditation */
function exitMeditation() {
  meditationScreen.style.display = "none";
  clearInterval(countdown);

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
