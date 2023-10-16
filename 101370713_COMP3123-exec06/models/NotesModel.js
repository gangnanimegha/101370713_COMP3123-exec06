const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['HIGH', 'LOW', 'MEDIUM'],
    default: 'MEDIUM',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create the Note model
const NotesModel = mongoose.model('NotesModel', noteSchema);

// Export the NotesModel model
module.exports = NotesModel;
