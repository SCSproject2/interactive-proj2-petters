async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-pass').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('success');
            const response = await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#pass-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);