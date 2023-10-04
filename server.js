const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.asPromise()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message);
    });