const searchPrompt = document.querySelector('.search');
const menuBtn = document.getElementById('hide-menu');

menuBtn.addEventListener('click', () => {
  searchPrompt.classList.toggle('inactive');
  if (searchPrompt.classList[1] == 'inactive') {
    menuBtn.textContent = 'Show Menu';
  } else {
    menuBtn.textContent = 'Hide Menu';
  }
});
