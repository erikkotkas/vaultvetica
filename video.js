const LAST_VISIT_KEY = 'shelter_last_visit';
const REGULAR_COOLDOWN = 15 * 60 * 1000;
const DEMO_COOLDOWN    =  0;

const COOLDOWN = DEMO_MODE ? DEMO_COOLDOWN : REGULAR_COOLDOWN;

const now = Date.now();
const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10);
const isReturning = (now - lastVisit) < COOLDOWN;
localStorage.setItem(LAST_VISIT_KEY, now);

const introVideo = document.getElementById("introVideo");
const loopGif    = document.getElementById("loopGif");

let skipBtn = null;

function showLoop() {
  if (skipBtn) {
    skipBtn.remove();
    skipBtn = null;
  }
  introVideo.style.display = "none";
  loopGif.style.display = "block";
  document.querySelector('.easter-egg').style.display = 'block';
  if (typeof onLoopStart === 'function') onLoopStart();
}

function injectSkipButton() {
  skipBtn = document.createElement("button");
  skipBtn.className = "skip-btn";
  skipBtn.innerHTML = "&#9654;&#9654;";
  skipBtn.setAttribute("aria-label", "Skip intro");
  skipBtn.addEventListener("click", showLoop);
  document.querySelector(".video-container").appendChild(skipBtn);
}

if (isReturning) {
  showLoop();
} else {
  if (DEMO_MODE && DEMO_SKIP_BUTTON) {
    injectSkipButton();
  }
  introVideo.addEventListener("ended", showLoop);
}
