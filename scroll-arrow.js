function onLoopStart() {
  const scrollArrow = document.getElementById('scrollArrow');
  const arrowEl = scrollArrow.querySelector('.arrow-example');
  scrollArrow.style.display = 'block';
  setInterval(() => { arrowEl.classList.toggle('-hidden'); }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('scrollArrow').addEventListener('click', () => {
    window.scrollBy({ top: 500, behavior: 'smooth' });
  });
});
