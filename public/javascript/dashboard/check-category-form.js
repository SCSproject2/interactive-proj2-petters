const formEl = document.getElementById('addCategory-form');
const categoryEl = document.getElementById('category_name');
const uploadCategoryStatus = document.getElementById('category-upload-status');

formEl.addEventListener('submit', (e) => {
  if (!categoryEl.value) {
    uploadCategoryStatus.textContent = 'Please type a valid category';
    setTimeout(() => {
      uploadCategoryStatus.textContent = '';
    }, 1750);
    e.preventDefault();
    e.stopPropagation();
  } else {
    console.log('Posting...');
  }
});
