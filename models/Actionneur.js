const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActionneurSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type_grandeur: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  effectif: {
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
    type: Boolean,
    required: false,
}
});

module.exports = Actionneur = mongoose.model('Actionneur', ActionneurSchema);
