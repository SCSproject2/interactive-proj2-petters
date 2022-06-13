const logoutBtn = document.getElementById('logout');
const mobileLogoutBtn = document.getElementById('logout-mobile');

async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

logoutBtn.addEventListener('click', logout);
mobileLogoutBtn.addEventListener('click', logout);
