const posts = document.querySelectorAll('.delete-post-id');

async function deletePost(id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

posts.forEach((post) => {
  post.addEventListener('click', () => {
    deletePost(post.dataset.postId);
  });
});
