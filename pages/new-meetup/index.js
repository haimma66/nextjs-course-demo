import { Fragment } from "react";
import Head from "next/head"; // for adding meta tags to the head of the page
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage () {
    const router = useRouter();

    async function addMeetupHandler (enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json(); // get the response data

        console.log(data); 

        router.push('/'); // redirect to the home page after adding the meetup

    }
    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta 
                    name="description" 
                    content="Add your own meetup!" 
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
        );
}

export default NewMeetupPage;