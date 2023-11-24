import React, {useState, useEffect } from 'react'
import { 
    getAllTweets,
    createTweet,
    updateTweet,
    deleteTweet
} from '../ApiUtils';
import { Card } from 'primereact/card';

const TweetList = ({selectedArtist}) => {
    const [tweets, setTweets] = useState([]);

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

    return(
        <div>
            <h1> Artists in Chocolate City</h1>
            <div className='p-grid p-justify-center'>
                {tweets.map(tweet =>(
                    <div key={tweet.id} className="p-col-12 p-md-4 p-lg-3">
                        <Card 
                        title={tweet.name}
                        subTitle={tweet.body}
                        
                        >

                        </Card>

                    </div>
                ))}

            </div>
        </div>
    )

}

export default TweetList