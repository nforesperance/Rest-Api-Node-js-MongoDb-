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
  },
  date_creation: {
    type: Date,
    default: Date.now
  },
  date_modification: {
    type: Date,
    default: Date.now
  },
  code_createur: {
    type: String,
    required: false,
  },
  espece: {
    type: Schema.Types.ObjectId,
    ref: 'Espece',
  },
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
  },
  statut: {
    type: Boolean,
    required: false,
}
});

module.exports = SousEspece = mongoose.model('SousEspece', SousSchema);
