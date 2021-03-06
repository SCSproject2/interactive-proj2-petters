const categoryBtns = document.querySelectorAll('.category-btns');
const userWrapper = document.getElementById('search-user-wrapper');

const format_date = (date) => {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
};

const renderPosts = (postsObject) => {
  const postWrapper = document.getElementById('search-post-wrapper');
  userWrapper.innerHTML = '';
  postWrapper.innerHTML = '';
  if (postsObject.length < 1) {
    const update = document.getElementById('search-status-update');
    update.textContent = 'No Posts found';

    setTimeout(() => {
      update.textContent = '';
    }, 1250);
  } else {
    postsObject.forEach((el) => {
      clearBtn.style.display = 'unset';
      const newEl = document.createElement('div');
      newEl.innerHTML += `
      <div id='homepage-posts'>
          <a id='single-post' href='/post/${el.id}'>
            <img class=${el.image_filter} id='post-image' src='${
        el.image_url
      }' alt='${el.title}' />
            <div id='post-body-wrapper'>
                      <div id='title-wrapper'>
                  <p id='post-date'>${el.user.username}
                  -
                  ${format_date(el.created_at)}</p>
                  <p class='${el.category_name}'id='post-category'>${
        el.category_name
      }</p>
                </div>
              <h4 id='post-title'>${el.title}</h4>
              <p id='post-body'>
                ${el.body}
              </p>
            </div>
          </a>
          </div>
        </div>
        `;
      document.getElementById('search-post-wrapper').style.display = 'unset';
      document.getElementById('search-user-wrapper').style.display = 'none';
      postWrapper.appendChild(newEl);
    });
  }
};
async function returnPosts(categoryId) {
  const response = await fetch(`/api/posts/categories/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    var data = await response.json();
    renderPosts(data);
  }
}

categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const categoryId = btn.getAttribute('data-category-id');
    returnPosts(categoryId);
  });
});
