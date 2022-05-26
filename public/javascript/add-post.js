// ----- ----- ----- ----- Below code is executed in the dashboard template

const addPostForm = document.getElementById('addPost-form');

async function newPostHandler(event) {
  event.preventDefault();

  // Extract the values from the form
  const post_title = document.getElementById('add-post-title').value;
  const post_desc = document.getElementById('add-post-desc').value;
  const addPostStatusEl = document.getElementById('addpost-status');
  if (post_title.length <= 4 || post_desc.length <= 4) {
    // If any add post input value is under 4 character length, notify the user and restrict submission
    addPostStatusEl.textContent =
      'Please make all inputs are filled with character count above 4';
    addPostStatusEl.style.color = 'red';
    setTimeout(() => {
      addPostStatusEl.textContent =
        'Fill in all required inputs with character count above 4';
      addPostStatusEl.style.color = 'black';
    }, 4000);
  } else {
    // Execute the fetch using above values and insert them into the body (to be extracted in the route i.e. req.body.post_title)
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        post_desc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is ok, simply refresh the page
    if (response.ok) {
      addPostStatusEl.textContent = 'Successfully posted, refreshing...';
      addPostStatusEl.style.color = 'Green';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 750);
    } else {
      // Otherwise alert the user accordingly
      alert(response.statusText);
    }
  }
}

// Add the event handler for the form submission
addPostForm.addEventListener('submit', newPostHandler);
