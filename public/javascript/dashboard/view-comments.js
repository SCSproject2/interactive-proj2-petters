const viewCommentBtns = document.querySelectorAll('.view-comments');
viewCommentBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = `/post/${btn.dataset.postId}`;
  });
});
