// import { MongoClient } from 'mongodb'; 

// // /api/new-meetup

// async function handler(req, res) {
//     if (req.method === 'POST') {
//         const data = req.body; // get the data from the request body

//         //const { title, image, address, description } = data; // destructure the data object
//         const password = encodeURIComponent("mama1966!");

//         const client = await MongoClient.connect(`mongodb+srv://haimma66:${password}@cluster0.euibvgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true`); // connect to the database
//         const db = client.db(); // connect to the database

//         const meetupsCollection = db.collection('meetups'); // get the collection

//         try {
//             await meetupsCollection.insertOne(data); // insert the data into the collection
//         }
//         catch (error) {
//             console.error('Error inserting data:', error); // log the error to the console
//             res.status(500).json({ message: 'Error inserting data' }); // send a response back to the client
//             client.close(); // close the connection
//             return; // exit the function
//         }

//         // const result = await meetupsCollection.insertOne(data); // insert the data into the collection;
//         // console.log(result); 

//         client.close(); // close the connection

//         res.status(201).json({ message: 'Meetup inserted!' }); // send a response back to the client

//     }
// }

// export default handler;

import { MongoClient } from 'mongodb'; 

// /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        //const password = encodeURIComponent("mama1966!"); 
        const password = encodeURIComponent("susgadol66"); 

        try {
            const client = await MongoClient.connect(`mongodb+srv://haimon:${password}@cluster0.euibvgq.mongodb.net/meetups?retryWrites=true&tls=true`, {
                useUnifiedTopology: true,
                
            });
            console.log('Connected to database');

            const db = client.db(); // Replace with your database name
            const meetupsCollection = db.collection('meetups');

            const result = await meetupsCollection.insertOne(data);
            console.log('Insert result:', result);

            client.close();
            res.status(201).json({ message: 'Meetup inserted!' });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data', error: error.message });
        }
    }
}

export default handler;