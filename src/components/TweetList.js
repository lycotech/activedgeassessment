import React, {useState, useEffect, Fragment, useRef } from 'react'
import { 
    getAllTweets,
    createTweet,
    updateTweet,
    deleteTweet
} from '../ApiUtils';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const TweetList = ({selectedArtist}) => {
    const [newTweet, setNewTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const toast = useRef(null);

    const successTweet = () => {
        toast.current.show({ severity: 'success', summary: 'Info', detail: 'Tweet Added Sucessfully' });
    };

    useEffect(() => {

        console.log(selectedArtist, "CurrentArtist")
        // Fetch All Artist on component mount
        const getTweets = async () =>{
          try{
            const data = await getAllTweets();
            const userTweets = data.filter(twt=> twt.postId === selectedArtist.id );

            setTweets(userTweets);
              }
             catch (error){
              console.error('Error Fetching artist', error);
             }
        };
        getTweets();
        
    },[]);
    
    const createNewTweet = () => {
        if (newTweet.trim() !== '') {
            createTweet(selectedArtist.postId, { body: newTweet })
            .then(response => {
              // Handle successful creation - Update state or re-fetch tweets
              setTweets([...tweets, response]);
              setNewTweet('');
              successTweet();
            })
            .catch(error => {
              // Handle error
              console.error('Error creating tweet:', error);
            });
        }
      };

      const handleUpdateTweet = (tweetId, updatedText) => {
        updateTweet(tweetId, { body: updatedText })
          .then(response => {
            const updatedTweets = tweets.map(tweet =>
              tweet.id === tweetId ? { ...tweet, body: updatedText } : tweet
            );
            setTweets(updatedTweets);
          })
          .catch(error => {
            console.error('Error updating tweet:', error);
          });
      };

      const handleDeleteTweet = tweetId => {
        deleteTweet(tweetId)
          .then(() => {
            const updatedTweets = tweets.filter(tweet => tweet.id !== tweetId);
            setTweets(updatedTweets);
          })
          .catch(error => {
            console.error('Error deleting tweet:', error);
          });
      };

    return(
        <Fragment>
            <Toast ref={toast} position="top-left" />
<div style={{maxHeight: "calc(100vh - 220px)", overflow: "auto"}}>
            {/* <h6> Artists in Chocolate City</h6> */}
            <div  className='p-grid p-justify-center'>
                {tweets.map(tweet =>(
                    <div key={tweet.id} className="p-col-12 p-md-4 p-lg-3">
                        <Card 
                        title={tweet.name}
                        subTitle={tweet.body}
                        footer={<div>
                        {/* <Button onClick={() => handleUpdateTweet(tweet.id, 'Updated tweet text')}>Update</Button> */}
                        <Button icon="pi pi-trash" onClick={() => handleDeleteTweet(tweet.id)} severity="danger"></Button>
                        </div>}
                        
                        >

                        </Card>

                    </div>
                ))}

            </div>
        </div>
        <div>
        <h6>Add Tweet</h6>
        <textarea
            value={newTweet}
            onChange={e => setNewTweet(e.target.value)}
            placeholder='Enter your Tweet'
            />
            <Button disabled={newTweet.length <= 0} onClick={createNewTweet} > Post Tweet</Button>
          
            
        </div>
        </Fragment>
        
    )

}

export default TweetList