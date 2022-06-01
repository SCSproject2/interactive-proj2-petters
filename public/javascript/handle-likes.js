const likesBtn = document.querySelectorAll('.like-icon');

async function addLike(postId) {
  const response = await fetch(`/api/likes/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log('test');
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

likesBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let postId = btn.getAttribute('data-post-id');
    addLike(postId);
  });
});
