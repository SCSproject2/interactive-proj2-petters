const statusEl = document.getElementById('generating-status');
var counter = 0;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0',
  },
};

const genRandomNum = (arr) => {
  let randomNum = Math.ceil(Math.random(0) * arr.length);
  return randomNum;
};

const getRandomAnimal = () => {
  var animals = [
    'dogs',
    'cats',
    'reptile',
    'small-pets',
    'cats',
    'fish',
    'dogs',
    'small-pets',
    'dogs',
  ];
  let randomNum = Math.ceil(Math.random(0) * animals.length - 1);
  // Added repetitiveness to include chances of more random outcomes
  return animals[randomNum];
};

const getRandomFilter = () => {
  var filter = [
    'grayscale',
    'invert',
    'red-tint',
    'orange-tint',
    'purple-tint',
    'blue-tint',
    'sepia',
    'no-filter',
    'no-filter',
  ];
  let randomNum = Math.ceil(Math.random(0) * filter.length - 1);
  // Added repetitiveness to include chances of more random outcomes
  return filter[randomNum];
};

async function fetchRandomCaptions(image_url, randomAnimal) {
  const post = { url: image_url, categoryId: '', image_filter: '' };
  var categoriesArr = [
    { name: 'dogs', id: 1 },
    { name: 'cats', id: 2 },
    { name: 'small-pets', id: 3 },
    { name: 'reptile', id: 4 },
    { name: 'fish', id: 6 },
  ];
  categoriesArr.forEach((animal) => {
    if (animal.name == randomAnimal) {
      post.categoryId = animal.id;
    }
  });

  post.image_filter = getRandomFilter();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hargrimm-wikihow-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0',
    },
  };

  fetch('https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=2', options)
    .then((response) => response.json())
    .then((response) => {
      if (response[1].length < 40 && response[2].length < 100) {
        newPostHandler(
          post.url,
          post.categoryId,
          response[1],
          response[2],
          post.image_filter
        );
      } else {
        statusEl.textContent = 'Generating...';
        fetchAnimal();
      }
    })
    .catch((err) => console.error(err));
}

// Fetch the animal image then execute the return active categories fetch
async function fetchAnimal() {
  var randomAnimal = getRandomAnimal();
  fetch(
    `https://google-image-search1.p.rapidapi.com/v2/?q=${randomAnimal}&hl=en`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.response == undefined) {
        statusEl.textContent =
          'No data found and or exceeded fetch limit, please try again!';
        setTimeout(() => {
          statusEl.textContent = '';
        }, 3000);
      } else {
        var image_url =
          response.response.images[genRandomNum(response.response.images)].image
            .url;
        fetchRandomCaptions(image_url, randomAnimal);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Main function to create the post itself
async function newPostHandler(
  url,
  existing_categories,
  title,
  desc,
  image_filter
) {
  const response = await fetch(`/api/posts/random`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      desc: desc,
      image_filter: image_filter,
      category_id: existing_categories,
      image_url: url,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    // Continue to fetch until it successfully generates the post
    counter++;
    if (counter == 15) {
      statusEl.textContent = 'No data found, please try again!';
      setTimeout(() => {
        statusEl.textContent = '';
      }, 3000);
    } else {
      fetchAnimal();
      statusEl.textContent = 'Generating...';
    }
  }
}

document.getElementById('random-post').addEventListener('click', fetchAnimal);
