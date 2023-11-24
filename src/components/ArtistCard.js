import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { fetchAlbumsByArtistId, fetchTweetsByArtistId } from '../ApiUtils';

const ArtistCard = ({ artist }) => {
  const [albums, setAlbums] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchAlbumsAndTweets = async () => {
      try {
        const albumsData = await fetchAlbumsByArtistId(artist.id);
        setAlbums(albumsData);

        const tweetsData = await fetchTweetsByArtistId(artist.id);
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching albums and tweets', error);
      }
    };
    fetchAlbumsAndTweets();
  }, [artist.id]);

  return (
    <Card title={artist.name}>
      <div className="artist-info">
        {/* Display artist information */}
        <p>Email: {artist.email}</p>
        {/* Add more artist details as needed */}
      </div>
      <div className="artist-actions">
        {/* Music icon buttons for albums and tweets */}
        <Button
          className="p-button-rounded p-button-text p-button-sm"
          icon="pi pi-music"
          onClick={() => console.log('View albums')}
        />
        <Button
          className="p-button-rounded p-button-text p-button-sm"
          icon="pi pi-comment"
          onClick={() => console.log('View tweets')}
        />
      </div>
    </Card>
  );
};

export default ArtistCard;
