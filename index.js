
const movieDetails = document.getElementById('movie-details');
const filmsList = document.getElementById('films');
const buyTicketButton = document.getElementById('buy-ticket-button');
let currentMovieId = null; // Variable to track the current movie ID
let currentMovieListItem = null; // To track the current list item of the movie

// Function to handle ticket purchase
function handleTicketPurchase() {
  const availableTicketsElement = movieDetails.querySelector('p#available-tickets');
  let currentAvailableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);

  if (currentAvailableTickets > 0) {
    currentAvailableTickets--;
    availableTicketsElement.textContent = `Available Tickets: ${currentAvailableTickets}`;

// If tickets are sold out, alert the user and update the sold-out status
    if (currentAvailableTickets === 0) {
      alert('Tickets sold out!');
      buyTicketButton.textContent = 'Sold Out'; // change the button text to "Sold Out"
      markMovieAsSoldOut(currentMovieId); // call function to mark the movie as sold out
    }
  } else {
    alert('Tickets sold out!');
    buyTicketButton.textContent = 'Sold Out'; // Change the button text to "Sold Out"
  }
}

// Function to mark a movie as sold out in the list
function markMovieAsSoldOut(movieId) {
  const listItems = filmsList.querySelectorAll('li');
  listItems.forEach(item => {
    if (item.getAttribute('data-movie-id') === String(movieId)) {
      item.classList.add('sold-out'); // Add the 'sold-out' class to the corresponding list item
    }
  });
}

// Fetching the first movie details
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(data => {
    const placeholder = filmsList.querySelector('li'); // Select the first <li> in the <ul>

    if (placeholder && placeholder.textContent === 'Placeholder') {
      placeholder.remove(); // Remove the <li> with "Placeholder"
    }

    currentMovieId = data.id; // Set the current movie ID

    // Updating the movie details section
    movieDetails.innerHTML = `
      <h2> ${data.title} </h2>
      <img src="${data.poster}" alt="${data.title}">
      <p>Runtime: ${data.runtime} min</p>
      <p>Showtime: ${data.showtime}</p>
      <p id="available-tickets">Available Tickets: ${data.capacity - data.tickets_sold}</p>
    `;

    // Adding event listener to buyTicketButton
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

    data.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listItem.classList.add('film', 'item');
      listItem.setAttribute('data-movie-id', movie.id); // Store movie ID as an attribute

      // Check if the movie is sold out and add the "sold-out" class
      const ticketsLeft = movie.capacity - movie.tickets_sold;
      if (ticketsLeft === 0) {
        listItem.classList.add('sold-out'); // Add "sold-out" class to the list item
      }

      filmsList.appendChild(listItem);

      // Adding event listener to list items
      listItem.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${movie.id}`) // Fetches details of clicked movie and updates movie details section
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

            // Re-attach the event listener for the new movie's tickets
            buyTicketButton.removeEventListener('click', handleTicketPurchase);
            buyTicketButton.addEventListener('click', handleTicketPurchase);

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
