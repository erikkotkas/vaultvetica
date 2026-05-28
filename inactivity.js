(function () {
  if (typeof DEMO_MODE === 'undefined' || !DEMO_MODE) return;
  if (typeof DEMO_INACTIVITY === 'undefined' || !DEMO_INACTIVITY) return;

  var TIMEOUT = 45 * 1000;
  var timer;

  function onInactive() {
    sessionStorage.removeItem('scrollY');
    sessionStorage.removeItem('returning');
    if (typeof window.CURRENT_ROOM !== 'undefined') {
      if (typeof window.fadeToPage === 'function') {
        window.fadeToPage('index.html');
      } else {
        window.location.href = 'index.html';
      }
    } else {
      window.location.reload();
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
