import React, {useState, useEffect, Fragment }from 'react';
import {getAllArtists, getArtistAlbums, getAllTweets} from '../ApiUtils';
import { Card } from 'primereact/card';
import {Button } from  'primereact/button'
import { Sidebar } from 'primereact/sidebar';
import TweetList from './TweetList'


const ArtistList = ({setSelectedArtist}) => {
    const [artists, setArtists] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentArtist, setCurentArtist] = useState(null);
    useEffect(() => {
        // Fetch All Artist on component mount
        const getArtists = async () =>{
          try{
            const data = await getAllArtists();
            setArtists(data);
            
              }
             catch (error){
              console.error('Error Fetching artist', error);
             }
        };
        getArtists();
        
    },[]);

    const handleSelectedArtist = (artist) => {
      setSelectedArtist(artist);
      setCurentArtist(artist);
    }

    const handleOpenSideBar = () => {
      setVisible(!visible);

    }
    
    
    return(
      <Fragment>
        <div>
            
            <div className='p-grid p-justify-center'>
            <h1> Artists in Chocolate City</h1>
                {artists.map(artist =>(
                    <div key={artist.id} className="p-col-12 p-md-4 p-lg-3">
                        <Card 
                        title={artist.name}
                        onClick={() => handleSelectedArtist(artist)}
                        className='p-card-clickable'
                          footer={<div><Button label="Tweets" onClick={() => handleOpenSideBar()} /></div>}>

                        </Card>

                    </div>
                ))}

            </div>
        </div>
        <div className="card flex justify-content-center">
            <Sidebar className="w-full md:w-50rem lg:w-40rem p-sidebar-md" position="right" visible={visible} onHide={() => setVisible(false)}>
                <TweetList selectedArtist={currentArtist} ></TweetList>
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
        </Fragment>
    )

   
}

export default ArtistList