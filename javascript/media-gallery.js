document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.image-thumbnail-carousel').forEach(carousel => {
    const screen = carousel.querySelector('.screen');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let index = 0;

    function update(i) {
      slides.forEach(s => s.classList.remove('active'));
      const slide = slides[i];
      slide.classList.add('active');

      const type = slide.dataset.type;
      const src = slide.dataset.src;

      screen.innerHTML = type === 'video'
        ? `<iframe src="${src}" allowfullscreen></iframe>`
        : `<img src="${src}" alt="">`;
    }

    slides.forEach((s, i) => {
      s.addEventListener('click', () => {
        index = i;
        update(index);
      });
    });

    prev.onclick = () => {
      index = (index - 1 + slides.length) % slides.length;
      update(index);
    };

    next.onclick = () => {
      index = (index + 1) % slides.length;
      update(index);
    };
  });
});