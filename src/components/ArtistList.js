import React, {useState, useEffect }from 'react';
import {getAllArtists, getArtistAlbums, getAllTweets} from '../ApiUtils';




const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // Fetch All Artist on component mount
        getAllArtists()
        .then(data => setArtists(data))
        .catch(error => console.error('Error fecthing artist:', error));
    },[]);
    
    return(
        <div>
            <h1> Artists in Chocolate City</h1>
            <ul>
                {artists.map(artist =>(
                    <li key={artist.id}>
                        {artist.name}
                        
                    </li>
                ))}
            </ul>
        </div>
    )

   
}

export default ArtistList