import React, { useState } from "react";
//import ArtistList from "./components/ArtistList";
import AlbumList from "./components/AlbumList"
import ArtistList from "./components/ArtistList";
import './styles.css';


function App() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
  };
  return (
    <div className="App">
      <div className="sidebar">
        
        <ArtistList setSelectedArtist={handleArtistSelect} />
        
      </div>
      <div className="main-content">
        {selectedArtist && (
          <AlbumList selectedArtist={selectedArtist} />
        )}
      </div>
    </div>
  );
}

export default App;