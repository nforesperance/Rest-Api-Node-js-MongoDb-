const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MesureSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  grandeur: {
    type: Number,
    required: false,
  },
  valeur: {
    type: Number,
    required: false,
  },
  statut: {
    type: String,
    required: false,
  },
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
    unique:true
  },
  capteur: {
    type: Schema.Types.ObjectId,
    ref: 'Capteur',
    unique:true
  },
});

module.exports = Mesure = mongoose.model('Mesure', MesureSchema);
