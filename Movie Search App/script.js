
const API_KEY = '3024fcc8';
const API_URL = 'http://www.omdbapi.com/';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const movieDetails = document.getElementById('movieDetails');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', searchMovies);

async function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    showLoading();
    clearResults();

    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${searchTerm}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displaySearchResults(data.Search);
        } else {
            showError(data.Error);
        }
    } catch (error) {
        showError('An error occurred while fetching data.');
    } finally {
        hideLoading();
    }
}

function displaySearchResults(movies) {
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
            <button class="details-button">View Details</button>
        `;
        movieElement.querySelector('.details-button').addEventListener('click', () => getMovieDetails(movie.imdbID));
        searchResults.appendChild(movieElement);
    });
}

async function getMovieDetails(imdbID) {
    showLoading();
    clearMovieDetails();

    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            displayMovieDetails(movie);
        } else {
            showError(movie.Error);
        }
    } catch (error) {
        showError('An error occurred while fetching movie details.');
    } finally {
        hideLoading();
    }
}

function displayMovieDetails(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} Poster">
        <p><strong>Release Date:</strong> ${movie.Released}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    `;
    movieDetails.classList.remove('hidden');
}

function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearResults() {
    searchResults.innerHTML = '';
    errorMessage.classList.add('hidden');
    movieDetails.classList.add('hidden');
}

function clearMovieDetails() {
    movieDetails.innerHTML = '';
    movieDetails.classList.add('hidden');
}