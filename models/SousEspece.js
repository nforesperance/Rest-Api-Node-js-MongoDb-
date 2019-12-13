const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SousSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    unique: true
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
  espece: {
    type: Schema.Types.ObjectId,
    ref: 'Espece',
  },
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
    unique:true
  },
  statut: {
    type: String,
    required: false,
}
});

module.exports = SousEspece = mongoose.model('SousEspece', SousSchema);
