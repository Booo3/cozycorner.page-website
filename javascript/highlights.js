document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.highlights-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.highlights-button.prev');
  const nextButton = document.querySelector('.highlights-button.next');
  let currentIndex = 0;

  function updatehighlights() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updatehighlights();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updatehighlights();
  });
});
