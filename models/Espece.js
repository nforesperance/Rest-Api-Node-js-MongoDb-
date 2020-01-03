const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EspeceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  date_creation: {
    type: Date,
    default: Date.now
  },
  date_modefication: {
    type: Date,
    default: Date.now
  },
  code_createur: {
    type: String,
    required: false,
    unique: false
  },
  statut: {
    type: String,
    required: false,
}
});

module.exports = Espece = mongoose.model('Espece', EspeceSchema);
