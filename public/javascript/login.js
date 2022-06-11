const signupStatusEl = document.getElementById('signup-status');

const statusUpdate = (text, time) => {
  var checkStat = false;
  if (signupStatusEl.style.color == 'green') {
    checkStat = true;
  }
  revealStatus.style.display = 'unset';
  signupStatusEl.style.color = 'red';
  signupStatusEl.textContent = text;

  setTimeout(() => {
    if (checkStat) {
      signupStatusEl.style.color = 'green';
    }
    signupStatusEl.textContent = 'All criteria met - Passwords must match';
  }, time);
};

async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('.pass1').value.trim();
  const password2 = document.querySelector('.pass2').value.trim();

  if (username.length > 15) {
    statusUpdate('Usernames are maximum 15 characters', 2000);
    return;
  }

  if (password !== password2) {
    statusUpdate('Passwords must match!', 2000);
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
      signupStatusEl.textContent = 'Sign up successful, reloading...';
      signupStatusEl.style.color = 'green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 750);
    } else {
      statusUpdate('Username or Email already exists!', 2000);
    }
  }
}

const loginForm = document.getElementById('login-form');
const loginStatusEl = document.getElementById('signin-status');

const loginStatusUpdate = (text) => {
  loginStatusEl.textContent = text;
  setTimeout(() => {
    loginStatusEl.textContent = '';
  }, 2000);
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
      loginStatusUpdate('Username or Password is incorrect');
    }
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

const viewPasswordSignup = document.querySelector('.reveal-signup');
viewPasswordSignup.addEventListener('click', () => {
  if (
    toggleSignupPass1.type == 'password' &&
    toggleSignupPass2.type == 'password'
  ) {
    viewPasswordSignup.style.opacity = '0.6';
    toggleSignupPass1.type = 'text';
    toggleSignupPass2.type = 'text';
  } else {
    viewPasswordSignup.style.opacity = '1';
    toggleSignupPass1.type = 'password';
    toggleSignupPass2.type = 'password';
  }
});

const viewPasswordSignin = document.querySelector('.reveal-signin');
viewPasswordSignin.addEventListener('click', () => {
  if (document.getElementById('pass-login').type == 'password') {
    viewPasswordSignin.style.opacity = '0.6';
    toggleLoginPass.type = 'text';
  } else {
    toggleLoginPass.type = 'password';
    viewPasswordSignin.style.opacity = '1';
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
    barEl.className = 'pass-fill strongest'; // This means we meet all the requirement so fill the bar
  } else if (
    (tempReqs[0] && tempReqs[1] && tempReqs[2]) ||
    (tempReqs[1] && tempReqs[2] && tempReqs[3]) ||
    (tempReqs[2] && tempReqs[3] && tempReqs[0]) ||
    (tempReqs[3] && tempReqs[0] && tempReqs[1])
  ) {
    barEl.className = 'pass-fill stronger';
  } else if (
    (tempReqs[0] && tempReqs[1]) ||
    (tempReqs[0] && tempReqs[2]) ||
    (tempReqs[0] && tempReqs[3]) ||
    (tempReqs[1] && tempReqs[2]) ||
    (tempReqs[1] && tempReqs[3]) ||
    (tempReqs[2] && tempReqs[3])
  ) {
    barEl.className = 'pass-fill medium';
  } else if (tempReqs[0] || tempReqs[1] || tempReqs[2] || tempReqs[3]) {
    barEl.className = 'pass-fill mild';
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

var runOnce = true;

const pass = document.querySelectorAll('.pass');
for (let i = 0; i < pass.length; i++) {
  pass[i].addEventListener('keyup', (e) => {
    if (runOnce) {
      revealStatus.style.display = 'unset';
    }
    runOnce = false;
    let pass1 = pass[0].value;
    let pass2 = pass[1].value;
    checkPass(pass1, pass2);
  });
}

// The entire event listener below handles the submit button (disable) property
const allSignupInputs = document.querySelectorAll('.signup-input');
// Pull all inputs wth values in an array
document.getElementById('signup-form').addEventListener('change', (input) => {
  const validInputs = Array.from(allSignupInputs).filter(
    (input) => input.value !== ''
  );
  // If both all inputs are filled (length of 4 means filled) and the password checker is colored green
  // (green meaning passwords match) and passBar containing 'strongest' class meaning all criteria is met...
  // then enable submission
  const passBar = document.querySelector('.pass-fill');
  const passMatch = document.getElementById('signup-status');
  if (
    validInputs.length == 4 &&
    passMatch.style.color == 'green' &&
    passBar.classList[1] == 'strongest'
  ) {
    document.getElementById('submit-btn').disabled = false;
  } else {
    document.getElementById('submit-btn').disabled = true;
  }
});

const allSigninInputs = document.querySelectorAll('.signin-input');
document.getElementById('login-form').addEventListener('change', (input) => {
  const validInputs = Array.from(allSigninInputs).filter(
    (input) => input.value !== ''
  );
  if (validInputs.length == 2) {
    document.getElementById('login-btn').disabled = false;
  } else {
    document.getElementById('login-btn').disabled = true;
  }
});
