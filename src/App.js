import React, { useState } from "react";
//import ArtistList from "./components/ArtistList";
import AlbumList from "./components/AlbumList"
import ArtistList from "./components/ArtistList";
import './styles.css';


function App() {
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const handleArtistSelect = (artistId) => {
    setSelectedArtistId(artistId);
  };
  return (
    <div className="App">
      <div className="sidebar">
        
        <ArtistList setSelectedArtistId={handleArtistSelect} />
        
      </div>
      <div className="main-content">
        {selectedArtistId && (
          <AlbumList selectedArtistId={selectedArtistId} />
        )}
      </div>
    </div>
  );
}

export default App;