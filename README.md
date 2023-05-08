# FilmFinder

This is a FilmFinder app built with React and SCSS that allows you to search for movies and add them to your favorites list. The app uses local storage to store the data and the TMDB API to fetch movie data.

## Installation

1. Clone the repository
2. Navigate to the project folder in your terminal
3. Run `npm install` to install dependencies
4. Run `npm start` to start the app
5. Open your browser and navigate to http://localhost:3000 to view the app

## Usage

### Search

To search for a movie, enter the movie name in the search bar and press enter or click on the search icon. The app will fetch the data from the API and display the results on the page.

### Movie Details

To view more information about a movie, click on the movie title in the search results. This will expand the movie card to display the movie's storyline. Click on the movie title again to hide the storyline. The movie rating is displayed in the top left corner of the movie card.

### Reviews

To view all reviews for a movie, click on the "Rating" button on the movie card. This will display a modal with all reviews left by other users on that movie. This feature can help you decide whether to add the movie to your favorites list or not.

### Favorites

To add a movie to your favorites list, click on the plus button on the movie card. If the movie is not already in your favorites list, it will be added. If the movie is already in your favorites list, a toast notification will appear at the top of the screen to inform you that the movie is already in your favorites list.

To view your favorites list, click on the "My List" button in the navigation bar. To remove a movie from your favorites, click on the remove button.

When you add or remove a movie from your favorites, a toast notification will appear at the top of the screen to confirm the action. Clicking on the toast notification when adding a movie to your favorites will navigate you to the "My List" page.

To delete all the movies from your favorites list, click on the delete button.

## Discover Movies
Explore top rated, upcoming, and popular movies by clicking on the corresponding buttons in the navigation bar.

## Single Page Application
The entire app is built as a single page application (SPA) to improve the user experience by reducing the need to navigate to multiple pages.

### Local Storage

The app uses local storage to store your favorites list. This means that your list will be saved even if you close the app or refresh the page.

### API

The app uses the TMDB API to fetch movie data. This API allows you to search for movies by title and returns information about the movie, including its plot, rating, and poster.

## Technologies Used

- React
- SCSS
- Local Storage
- TMDB API

## Credits

This app was built by abdullah mostafa. If you have any questions or feedback, please contact me at abdullah.mostafa883@gmail.com.