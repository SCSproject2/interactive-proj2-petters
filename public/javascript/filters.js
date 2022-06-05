const filterBtn = document.querySelectorAll('.filterBtn');
const image = document.getElementById('image-test');

filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtn.forEach((btn) => {
      if (btn.dataset.chosen == 'true') {
        btn.dataset.chosen = 'false';
      }
    });
    btn.dataset.chosen = 'true';
  });
});
