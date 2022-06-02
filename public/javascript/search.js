const req = require("express/lib/request")

var dogs = document.querySelector("#dogs")
var cats = document.querySelector("#cats")
var smallPets = document.querySelector("#small-pets")
var reptiles = document.querySelector("#reptiles")
var wild = document.querySelector("#wild")
var fish = document.querySelector("#fish")

async function getDogs(event) {
    event.preventDefault();
    const response = await fetch(`/api/post/`,  {
        method: 'GET',
        
        headers: {
        'Content-Type': 'application/json',
    },
    })
    
      if (response.ok) {
        console.log('test');
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    
}




dogs.addEventListener("submit", getDogs)
cats.addEventListener("click", getCats)
smallPets.addEventListener("click", getSmallPets)
reptiles.addEventListener("click", getReptiles)
wild.addEventListener("click", getWild)
fish.addEventListener("click", getFish)




