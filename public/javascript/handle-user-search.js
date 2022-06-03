const submitBtn = document.getElementById('submit-user');
const clearBtn = document.getElementById('clear-search');
const searchTerm = document.getElementById('search');
const postWrapper = document.getElementById('search-user-wrapper');

// On initial page load, set clear button to display off
clearBtn.style.display = 'none';

const renderUserPosts = (postsObject) => {
  // Every time we render new users, clear the previous users
  postWrapper.innerHTML = '';

  if (typeof postsObject === 'string') {
    const newEl = document.createElement('div');
    newEl.innerHTML += `<p style='margin-top: 10px'>No users found</p>`;
    postWrapper.appendChild(newEl);
    setTimeout(() => {
      postWrapper.innerHTML = '';
    }, 2000);
  } else {
    postsObject.forEach((el) => {
      clearBtn.style.display = 'unset';
      const newEl = document.createElement('div');
      newEl.innerHTML += `
            <div id='single-post-wrapper' class='user-results'>
              <a id='single-post' href='/post/${el.id}'>
                <div id='post-header' class='${el.category_name}'>
                  <p id='post-category'>${el.category_name}</p>
                  <p id='post-date'>${el.user.username}
                    -
                    ${format_date(el.created_at)}</p>
                </div>
                <img id='post-image' src='${el.image_url}' alt='${el.title}' />
                <div id='post-body-wrapper'>
                  <h4 id='post-title'>${el.title}</h4>
                  <p id='post-body'>
                    ${el.body}
                  </p>
                </div>
              </a>
              <div id='post-icon-wrapper'>
                <div id='chat-icon-wrapper'>
                  <img id='chat-icon' src='./images/comment.png' alt='' />
                  <p>${el.comments.length}</p>
                </div>
                <div id='like-icon-wrapper'>
                  <img
                    data-post-id='${el.id}'
                    class='like-icon'
                    src='./images/like.png'
                    alt=''
                  />
                  <p>${el.likes.length}</p>
                </div>
              </div>
            </div>
            `;
      postWrapper.appendChild(newEl);
    });
  }
};

async function fetchText(searchTerm) {
  const response = await fetch(`/search/user/${searchTerm}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    var data = await response.json();
    renderUserPosts(data);
  }
}

submitBtn.addEventListener('click', () => {
  fetchText(searchTerm.value);
});

// Clear the active user results and the input field as well
clearBtn.addEventListener('click', () => {
  clearBtn.style.display = 'none';
  postWrapper.innerHTML = '';
  searchTerm.value = '';
});