import React, { useState, useEffect } from 'react';
import { getArtistAlbums, getAlbumPhotos } from '../ApiUtils';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const AlbumList = ({ selectedArtist }) => {
  const [allAlbums, setAllAlbums] = useState([]);
  //const [albumPhotos, setAlbumsPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  useEffect(() => {
    // Fetch albums of the selected artist
    const getAlbum = async () =>{
      try{
        const totalAlbums = await getArtistAlbums();
        setAllAlbums(totalAlbums);
        const artistAlbums = totalAlbums.filter(album => album.userId === selectedArtist.id );
        console.log(selectedArtist)
        console.log(totalAlbums)
        
        
        setAlbums(artistAlbums);
      
      } catch(error){
        console.error('Error Fecthin Albums', error);
      }
    };
    getAlbum();

  }, []);

  useEffect(() => {
    console.log(albums)

  }, [albums]);
  
  
  useEffect(() => {

    if (allAlbums.length > 0){
      const artistAlbums = allAlbums.filter(album => album.userId === selectedArtist.id );
      console.log(selectedArtist)
      console.log(allAlbums)
      setAlbums(artistAlbums);
      
      downloadAlbumPhotos(artistAlbums)
    }
        
    // Fetch albums of the selected artist
    // const getAlbum = async () =>{
    //   try{
    //     const allAlbums = await getArtistAlbums();
    //     setAlbums(allAlbums);
    //     const artistAlbums = allAlbums.filter(album => album.userId === selectedArtist.id );
    //     console.log(selectedArtist)
    //     console.log(allAlbums)
    //     setAlbums(artistAlbums);
      
    //   } catch(error){
    //     console.error('Error Fecthin Albums', error);
    //   }
    // };
    // getAlbum();

  }, [selectedArtist]);


  const downloadAlbumPhotos = async (albums) => {
   
    console.log(albums, "Albums")
    try {
      
      if(Array.isArray(albums)){
        var newAlbums = albums.slice()
        for (let index = 0; index < albums.length; index++) {
          const album = albums[index];
          console.log(album, "Album")
          getAlbumPhotos(album.id).then(photos => {
            if (Array.isArray(photos) && photos.length > 0){
              var albumDefaultPhoto = photos[0]
              newAlbums[index].photo = albumDefaultPhoto
              setAlbums(newAlbums);
              console.log(photos, "Photos")
              console.log(newAlbums, "NewAlbums")
              //var item = {albumId: album.id, photo: albumDefaultPhoto}
              //setAlbumPhotos(photos);
            }
          })
          
        }

       
      }
    } catch (error) {
      console.error('Error fetching album photos:', error);
    }
  };


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
      <div className="row">
        {albums.map((album) => (
          <div key={album.id} style={{minHeight: "150px"}}  className="col-md-4">
            <Card  footer={<div>{album.title}</div>}>
            <img src={album.photos ? album.photos.thumbnailUrl : "https://placehold.co/150"} alt="Album Thumbnail" ></img>
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