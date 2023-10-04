const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');



const app = express();
const PORT = process.env.PORT || 3001;

// const dbName = 'socialNetworkDB';
// const connectionStringURI = `mongodb://127.0.0.1:27017/${dbName}`;
// const client = new MongoClient(connectionStringURI);

let db2;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// db.once('open', () => {
//     app.listen(PORT, () => {
//         console.log(`API server for NoSQL Social Network API running on port http://localhost:${PORT}!`);
//     });
// });

db.asPromise()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        // Use client.db() constructor to add new db instance


        // start up express server
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message);
    });