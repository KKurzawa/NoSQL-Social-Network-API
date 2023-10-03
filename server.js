const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { MongoClient } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);
const dbName = 'socialNetworkDB';
let db2;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// db.once('open', () => {
//     app.listen(PORT, () => {
//         console.log(`API server for NoSQL Social Network API running on port http://localhost:${PORT}!`);
//     });
// });

client.connect()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        // Use client.db() constructor to add new db instance
        db2 = client.db(dbName);

        // start up express server
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message);
    });