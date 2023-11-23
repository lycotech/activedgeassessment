import React, { useState, useEffect } from 'react';
import { getAllArtists, getArtistAlbums } from './ApiUtils';
import { Button } from 'primereact/button';

const ArtistListbtn = ({ setSelectedArtistId }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch all artists on component mount
    getAllArtists()
      .then(data => setArtists(data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  const handleArtistSelect = async artistId => {
    setSelectedArtistId(artistId);
    setSelectedArtist(artists.find(artist => artist.id === artistId));
    try {
      const artistAlbums = await getArtistAlbums(artistId);
      setAlbums(artistAlbums);
    } catch (error) {
      console.error('Error fetching artist albums:', error);
    }
  };

  return (
    <div>
      <h1>Artists in Chocolate City</h1>
      <div className="artist-buttons">
        {artists.map(artist => (
          <div key={artist.id}>
            <Button label={artist.name} onClick={() => handleArtistSelect(artist.id)} />
          </div>
        ))}
      </div>
      {selectedArtist && (
        <div className="sidebar">
          <h2>Albums of {selectedArtist.name}</h2>
          <ul>
            {albums.map(album => (
              <li key={album.id}>{album.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArtistListbtn;
