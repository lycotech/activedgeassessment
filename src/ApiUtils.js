// ApiUtils.js

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch all artists
export const getAllArtists = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching artists:', error));
};

// Function to fetch artist's albums
export const getArtistAlbums = (artistId) => {
  return fetch(`${BASE_URL}/albums?userId=${artistId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching artist albums:', error);
      throw error;
    });
};

// Function to fetch album photos
export const getAlbumPhotos = albumId => {
  return fetch(`${BASE_URL}/albums/${albumId}/photos`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching photos:', error));
};

// Function to fetch all tweets
export const getAllTweets = () => {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching tweets:', error));
};

// Function to create a tweet
export const createTweet = (tweetData) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tweetData),
  })
  .then(response => response.json())
  .catch(error => console.error('Error creating tweet:', error));
};

// Function to update a tweet
export const updateTweet = (tweetId, updatedData) => {
  return fetch(`${BASE_URL}/comments/${tweetId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
  .then(response => response.json())
  .catch(error => console.error('Error updating tweet:', error));
};

// Function to delete a tweet
export const deleteTweet = tweetId => {
  return fetch(`${BASE_URL}/comments/${tweetId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .catch(error => console.error('Error deleting tweet:', error));
};
