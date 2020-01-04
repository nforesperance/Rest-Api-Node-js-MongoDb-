const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Capteur = require('./Capteur');
const Parcelle = require('./Parcelle');

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
    type: Boolean,
    required: false,
},
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
    unique:false
  },
  capteur: {
    type: Schema.Types.ObjectId,
    ref: 'Capteur',
    unique:false
  },
});


module.exports = Mesure = mongoose.model('Mesure', MesureSchema);
