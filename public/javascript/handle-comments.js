const btn = document.querySelector('#comment-submit');
const deleteBtn = document.querySelectorAll('.delete-comment');
const editBtn = document.querySelectorAll('.edit-comment');

//create new comment on single post
async function handleCommentForm(event) {
  event.preventDefault();

  const comment_text = document.querySelector('#comment-field').value.trim();
  const commentStatusEl = document.getElementById('comment-status');

  const post_id = window.location
    .toString()
    .split('/')
    [window.location.toString().split('/').length - 1].split('?')[0];

  if (comment_text.length <= 4) {
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

    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.reload();
      }, 900);
    } else {
      alert(response.statusText);
    }
  }
}
//submit edited comments
async function confirmEdit(comment_text, comment_id) {
  if (comment_text) {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

//edit comments user made
function editComment(event) {
  event.preventDefault();

  const comment_id = event.target.getAttribute('data-comment-id');
  const oldP = document.querySelector(`#comment-${comment_id}`);
  const oldText = document.querySelector(`#comment-${comment_id}`).textContent;
  const newText = document.createElement('textarea');
  newText.classList.add('edit-comment-input');
  newText.value = oldText;
  oldP.parentNode.replaceChild(newText, oldP);
  document.querySelector(`.delete-comment`).style.display = 'none';
  document.getElementById(`user-${comment_id}`).style.display = 'none';
  document.querySelector(`.comment-date-${comment_id}`).style.display = 'none';

  const confirmBtn = document.getElementById(`confirm-comment-${comment_id}`);
  confirmBtn.style.display = 'flex';

  const thisEditBtn = document.getElementById(`edit-comment-${comment_id}`);
  thisEditBtn.style.display = 'none';

  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let comment_text = newText.value.trim();
    if (comment_text.length <= 4) {
      document.getElementById(
        `new-comment-status-${comment_id}`
      ).style.display = 'flex';
      setTimeout(() => {
        document.getElementById(
          `new-comment-status-${comment_id}`
        ).style.display = 'none';
      }, 3000);
    } else {
      confirmEdit(comment_text, comment_id);
    }
  });
}

async function deleteComment(event) {
  event.preventDefault();
  const comment_id = event.target.getAttribute('data-comment-id');

  if (comment_id) {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

if (btn == null) {
} else {
  btn.addEventListener('click', handleCommentForm);
  editBtn.forEach((editBtn) => editBtn.addEventListener('click', editComment));
  deleteBtn.forEach((deleteBtn) =>
    deleteBtn.addEventListener('click', deleteComment)
  );
}
