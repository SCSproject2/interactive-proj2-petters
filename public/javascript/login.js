const signupStatusEl = document.getElementById('signup-status');

const statusUpdate = (text, time) => {
  signupStatusEl.textContent = text;

  signupStatusEl.style.color = 'red';

  setTimeout(() => {
    signupStatusEl.textContent =
      'Fill in all required inputs with character count above 4';
    signupStatusEl.style.color = 'black';
  }, time);
};
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-pass').value.trim();

  if (username.length > 15) {
    statusUpdate('Usernames are maximum 15 characters', 2500);
    return;
  }

  if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
    // If any signup input value is under 4 character length restrict submission
    statusUpdate(
      'Please make all inputs are filled with character count above 4',
      3000
    );
    return;
  } else {
    // Execute the fetch using above values and insert them into the body (to be extracted in the route i.e. req.body.post_title)
    const response = await fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      signupStatusEl.textContent = 'Sign up successful, refreshing...';
      signupStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 1250);
    } else {
      alert(response.statusText);
    }
  }
}

const loginForm = document.getElementById('login-form');
const loginStatusEl = document.getElementById('signin-status');

async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#pass-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      loginStatusEl.textContent = 'Email or Password is incorrect';
      loginStatusEl.style.color = 'red';
      setTimeout(() => {
        loginStatusEl.textContent = 'Fill in required inputs';
        loginStatusEl.style.color = 'black';
      }, 2500);
    }
  } else {
    loginStatusEl.textContent = 'Please fill in all inputs';
    loginStatusEl.style.color = 'red';
    setTimeout(() => {
      loginStatusEl.textContent = 'Fill in required inputs';
      loginStatusEl.style.color = 'black';
    }, 2500);
  }
}
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
