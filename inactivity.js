(function () {
  if (typeof DEMO_MODE === 'undefined' || !DEMO_MODE) return;
  if (typeof DEMO_INACTIVITY === 'undefined' || !DEMO_INACTIVITY) return;

  var TIMEOUT = 45 * 1000;
  var timer;

  function onInactive() {
    if (typeof window.CURRENT_ROOM !== 'undefined') {
      // Inside a room — fade back to home
      if (typeof window.fadeToPage === 'function') {
        window.fadeToPage('index.html');
      } else {
        window.location.href = 'index.html';
      }
    } else {
      // On home page — scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      reset();
    }
  }

  function reset() {
    clearTimeout(timer);
    timer = setTimeout(onInactive, TIMEOUT);
  }

  ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'].forEach(function (e) {
    document.addEventListener(e, reset, { passive: true });
  });

  reset();
})();
