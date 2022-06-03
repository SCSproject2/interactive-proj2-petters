// When clicking on the header logo, redirect to the main page
const headerLogoEl = document.getElementById('header-logo');
headerLogoEl.addEventListener('click', () => {
  document.location.replace('/');
});

// Highlights the active nav item
const navItems = document.querySelectorAll('.navItem');

console.log(navItems);
navItems.forEach((item, index) => {
  console.log(item.href, index);
});

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
