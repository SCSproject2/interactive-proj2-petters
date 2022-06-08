const imageEl = document.getElementById('image-test');
const chosenFilter = document.getElementById('filter-options');

const filterWrapper = document.getElementById('preview-filter');
chosenFilter.addEventListener('change', () => {
  filterWrapper.style.display = 'unset';
  imageEl.classList = '';
  imageEl.classList.add(chosenFilter.value);
});
