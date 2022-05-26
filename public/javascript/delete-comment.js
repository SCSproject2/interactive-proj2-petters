async function deleteComment(comment_id) {
  const postId = window.location.pathname.split('/')[2];
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/post/${postId}`);
  } else {
    alert(response.statusText);
  }
}

const deleteBtn = document.querySelectorAll('.delete-comment');
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let commentId = btn.dataset.commentId;
    deleteComment(commentId);
  });
});
