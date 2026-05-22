const LAST_VISIT_KEY = 'shelter_last_visit';
const FIFTEEN_MIN = 15 * 60 * 1000;
const now = Date.now();
const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10);
const isReturning = (now - lastVisit) < FIFTEEN_MIN;
localStorage.setItem(LAST_VISIT_KEY, now);

const introVideo = document.getElementById("introVideo");
const loopGif = document.getElementById("loopGif");

function showLoop() {
  introVideo.style.display = "none";
  loopGif.style.display = "block";
  if (typeof onLoopStart === 'function') onLoopStart();
}

if (isReturning) {
  showLoop();
} else {
  introVideo.addEventListener("ended", showLoop);
}
