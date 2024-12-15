# Flatdango  
 Welcome to Flatdango! An online ticket browsing and purchasing platform for Flatiron Movie Theater. This project is designed to demonstrate the use of Javascript for Dom manipulation, event handling and communication with a JSON server backend enabling users to effortlessly buy tickets for their favorite movies.

 ## Project Learning goals
 - To gain hands-on experience to manipulate the Document Objects Model,(DOM).
 - Master event handling to create interactive elements within the web.
 - Interact with a local JSON server to fetch and manipulate movie data.
 - Handle events like button clicks to trigger actions on the frontend.

 ## Requirements

 1. A well-written README file.
 2. Fetching data from a local JSON DB server.

 ## Pre-requisite Data

 The project utilizes a pre-defined `db.json` file that stores movie data. This file is not included here but should be provided for the development environment.

 ## Project Setup

 1. Creating Project Folder: 
 2. Initializing a Git repository to track changes.
 3. Regularly commiting code to the repository to maintain a clean history and facilitate backups.

 ## Core Deliverables

   1. **Display First Movie Details** 
    - Uponing loading the page, details of the firt movie should be displayed, such as;
      * Title
      * Poster
      * Runtime
      * Showtime
      * Available Tickets (calculated by subtracting number of `tickets_sold` from the theater's `capacity`)
    - Fetch data from the JSON server endpoint. `GET /films/1`.

   2. **Display a Menu of All Movies**

      * A menu of movies is displayed on the left side of the page.
      * Each movie title is listed under the ul#films element.
      * Data is fetched from the JSON server endpoint: `GET /films`.


   3. **Buy Ticket Button**
      * Allows users to purchase tickets for the currently displayed movie.
      * Available tickets decrease with each purchase.
      * Users cannot buy tickets once a movie is sold out.
      * No backend persistence for ticket sales is required.

  ## Bonus Deliverables
     1. **Fetches movie data on demand from the server**
          * Clicking a movie title in the menu replaces the currently displayed movie’s details with the selected movie’s details.
          * Fetches movie data on demand from the server.
     2. **Indicate Sold-Out Movies**
          * Once tickets for a movie are sold out, the "Buy Ticket" button changes to "Sold Out."
          * In the movies menu, sold-out movies are marked by adding a sold-out class to their list item.
   
  ## Extra Bonus (Optional)
     1. **Persist Ticket Sales to the Server**
          * When a user purchases a ticket, the updated tickets_sold value is persisted to the backend.
          * Use a PATCH request to update the number of tickets sold.
     2. **Delete a Movie**
          * Adding a "Delete" button next to each movie in the menu.
          * Clicking the button deletes the movie from both the frontend and the server.

  ## Project Structure

    1. **index.html**: Contains the basic HTML structure and placeholders for movie details and the menu.
    2. **style.css**: This ensures basic styling is done to the application layout.
    3. **index.js**: This is where DOM manipulation, event handling, and server communications are handled.
    4. **db.json**: The JSON file containing movie data for the server.

  **API Endpoints**
    * `GET /films`: Retrieve a list of all movies.
    * `GET /films/`:id: Retrieve the details of a specific movie.
    * `PATCH /films/`:id: Update the number of tickets sold for a movie.
    * `DELETE /films/`:id: Delete a movie from the server.

 ## Getting Started

  **Prerequisites**
   1. **Node.js**: Ensure you have Node.js installed on your machine to run the JSON server.
   2. **JSON Server**: You'll need to set up a local JSON server using the db.json file provided.

 ## Setup Instructions

  1. **Clone the Repository:**

       * git clone [https://github.com/sandramisigo/Flatdango](https://github.com/sandramisigo/Flatdango)
       * cd Flatdango

  2. **Install JSON Server:**

       * npm install -g json-server

  3. **Run the JSON Server:**
       * json-server --watch db.json
       * The server will run on `http://localhost:3000/`.
       * You can now access the movie data from the endpoint `http://localhost:3000/films`.

  4. **Open the Application:**

    * Open `index.html` in your browser to view and interact with the app.


 ## **License**

  This project is open-source and free to use under the MIT License. Feel free to modify and share as needed.

 **Author:** 
  Sandra Misigo

 **Contact:**
  For any questions or incase you experience challenges, feel free to contact me via [sandra.misigo@student.moringaschool.com]. Good luck!











