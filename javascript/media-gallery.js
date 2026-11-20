document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.image-thumbnail-carousel').forEach(carousel => {
    const screen = carousel.querySelector('.screen');
    const slider = carousel.querySelector('.carousel__slider');
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    if (!screen || !slider || !slides.length) return;

    let index = 0;

    /* Keep the active thumbnail inside the visible slider area */
    function scrollSlideIntoView(slide) {
      const slideRect = slide.getBoundingClientRect();
      const sliderRect = slider.getBoundingClientRect();

      const styles = getComputedStyle(slider);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;

      let delta = 0;

      if (slideRect.left < sliderRect.left) {
        // slide is cut off on the left
        delta = slideRect.left - sliderRect.left - gap;
      } else if (slideRect.right > sliderRect.right) {
        // slide is cut off on the right
        delta = slideRect.right - sliderRect.right + gap;
      }

      if (delta !== 0) {
        slider.scrollBy({
          left: delta,
          behavior: reduceMotion.matches ? 'auto' : 'smooth'
        });
      }
    }

    function update(i, { scroll = true } = {}) {
      index = i;

      slides.forEach(s => s.classList.remove('active'));

      const slide = slides[i];
      slide.classList.add('active');

      const { type, src } = slide.dataset;

      screen.innerHTML = type === 'video'
        ? `<iframe src="${src}" allowfullscreen></iframe>`
        : `<img src="${src}" alt="">`;

      if (scroll) scrollSlideIntoView(slide);
    }

    slides.forEach((s, i) => {
      s.addEventListener('click', () => update(i));
    });

    prev.addEventListener('click', () => {
      update((index - 1 + slides.length) % slides.length);
    });

    next.addEventListener('click', () => {
      update((index + 1) % slides.length);
    });

    // Show the first slide on load (and mark it active)
    update(0, { scroll: false });

    // Re-align the active thumb if the viewport is resized
    window.addEventListener('resize', () => {
      scrollSlideIntoView(slides[index]);
    });
  });
});