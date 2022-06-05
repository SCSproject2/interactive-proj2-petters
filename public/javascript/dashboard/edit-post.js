const editPosts = document.querySelectorAll('.edit-post-id');
const postWrapper = document.getElementById('post-body-wrapper');

async function editPost(newTitle, newBody, postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: newTitle,
      body: newBody,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// Handle the confirm button event, return the new data and update the existing post
const handleSubmit = (btn, postId) => {
  btn.addEventListener('click', (e) => {
    const newTitle = e.path[2].childNodes[5].children[0].value;
    const newBody = e.path[2].childNodes[5].children[1].value;

    if (newTitle.length <= 4 || newBody.length <= 4) {
      document.getElementById('edit-post-status').style.display = 'flex';
      setTimeout(() => {
        document.getElementById('edit-post-status').style.display = 'none';
      }, 3000);
    } else {
      editPost(newTitle, newBody, postId);
      postWrapper.style.display = 'unset';
      postWrapper.style.flexDirection = 'unset';
    }
  });
};

editPosts.forEach((post) => {
  post.addEventListener('click', (e) => {
    // ------------ UPDATE ELEMENTS
    // Display a new confirm button
    const confirmBtn = document.getElementById(
      `confirm-post-${post.dataset.postId}`
    );
    confirmBtn.style.display = 'flex';

    postWrapper.style.display = 'flex';
    postWrapper.style.flexDirection = 'column';

    // Hide the edit, delete and view comments buttons
    document.getElementById(
      `delete-post-${post.dataset.postId}`
    ).style.display = 'none';
    document.getElementById(`edit-post-${post.dataset.postId}`).style.display =
      'none';
    document.getElementById(
      `view-comments-${post.dataset.postId}`
    ).style.display = 'none';

    // ------------ TITLE HANDLING
    // Create a new input element
    const editTitle = document.createElement('input');
    editTitle.classList.add(`edit-title-input`);
    // Extract the postHeader title input
    const postHeader = e.path[2].childNodes[5].children[0];

    // For the input element we created, add the value of the current title
    editTitle.value = postHeader.innerHTML;
    // Then replace the current headerTitle with this
    postHeader.parentNode.replaceChild(editTitle, postHeader);

    // ------------ BODY HANDLING
    const editBody = document.createElement('textarea');
    editBody.classList.add(`edit-body-input`);
    const postBody = e.path[2].childNodes[5].children[1];

    editBody.value = postBody.innerHTML.trim();
    postBody.parentNode.replaceChild(editBody, postBody);

    // ------------ SUBMIT NEW DATA
    // Handle the confirm event (extract the new values)
    handleSubmit(confirmBtn, post.dataset.postId);
  });
});
