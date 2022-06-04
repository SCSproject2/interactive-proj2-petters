const likesBtn = document.querySelectorAll('.like-icon');

async function toggleLike(postId) {
  
  const response = await fetch(`/api/likes/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    return;
    // In the likes route, we return if a user tries to like a post
    // When they are not signed in so the response is not 'ok'
    // In other words, redirect to login page
    // document.location.pathname = '/login';
  }
}

// async function deleteLike(postId) {
//   const response = await fetch(`/api/likes/${postId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     document.location.reload();
//   }
// }


likesBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let postId = btn.getAttribute('data-post-id');

      toggleLike(postId);
  });
});
