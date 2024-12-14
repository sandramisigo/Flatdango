
const movieDetails = document.getElementById('movie-details');
const filmsList =document.getElementById('films');
const buyTicketButton =document.getElementById('buy-ticket-button');

//fetching the first movie details
fetch ('http://localhost:3000/films/1')
.then(response => response.json())
.then(data => {
    const placeholder = filmsList.querySelector("li"); // Select the first <li> in the <ul>

    if (placeholder && placeholder.textContent === "Placeholder") {
        placeholder.remove(); // Remove the <li> with "Placeholder"
    }
// updating the movie details section
movieDetails.innerHTML = `
<h2> ${data.title} </h2>
<img src="${data.poster}" alt = "${data.title}">
<p>Runtime: ${data.runtime} min </p>
<p>Showtime: ${data.showtime} </p>
<p> Available Tickets:${data.capacity-data.tickets_sold}</p>
`;
//adding event listener to buyTicketButton
buyTicketButton.addEventListener('click', ()=>{
const availableTickets = movieDetails.querySelector('p:last-child');
availableTickets.textContent = `Available Tickets ${parseInt(availableTickets.textContent.split(': ')[1])-1}`
});
});

//fetching all movies and populating the list
fetch('http://localhost:3000/films')
.then(response => response.json())
.then(data =>{
    filmsList.removeChild(filmsList.firstChild) //to remove the placeholder from list

    data.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;
        listItem.classList.add('film','item');
        filmsList.appendChild(listItem);

        //adding eventlister to list items
listItem.addEventListener('click',()=> {
    fetch(`http://localhost:3000/films/${movie.id}`) //fetches details of last clicked movie and updates mov.list section
    .then(response => response.json())
    .then(movieData => {
        // updating the movie details section with new movie data
        movieDetails.innerHTML = `
        <h2> ${movieData.title} </h2>
        <img src="${movieData.poster}" alt = "${movieData.title}">
        <p>Runtime: ${movieData.runtime} min </p>
        <p>Showtime: ${movieData.showtime} </p>
        <p> Available Tickets:${movieData.capacity-movieData.tickets_sold}</p>`;
         })
      })
   });
})