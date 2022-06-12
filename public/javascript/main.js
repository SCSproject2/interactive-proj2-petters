// When clicking on the header logo, redirect to the main page
const headerLogoEl = document.getElementById('header-logo');
headerLogoEl.addEventListener('click', () => {
  document.location.replace('/');
});

// Highlights the active nav item
if (window.location.pathname == '/') {
  document.getElementById('home-nav-btn').classList.add('active');
}
if (window.location.pathname == '/dashboard') {
  document.getElementById('dash-nav-btn').classList.add('active');
}
if (window.location.pathname == '/login') {
  document.getElementById('login-nav-btn').classList.add('active');
}

if (window.location.pathname == '/featured') {
  document.getElementById('featured-nav-btn').classList.add('active');
}
if (window.location.pathname == '/search') {
  document.getElementById('search-nav-btn').classList.add('active');
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
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
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
