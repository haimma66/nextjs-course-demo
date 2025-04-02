
import { Fragment } from 'react';
import Head from 'next/head'; // for adding meta tags to the head of the page
import {MongoClient} from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Looking_back_at_downtown_Singapore_-_panoramio.jpg/375px-Looking_back_at_downtown_Singapore_-_panoramio.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!',
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Looking_back_at_downtown_Singapore_-_panoramio.jpg/375px-Looking_back_at_downtown_Singapore_-_panoramio.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup!',
//     }
// ];

function HomePage(props) {
       
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name="description" 
                    content="Browse a huge list of highly active React meetups!" 
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
        
}

// export async function getServerSideProps(context) { // reserved name function that runs at request time. it runs on the server side and is used to fetch data from an API. it runs on every request.
//     const req = context.req; // request object. good for authentication and authorization.
//     const res = context.res; // response object
    
//     // fetch data from an API
//     return {
//         props:{
//             meetups: DUMMY_MEETUPS, // this is just a placeholder for now
//         }
//     };
// }

// This is the prefered way to fetch data in Next.js. it runs at build time and is used to fetch data from an API. it runs only once when the page is built. it is used for static generation.
export async function getStaticProps() { // reserved name function that runs at build time. it rendered before the page is built. it runs on the server side.
    // fetch data from an API
    
    const password = encodeURIComponent("susgadol66"); 

    // try {
        const client = await MongoClient.connect(`mongodb+srv://haimon:${password}@cluster0.euibvgq.mongodb.net/meetups?retryWrites=true&tls=true`, {
            useUnifiedTopology: true,
            
        });
        console.log('Connected to database');

        const db = client.db(); // Replace with your database name
        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray(); // find all the documents in the collection

        client.close(); // close the connection
        
    // } catch (error) {
    //     console.error('Error inserting data:', error);
    //     res.status(500).json({ message: 'Error inserting data', error: error.message });
    // }
    

    return {
        props: {
            meetups: meetups.map((meetup) => {
                return {
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description,
                    id: meetup._id.toString(), // convert the ObjectId to a string
                };
            })
        }, // will be passed to the page component as props
        
        revalidate: 10, // revalidate makes sure that the page is updated every 10 seconds. it will be updated on the server side and then sent to the client.
    };
}

export default HomePage;