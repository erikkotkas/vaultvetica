const fade = document.getElementById("page-fade");

if (typeof DEMO_INACTIVITY !== 'undefined' && DEMO_INACTIVITY) {
  history.scrollRestoration = 'manual';
}

function resetFade() {
  fade.style.transition = "none";
  fade.classList.remove("is-active");
  fade.offsetHeight;
  fade.style.transition = "";
}

window.addEventListener("pageshow", (event) => {
  const shouldFadeIn = sessionStorage.getItem("fade-transition") === "true";
  sessionStorage.removeItem("fade-transition");
  if (event.persisted) { resetFade(); return; }
  if (shouldFadeIn) {
    fade.style.transition = "none";
    fade.classList.add("is-active");
    fade.offsetHeight;
    fade.style.transition = "";
    requestAnimationFrame(() => { fade.classList.remove("is-active"); });
  } else {
    resetFade();
  }
});

function fadeToPage(url) {
  sessionStorage.setItem("scrollY", window.scrollY);
  sessionStorage.setItem("returning", "true");
  sessionStorage.setItem("fade-transition", "true");
  fade.style.transition = "";
  fade.classList.add("is-active");
  setTimeout(() => { window.location.href = url; }, 500);
}

function back()           { fadeToPage("bunker.html"); }
function changeRoom1()    { fadeToPage("room1.html"); }
function changeRoom2()    { fadeToPage("room2.html"); }
function changeRoom3()    { fadeToPage("library.html"); }
function changeRoom4()    { fadeToPage("living-room.html"); }
function changeRoom5()    { fadeToPage("arcade.html"); }
function changeRoom6()    { fadeToPage("gym.html"); }
function changeRoom7()    { fadeToPage("bedroom.html"); }
function changeRoom8()    { fadeToPage("credits.html"); }
function changeRoom9()    { fadeToPage("pub.html"); }
function changeRoom10()   { fadeToPage("hmp-kerning.html"); }
function changeRoomHome() { fadeToPage("bunker.html"); }

// Demo: mark rooms under construction
document.addEventListener('DOMContentLoaded', function () {
  if (typeof DEMO_MODE === 'undefined' || !DEMO_MODE) return;
  if (typeof DEMO_UNDER_CONSTRUCTION === 'undefined' || !DEMO_UNDER_CONSTRUCTION.length) return;

  var buttonMap = {
    1: document.querySelector('.room1Button'),
    2: document.querySelector('.bunkerRoom')
  };

  DEMO_UNDER_CONSTRUCTION.forEach(function (id) {
    var btn = buttonMap[id];
    if (!btn) return;
    btn.disabled = true;
    btn.innerHTML = 'UNDER CONSTRUCTION<br><span class="uc-subline">KEEP SCROLLING</span>';
    btn.classList.add('under-construction');
  });
});

const savedY = sessionStorage.getItem("scrollY");
if (savedY !== null) {
  sessionStorage.removeItem("scrollY");
  window.addEventListener("load", () => {
    window.scrollTo(0, parseInt(savedY, 10));
  });
}
