const submitBtn = document.getElementById('submit-user');
const clearBtn = document.getElementById('clear-search');
const searchTerm = document.getElementById('search');
const postWrapper = document.getElementById('search-user-wrapper');
const categoryWrapper = document.getElementById('search-post-wrapper');
var clearHistoryBtn = document.getElementById('clear-history');

// All the below functions deals with generating the history buttons and...
// storing/extracting the data to/from local storage
var historyContainer = document.getElementById('history-searches');

// Check to see if an object (for the search terms) is saved locally
var localObject = localStorage.getItem('searchTerms');
// If the local storage doesn't exist....
if (localObject == null) {
  // For this session declare an empty object
  var searchHistory = [];
  // Otherwise if local storage does exist...
} else {
  // Parse the local data and update the above empty object with the data from local
  localObject = JSON.parse(localObject);
  searchHistory = localObject;
  searchHistory.forEach((item) => {
    // This will generate the history button elements upon application load
    var btn = document.createElement('button');
    btn.classList.add('search-btn');
    btn.textContent = item.searchTerm;
    btn.type = 'button';
    historyContainer.appendChild(btn);
    document.getElementById('history-search-label').style.display = 'flex';
  });
  // Reveal the clear history button
  clearHistoryBtn.style.display = 'unset';
}

// This function will check the buttons and ONLY generate the unique history buttons
var checkHistoryBtns = (finalLabel) => {
  var uniqueButton = true;

  // If the object length is 0, generate the button normally
  if (searchHistory.length == 0) {
    clearHistoryBtn.style.display = 'unset';

    // Generate the button elements
    createButtons(finalLabel);
    // Pushes the search term to an object then stores that object to local storage
    storeLocally(searchHistory, finalLabel);
    // Set to false so we don't double generate
    uniqueButton = false;
    // Execute this here to make sure it is working at this state as well
    historyBtnEvent();
  } else {
    // Go through ALL data, if the current label matches with a label in our object,
    // set uniqueButton to false so that we don't generate the button
    searchHistory.forEach((item) => {
      if (item.searchTerm == finalLabel) {
        uniqueButton = false;
      }
    });
  }

  // Only generate the button if it is unique and not already existing in the object
  if (uniqueButton) {
    createButtons(finalLabel);
    // Pushes the search term to an object then stores that object to local storage
    storeLocally(searchHistory, finalLabel);
    // Execute this here to make sure it is working at this state as well
    historyBtnEvent();
  }
};

// This executes the event listener for all active history buttons
const historyBtnEvent = () => {
  // Declare a variable to hold the active history buttons
  var historyBtns = document.getElementById('history-searches');

  // Iterate over each child and add a 'click' event listener...
  Array.prototype.forEach.call(historyBtns.children, (child) => {
    child.addEventListener('click', () => {
      fetchText(child.textContent);
    });
  });
};
// Execute globally so it works right away
historyBtnEvent();

// Generate the history search buttons upon hitting search
var createButtons = (finalLabel) => {
  document.getElementById('history-search-label').style.display = 'flex';

  // Create a button element
  var btn = document.createElement('button');
  // Add a 'search-btn' class to each button
  btn.classList.add('search-btn');
  // Then update the textcontent with the final label
  btn.textContent = finalLabel;
  // Add a type of 'button' so that these buttons don't submit the form
  btn.type = 'button';
  // Append the button(s) to the container
  historyContainer.appendChild(btn);
};

// Stores object to local storage
var storeLocally = (object, label) => {
  // Push the label and a unique ID to the object
  var id = Math.floor(Math.random() * 10000);
  searchHistory.push({ searchTerm: label, id });

  // Then store the full object locally
  localStorage.setItem('searchTerms', JSON.stringify(object));
};

// On initial page load, set clear button to display off
clearBtn.style.display = 'none';

const renderUserPosts = (postsObject, searchTerm) => {
  // Every time we render new users, clear the previous users
  postWrapper.innerHTML = '';

  if (typeof postsObject === 'string') {
    const update = document.getElementById('search-status-update');
    update.textContent = 'No Users found';

    setTimeout(() => {
      update.textContent = '';
    }, 1250);
  } else {
    postsObject.forEach((el) => {
      categoryWrapper.innerHTML = '';
      clearBtn.style.display = 'unset';
      const newEl = document.createElement('div');
      newEl.innerHTML += `
      <div id='homepage-posts' >
              <a id='single-post' href='/post/${el.id}'>
                <img class='${el.image_filter}' id='post-image' src='${
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
            `;
      document.getElementById('search-user-wrapper').style.display = 'unset';
      document.getElementById('search-user-wrapper').style.display = 'unset';
      postWrapper.appendChild(newEl);
    });
    checkHistoryBtns(searchTerm);
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
    renderUserPosts(data, searchTerm);
  }
}

submitBtn.addEventListener('click', () => {
  if (!searchTerm.value) {
    const update = document.getElementById('search-status-update');
    update.textContent = 'Please type a valid query';

    setTimeout(() => {
      update.textContent = '';
    }, 1500);
  } else {
    fetchText(searchTerm.value);
    searchTerm.value = ''; // Reset value for the input field
  }
});

// Upon clicking the clear history button, clear the storage and reload the application
var clearHistory = () => {
  localStorage.clear();
  location.reload();
};

clearHistoryBtn.addEventListener('click', clearHistory);
clearBtn.addEventListener('click', () => {
  location.reload();
});
