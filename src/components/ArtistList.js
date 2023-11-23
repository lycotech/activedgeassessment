import React, {useState, useEffect }from 'react';
import {getAllArtists, getArtistAlbums, getAllTweets} from '../ApiUtils';
import { Card } from 'primereact/card'




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
            <div className='p-grid p-justify-center'>
                {artists.map(artist =>(
                    <div key={artist.id} className="p-col-12 p-md-4 p-lg-3">
                        <Card title={artist.name}>

                        </Card>

                    </div>
                ))}

            </div>
        </div>
    )

   
}

export default ArtistList