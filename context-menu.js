(function () {
  let currentUrl = '#';
  let closeTimer = null;

  window.openContext = function (data) {
    clearTimeout(closeTimer);
    document.getElementById('ctx-title').textContent = data.name;
    document.getElementById('ctx-link-label').textContent = data.linkLabel;
    document.getElementById('ctx-desc').textContent = data.desc;
    currentUrl = data.url;
    document.getElementById('context-menu').classList.add('is-open');
  };

  window.closeContext = function () {
    closeTimer = setTimeout(() => {
      document.getElementById('context-menu').classList.remove('is-open');
    }, 200);
  };

  window.visitContext = function () {
    if (currentUrl && currentUrl !== '#') {
      window.open(currentUrl, '_blank', 'noopener noreferrer');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ctx-close').addEventListener('click', () => {
      document.getElementById('context-menu').classList.remove('is-open');
    });

    document.getElementById('context-menu').addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
    });
    document.getElementById('context-menu').addEventListener('mouseleave', () => {
      closeContext();
    });
  });
})();
