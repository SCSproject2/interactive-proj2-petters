const confirmBtn = document.getElementById('addPost-form');
const titleInput = document.getElementById('add-title');
const bodyInput = document.getElementById('add-desc');
const imageInput = document.getElementById('add-post-image');
const filtersInput = document.getElementById('filter-options');
const categoryInput = document.getElementById('category-options');

const uploadStatus = document.getElementById('upload-status');
confirmBtn.addEventListener('submit', (e) => {
  if (
    !titleInput.value ||
    !bodyInput.value ||
    !imageInput.value ||
    !filtersInput.value ||
    !categoryInput.value
  ) {
    uploadStatus.textContent = 'Please fill in all inputs';
    setTimeout(() => {
      uploadStatus.textContent = '';
    }, 1750);
    e.preventDefault();
    e.stopPropagation();
  } else if (titleInput.value.length > 18) {
    uploadStatus.textContent = 'Post title must be under 18 characters';
    setTimeout(() => {
      uploadStatus.textContent = '';
    }, 1750);
    e.preventDefault();
    e.stopPropagation();
  } else if (bodyInput.value.length > 60) {
    uploadStatus.textContent = 'Post body must be under 60 characters';
    setTimeout(() => {
      uploadStatus.textContent = '';
    }, 1750);
    e.preventDefault();
    e.stopPropagation();
  } else {
    console.log('Posting...');
  }
});
