// ApiUtils.js

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch all artists
export const getAllArtists = async() => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
    
};

// Function to fetch artist's albums by id
export const getArtistAlbums = async (artistId) => {
  const response = await fetch(`${BASE_URL}/albums`);
  return response.json();
  
};

// Function to fetch album photos
export const getAlbumPhotos = async (albumId ) => {
  const response = await fetch(`${BASE_URL}/albums/${albumId}/photos`);
  return response.json();
 };

// Function to fetch all tweets
export const getAllTweets = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  return response.json();
  
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