import React, { useState, useEffect } from 'react';
import { getArtistAlbums, getAlbumPhotos } from '../ApiUtils';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const AlbumList = ({ selectedArtistId }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  useEffect(() => {
    // Fetch albums of the selected artist
    const getAlbum = async () =>{
      try{
        const data = await getArtistAlbums(selectedArtistId);
        setAlbums(data);
       // selectedAlbum(true);
      } catch(error){
        console.error('Error Fecthin Albums', error);
      }
    };
    getAlbum();

  }, [selectedArtistId]);

  const handleViewAlbum = async albumId => {
    try {
      const photos = await getAlbumPhotos(albumId);
      setAlbumPhotos(photos);
      setSelectedAlbum(albumId);
    } catch (error) {
      console.error('Error fetching album photos:', error);
    }
  };

  return (
    <div>
      <h2>Albums</h2>
      <div className="p-grid p-justify-center">
        {albums.map((album) => (
          <div key={album.id} className="p-col-12 p-md-4 p-lg-3">
            <Card title={album.title}>
              <Button label="View Photos" onClick={() => handleViewAlbum(album.id)} />
            </Card>
          </div>
        ))
        };
      </div>
      {selectedAlbum && (
        <div>
          <h3>Photos of Album {selectedAlbum}</h3>
          <div className="p-grid p-justify-center">
            {albumPhotos.map(photo => (
              <div key={photo.id} className="p-col-12 p-md-4 p-lg-3">
                <Card>
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                  <p>{photo.title}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumList;