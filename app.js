require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const contatoRouter = require('./routes/contatoRoute');

const url = process.env.DB_URL;

const app = express();

app.use(express.json());

app.use('/contatos', contatoRouter);

mongoose.connect(url)
    .then(app.listen(3000, () => {
        console.log('Conectado ao Mongodb');
        console.log('API está ON na porta 3000!');
    }))
    .catch(error => console.log("Deu reuim!", error));

