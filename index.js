const movieDetails = document.getElementById('movie-details');
const filmsList = document.getElementById('films');
const buyTicketButton = document.getElementById('buy-ticket-button');

// Function to handle ticket purchase
function handleTicketPurchase() {
  const availableTicketsElement = movieDetails.querySelector('p:last-child');
  let currentAvailableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);

  if (currentAvailableTickets > 0) {
    currentAvailableTickets--;
    availableTicketsElement.textContent = `Available Tickets: ${currentAvailableTickets}`;

    if (currentAvailableTickets === 0) {
      alert('Tickets sold out!');
    }
  } else {
    alert('Tickets sold out!');
  }
}

// Fetching the first movie details
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(data => {
    const placeholder = filmsList.querySelector('li'); // Select the first <li> in the <ul>

    if (placeholder && placeholder.textContent === 'Placeholder') {
      placeholder.remove(); // Remove the <li> with "Placeholder"
    }

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
      filmsList.appendChild(listItem);

      // Adding event listener to list items
      listItem.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${movie.id}`) // Fetches details of last clicked movie and updates mov.list section
          .then(response => response.json())
          .then(movieData => {
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
          });
      });
    });
  });
