// When clicking on the header logo, redirect to the main page
const headerLogoEl = document.getElementById('header-logo');
headerLogoEl.addEventListener('click', () => {
  document.location.replace('/');
});

// Highlights the active nav item
const navItems = document.querySelectorAll('.navItem');

if (window.location.pathname == '/') {
  navItems[0].classList.add('active');
}
if (window.location.pathname == '/dashboard') {
  navItems[1].classList.add('active');
}
if (window.location.pathname == '/login') {
  navItems[2].classList.add('active');
}

if (window.location.pathname == '/logout') {
  navItems[2].classList.add('active');
}

if (window.location.pathname == '/featured') {
  navItems[3].classList.add('active');
}
if (window.location.pathname == '/search') {
  navItems[4].classList.add('active');
}

// On initial app load, scroll to top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

scrollBtn = document.querySelector('.scrollTop');
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
}
function topFunction() {
  document.body.scrollTo({ top: 0, behavior: 'smooth' });
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
}
scrollBtn.addEventListener('click', () => {
  topFunction();
});
