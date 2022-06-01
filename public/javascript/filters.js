const filterSliders = document.querySelectorAll('.filterBtn');
const image = document.getElementById('image-test');

filterSliders.forEach((filter) => {
  filter.addEventListener('click', () => {
    if (filter.getAttribute('data-filter') == 'orange-tint') {
      image.style.filter = `hue-rotate(320deg)`; // Red tint
    }
    if (filter.getAttribute('data-filter') == 'blue-tint') {
      image.style.filter = `hue-rotate(120deg)`; // blue tint
    }
    if (filter.getAttribute('data-filter') == 'red-tint') {
      image.style.filter = `hue-rotate(260deg)`; // Red tint
    }
    if (filter.getAttribute('data-filter') == 'purple-tint') {
      image.style.filter = `hue-rotate(190deg)`; // purple tint
    }

    if (filter.getAttribute('data-filter') == 'sepia') {
      image.style.filter = `sepia(60%)`;
    }

    if (filter.getAttribute('data-filter') == 'invert') {
      image.style.filter = `invert(100%)`;
    }

    if (filter.getAttribute('data-filter') == 'grayscale') {
      image.style.filter = `grayscale(1)`;
    }
  });
});
