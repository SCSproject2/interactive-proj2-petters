// ----- ----- ----- ----- Below code is executed in the single-post template

const addCommentForm = document.getElementById('comment-form');

async function addComment(newComment, postId) {
  const response = await fetch(`/api/comments/${postId}`, {
    method: 'POST',
    body: JSON.stringify({
      comment_text: newComment,
      post_id: postId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace(`/post/${postId}`);
  } else {
    alert(response.statusText);
  }
}

const newCommentHandler = (event) => {
  event.preventDefault();

  // Extract the values from the form
  const comment_text = document.getElementById('comment-field').value;
  const commentStatusEl = document.getElementById('comment-status');

  if (comment_text.length <= 4) {
    // If any add post input value is under 4 character length, notify the user and restrict submission
    commentStatusEl.textContent =
      'Please make sure the comment contains character count above 4';
    commentStatusEl.style.color = 'red';
    setTimeout(() => {
      commentStatusEl.textContent = 'Required character count above 4';
      commentStatusEl.style.color = 'black';
    }, 4000);
  } else {
    commentStatusEl.textContent = 'Successfully posted... refreshing';
    commentStatusEl.style.color = 'Green';
    // Extract the post id via the active web url
    const postId = window.location.pathname.split('/')[2];
    // After 1 second, add the comment to the database
    setTimeout(() => {
      addComment(comment_text, postId);
    }, 750);
  }
};

// Add the event handler for the form submission
addCommentForm.addEventListener('submit', newCommentHandler);
