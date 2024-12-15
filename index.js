//waits for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

//referencing the movie details section, films list and the buy ticket button
const movieDetails = document.getElementById('movie-details'); //section to display movie details.
const filmsList = document.getElementById('films');  //list of films.
const buyTicketButton = document.getElementById('buy-ticket-button');
let currentMovieId = null; // Variable to track the current movie ID
let currentMovieListItem = null; // variable to track the current list item of the selected movie

// Function to handle ticket purchase
function handleTicketPurchase() {    
  const availableTicketsElement = movieDetails.querySelector('p#available-tickets'); //getting available ticket element
  let currentAvailableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]); //extracting current available ticket count

  //checking if there are tickets available
  if (currentAvailableTickets > 0) {
    currentAvailableTickets--;     // decreasing the ticket count
    availableTicketsElement.textContent = `Available Tickets: ${currentAvailableTickets}`;  //updating ticket count in the ul

// If tickets are sold out, alert the user and update the button 
    if (currentAvailableTickets === 0) {
      alert('Tickets sold out!');
      buyTicketButton.textContent = 'Sold Out'; // change the button text to "Sold Out"
      markMovieAsSoldOut(currentMovieId); // call function to mark the movie as sold out in the list
    }
  } else {
    alert('Tickets sold out!');  //if no tickets are left, display the alert message
    buyTicketButton.textContent = 'Sold Out'; // Change the button text to "Sold Out"
  }
}

// Function to mark a movie as sold out in the movie list
function markMovieAsSoldOut(movieId) {
  const listItems = filmsList.querySelectorAll('li');  //get all list items
  listItems.forEach(item => {
    if (item.getAttribute('data-movie-id') === String(movieId)) {
      item.classList.add('sold-out'); // Add the 'sold-out' class to the corresponding list item
    }
  });
}

// Fetching and displaying the first movie details when the page loads
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(data => {
    const placeholder = filmsList.querySelector('li'); // Select the first <li> in the <ul>

// removing placeholder from list  item
    if (placeholder && placeholder.textContent === 'Placeholder') {
      placeholder.remove(); 
    }

    currentMovieId = data.id; // Setting the current movie ID

    // Updating the movie details section with the fetched data
    movieDetails.innerHTML = `
      <h2> ${data.title} </h2>
      <img src="${data.poster}" alt="${data.title}">
      <p>Runtime: ${data.runtime} min</p>
      <p>Showtime: ${data.showtime}</p>
      <p id="available-tickets">Available Tickets: ${data.capacity - data.tickets_sold}</p>
    `;

    // Attaching ticket purchase handling to the buy ticket button
    buyTicketButton.addEventListener('click', handleTicketPurchase);

    // If the movie is sold out, update the button and the film list item
    const ticketsLeft = data.capacity - data.tickets_sold;
    if (ticketsLeft === 0) {
      buyTicketButton.textContent = 'Sold Out'; // Change the button text to "Sold Out"
      markMovieAsSoldOut(currentMovieId); // Mark the movie as sold out in the list
    }
  });

// Fetching all movies and populating the list
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    filmsList.removeChild(filmsList.firstChild); // To remove the placeholder from list

    //loop through the list of movies and add them to the film list
    data.forEach(movie => {
      const listItem = document.createElement('li');  //create a new list item for each movie.
      listItem.textContent = movie.title;   //set movie title
      listItem.classList.add('film', 'item');  //add class to list item
      listItem.setAttribute('data-movie-id', movie.id); // Store movie ID as an attribute

      // Check if the movie is sold out and add the "sold-out" class if applicable
      const ticketsLeft = movie.capacity - movie.tickets_sold;
      if (ticketsLeft === 0) {
        listItem.classList.add('sold-out'); // Add "sold-out" class to the list item
      }

      filmsList.appendChild(listItem); //append movie to the list

      // Adding event listener to list items to display movie details when clicked
      listItem.addEventListener('click', () => {
        // Fetches details of clicked movie and updates movie details section
        fetch(`http://localhost:3000/films/${movie.id}`) 
          .then(response => response.json())
          .then(movieData => {
            currentMovieId = movieData.id; // Set the current movie ID
            currentMovieListItem = listItem; // Set the current list item

            // Updating the movie details section with new movie data
            movieDetails.innerHTML = `
              <h2> ${movieData.title} </h2>
              <img src="${movieData.poster}" alt="${movieData.title}">
              <p>Runtime: ${movieData.runtime} min</p>
              <p>Showtime: ${movieData.showtime}</p>
              <p id="available-tickets">Available Tickets: ${movieData.capacity - movieData.tickets_sold}</p>
            `;

            // updating buy ticket button with new movie data
            buyTicketButton.removeEventListener('click', handleTicketPurchase); //removes old event listener
            buyTicketButton.addEventListener('click', handleTicketPurchase);   //adds new event listener

            // If the movie is sold out, update the button text and the list item
            if (movieData.capacity - movieData.tickets_sold === 0) {
              buyTicketButton.textContent = 'Sold Out'; // Change the button text to "Sold Out"
              currentMovieListItem.classList.add('sold-out'); // Add 'sold-out' class to the list item
            } else {
              buyTicketButton.textContent = 'Buy Ticket'; // Reset the button text if tickets are available
            }
          });
      });
    });
  });
});
