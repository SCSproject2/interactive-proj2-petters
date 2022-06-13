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

document.getElementById('mobile-nav-items').style.display = 'none';
const burgerStack = document.getElementById('burger-stack');
burgerStack.addEventListener('click', () => {
  if (document.querySelector('header').className == 'active') {
    document.querySelector('header').classList.toggle('active');
    setTimeout(() => {
      document.querySelector('main').classList.toggle('active');
    }, 100);
  } else {
    document.querySelector('main').classList.toggle('active');
    setTimeout(() => {
      document.querySelector('header').classList.toggle('active');
    }, 100);
  }

  if (document.getElementById('mobile-nav-items').style.display == 'flex') {
    document.getElementById('mobile-nav-items').style.display = 'none';
  } else {
    document.getElementById('mobile-nav-items').style.display = 'flex';
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 568) {
    document.querySelector('main').classList.remove('active');
    document.querySelector('header').classList.remove('active');
  }
});
