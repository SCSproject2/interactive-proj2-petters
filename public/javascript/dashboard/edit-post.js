const editPosts = document.querySelectorAll('.edit-post-id');

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
const handleSubmit = (btn, postId, post) => {
  btn.addEventListener('click', (e) => {
    const newTitle = post.parentNode.parentNode.childNodes[5].children[0].value;
    const newBody =
      post.parentNode.parentNode.childNodes[5].childNodes[3].value;
    console.log(newTitle);
    if (newTitle.length <= 4 || newBody.length <= 4) {
      document.getElementById('edit-post-status').style.display = 'flex';
      setTimeout(() => {
        document.getElementById('edit-post-status').style.display = 'none';
      }, 3000);
    } else {
      editPost(newTitle, newBody, postId);
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
    const postHeader = post.parentNode.parentNode.childNodes[3].children[1];
    // For the input element we created, add the value of the current title
    editTitle.value = postHeader.innerText;
    // Then replace the current headerTitle with this
    postHeader.parentNode.replaceChild(editTitle, postHeader);

    // ------------ BODY HANDLING
    const editBody = document.createElement('textarea');
    editBody.classList.add(`edit-body-input`);
    const postBody = post.parentNode.parentNode.childNodes[3].childNodes[5];

    editBody.value = postBody.innerText.trim();
    postBody.parentNode.replaceChild(editBody, postBody);

    // ------------ SUBMIT NEW DATA
    // Handle the confirm event (extract the new values)
    handleSubmit(confirmBtn, post.dataset.postId, post);
  });
});
