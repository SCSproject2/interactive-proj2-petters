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
    //   res.redirect('/login')
    //   // In the likes route, we return if a user tries to like a post
    //   // When they are not signed in so the response is not 'ok'
    //   // In other words, redirect to login page
    document.location.pathname = '/login';
  }
}

async function deleteLike(postId) {
  const response = await fetch(`/api/likes/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    return;
  }
}

likesBtn.forEach((btn) => {
  let checkClass = btn.classList[1];

  if (checkClass == 'true') {
    if (window.location.pathname.includes('post')) {
      btn.src = '../images/like_filled.png';
    } else {
      btn.src = './images/like_filled.png';
    }
  }

  btn.addEventListener('click', () => {
    let checkClass = btn.classList[1];
    let postId = btn.getAttribute('data-post-id');
    if (checkClass == 'true') {
      deleteLike(postId);
    } else {
      addLike(postId);
    }
  });
});
