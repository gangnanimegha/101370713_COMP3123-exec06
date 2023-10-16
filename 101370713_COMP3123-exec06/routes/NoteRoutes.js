const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('../models/NotesModel'); // Import the NotesModel

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Atlas URL
const DB_URL = "mongodb+srv://meghagangnani2001:Meghaga7@cluste.febk81m.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Successfully connected to the database MongoDB Atlas Server");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Example endpoint to create a new note
app.post('/notes', (req, res) => {
    const newNote = new Note(req.body);

    newNote.save()
        .then(savedNote => {
            res.json(savedNote);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Example endpoint to get all notes
app.get('/notes', (req, res) => {
    Note.find()
        .then(notes => {
            res.json(notes);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = app;
