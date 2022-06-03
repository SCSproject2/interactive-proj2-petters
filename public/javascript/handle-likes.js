const likesBtn = document.querySelectorAll('.like-icon');

async function addLike(postId) {
  const response = await fetch(`/api/likes/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    // In the likes route, we return if a user tries to like a post
    // When they are not signed in so the response is not 'ok'
    // In other words, redirect to login page
    document.location.pathname = '/login';
  }
}

likesBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let postId = btn.getAttribute('data-post-id');
    addLike(postId);
  });
});
