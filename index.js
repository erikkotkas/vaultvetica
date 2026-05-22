const fade = document.getElementById("page-fade");

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
function changeRoom3()    { fadeToPage("room3.html"); }
function changeRoom4()    { fadeToPage("room4.html"); }
function changeRoom5()    { fadeToPage("room5.html"); }
function changeRoom6()    { fadeToPage("room6.html"); }
function changeRoom7()    { fadeToPage("room7.html"); }
function changeRoom8()    { fadeToPage("room8.html"); }
function changeRoom9()    { fadeToPage("room9.html"); }
function changeRoom10()   { fadeToPage("room10.html"); }
function changeRoomHome() { fadeToPage("bunker.html"); }

const savedY = sessionStorage.getItem("scrollY");
if (savedY !== null) {
  sessionStorage.removeItem("scrollY");
  window.addEventListener("load", () => {
    window.scrollTo(0, parseInt(savedY, 10));
  });
}
