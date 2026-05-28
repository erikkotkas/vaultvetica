const LAST_VISIT_KEY = 'shelter_last_visit';
const REGULAR_COOLDOWN = 15 * 60 * 1000;
const DEMO_COOLDOWN    =  0;

const COOLDOWN = DEMO_MODE ? DEMO_COOLDOWN : REGULAR_COOLDOWN;

const now = Date.now();
const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10);
const isReturning = (now - lastVisit) < COOLDOWN;
localStorage.setItem(LAST_VISIT_KEY, now);

console.log('[video] COOLDOWN:', COOLDOWN, '| isReturning:', isReturning);

const introVideo = document.getElementById("introVideo");
const loopGif    = document.getElementById("loopGif");

console.log('[video] introVideo:', introVideo);
console.log('[video] loopGif:', loopGif);

let skipBtn = null;

function showLoop() {
  if (skipBtn) {
    skipBtn.remove();
    skipBtn = null;
  }
  introVideo.style.display = "none";
  loopGif.style.display = "block";
  loopGif.play().catch(function () {});
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
  console.log('[video] returning visitor — skipping to loop');
  showLoop();
} else {
  console.log('[video] new visit — playing intro, waiting for ended event');
  if (DEMO_MODE && DEMO_SKIP_BUTTON) {
    injectSkipButton();
  }
  introVideo.addEventListener("ended", function () {
    console.log('[video] ended event fired');
    showLoop();
  });
  introVideo.addEventListener("error", function (e) {
    console.error('[video] introVideo error:', e);
  });
  introVideo.addEventListener("stalled", function () {
    console.warn('[video] introVideo stalled');
  });
  introVideo.addEventListener("suspend", function () {
    console.warn('[video] introVideo suspended');
  });
}
