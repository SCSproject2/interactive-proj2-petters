const signupStatusEl = document.getElementById('signup-status');

const statusUpdate = (text, time) => {
  revealStatus.style.display = 'unset';
  signupStatusEl.textContent = text;

  setTimeout(() => {
    signupStatusEl.textContent = 'All requirements met - Passwords must match';
  }, time);
};
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('.pass1').value.trim();
  const password2 = document.querySelector('.pass2').value.trim();

  if (username.length > 15) {
    statusUpdate('Usernames are maximum 15 characters', 2500);
    return;
  }

  if (
    username.length < 1 ||
    email.length < 1 ||
    password.length < 1 ||
    password2.length < 1
  ) {
    // If any signup input value is under 4 character length restrict submission
    statusUpdate('Please make sure all inputs are filled', 3000);
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
      statusUpdate('Username or Email already exists!', 3000);
    }
  }
}

const loginForm = document.getElementById('login-form');
const loginStatusEl = document.getElementById('signin-status');

const loginStatusUpdate = (text) => {
  loginStatusEl.textContent = text;
  setTimeout(() => {
    loginStatusEl.textContent = '';
  }, 2500);
};
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
      loginStatusUpdate('Email or Password is incorrect');
    }
  } else {
    loginStatusUpdate('Please fill in all inputs');
  }
}
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);

// ----------------------------------------------------- Password handler
const revealStatus = document.querySelector('.pass-status');
const toggleLoginPass = document.getElementById('pass-login');
const toggleSignupPass1 = document.querySelector('.pass1');
const toggleSignupPass2 = document.querySelector('.pass2');

document.querySelector('.reveal-signup').addEventListener('click', () => {
  if (
    toggleSignupPass1.type == 'password' &&
    toggleSignupPass2.type == 'password'
  ) {
    toggleSignupPass1.type = 'text';
    toggleSignupPass2.type = 'text';
  } else {
    toggleSignupPass1.type = 'password';
    toggleSignupPass2.type = 'password';
  }
});

document.querySelector('.reveal-signin').addEventListener('click', () => {
  if (document.getElementById('pass-login').type == 'password') {
    toggleLoginPass.type = 'text';
  } else {
    toggleLoginPass.type = 'password';
  }
});

const checkPass = (pass1, pass2) => {
  let tempReqs = [false, false, false, false];
  tempReqs[0] = pass1.length > 7;
  tempReqs[1] = /[0-9]/.test(pass1);
  tempReqs[2] = /[!@#$<>,%.=?|~*_)+-]/.test(pass1);
  tempReqs[3] = /[A-Z]/.test(pass1);

  const lenStatusEl = document.querySelector('.len-status');
  const numStatusEl = document.querySelector('.num-status');
  const symStatusEl = document.querySelector('.sym-status');
  const capStatusEl = document.querySelector('.cap-status');
  if (tempReqs[0]) {
    lenStatusEl.classList.remove('default');
    lenStatusEl.classList.add('active');
  } else {
    lenStatusEl.classList.add('default');
    lenStatusEl.classList.remove('active');
  }
  if (tempReqs[1]) {
    numStatusEl.classList.remove('default');
    numStatusEl.classList.add('active');
  } else {
    numStatusEl.classList.add('default');
    numStatusEl.classList.remove('active');
  }
  if (tempReqs[2]) {
    symStatusEl.classList.remove('default');
    symStatusEl.classList.add('active');
  } else {
    symStatusEl.classList.add('default');
    symStatusEl.classList.remove('active');
  }
  if (tempReqs[3]) {
    capStatusEl.classList.remove('default');
    capStatusEl.classList.add('active');
  } else {
    capStatusEl.classList.add('default');
    capStatusEl.classList.remove('active');
  }
  const barEl = document.querySelector('.pass-fill');
  if (tempReqs[0] && tempReqs[1] && tempReqs[2] && tempReqs[3]) {
    // Check process of password and assign class accordingly
    barEl.classList.add('strongest'); // This means we meet all the requirement so fill the bar
  } else if (
    (tempReqs[0] && tempReqs[1] && tempReqs[2]) ||
    (tempReqs[1] && tempReqs[2] && tempReqs[3]) ||
    (tempReqs[2] && tempReqs[3] && tempReqs[0]) ||
    (tempReqs[3] && tempReqs[0] && tempReqs[1])
  ) {
    barEl.classList.add('stronger');
  } else if (
    (tempReqs[0] && tempReqs[1]) ||
    (tempReqs[0] && tempReqs[2]) ||
    (tempReqs[0] && tempReqs[3]) ||
    (tempReqs[1] && tempReqs[2]) ||
    (tempReqs[1] && tempReqs[3]) ||
    (tempReqs[2] && tempReqs[3])
  ) {
    barEl.classList.add('medium');
  } else if (tempReqs[0] || tempReqs[1] || tempReqs[2] || tempReqs[3]) {
    barEl.classList.add('mild');
  } else {
    barEl.className = 'pass-fill';
  }

  // If all requirements were met and the passwords both match, return true
  const allMet = pass1 === pass2 && tempReqs.includes(true);
  if (allMet) {
    document.getElementById('signup-status').style.color = 'green';
  } else {
    document.getElementById('signup-status').style.color = 'red';
  }
};

const pass1 = document.querySelector('.pass1');
const pass2 = document.querySelector('.pass2');

pass1.addEventListener('keyup', (password1) => {
  checkPass(password1.target.value, '');
  revealStatus.style.display = 'unset';

  pass2.addEventListener('keyup', (password2) => {
    checkPass(password1.target.value, password2.target.value);
  });
});
pass2.addEventListener('keyup', (password2) => {
  revealStatus.style.display = 'unset';
});
