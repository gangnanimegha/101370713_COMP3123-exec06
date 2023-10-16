const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const app = express();
const PORT = process.env.PORT || 8081;

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
    console.log("Successfully connected to the database mongoDB Atlas Server");
    // Use the noteRoutes
    app.use('/api', noteRoutes);

    app.get('/', (req, res) => {
      res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
