
import { Fragment } from "react";
import Head from "next/head"; // for adding meta tags to the head of the page
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";


function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image= {props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
    
  );
}

export async function getStaticPaths() { // reserved name function that runs at build time. it runs on the server side. it is used to generate dynamic routes. it runs only once when the page is built. it is used for static generation.
  const password = encodeURIComponent("susgadol66"); 
  
  const client = await MongoClient.connect(`mongodb+srv://haimon:${password}@cluster0.euibvgq.mongodb.net/meetups?retryWrites=true&tls=true`, {
    useUnifiedTopology: true,
    
});
  
  const db = client.db(); // Replace with your database name
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // find all the documents in the collection, only get the _id field

  client.close(); // close the connection
    
  return {
    fallback: false, // if fallback is set to false, then the page will be generated at build time. if fallback is set to true, then the page will be generated at request time. if fallback is set to 'blocking', then the page will be generated at request time and will not show a loading state.
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }, // convert the _id to a string
    })),
  }
}

export async function getStaticProps(context) { // the context parameter is an object that contains the params object. the params object contains the dynamic segments of the URL. in this case, it contains the meetupId.  
  // Fetch data for a single meetup

  const meetupId = context.params.meetupId; // get the meetupId from the URL
  const password = encodeURIComponent("susgadol66"); 
  const client = await MongoClient.connect(`mongodb+srv://haimon:${password}@cluster0.euibvgq.mongodb.net/meetups?retryWrites=true&tls=true`, {
    useUnifiedTopology: true,
    
});
  console.log('Connected to database');

  const db = client.db(); // Replace with your database name
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)}); // find the document with the _id that matches the meetupId

  client.close(); 

  return {
    props: {
      meetupData: { 
        id: selectedMeetup._id.toString(), // convert the ObjectId to a string
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
       }, // pass the selected meetup data to the component as props}
    }
  }

}

export default MeetupDetails;