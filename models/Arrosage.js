const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArrosageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
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
  planactioneur: {
    type: Schema.Types.ObjectId,
    ref: 'PlanActionneur',
  },
});

module.exports = Arrosage = mongoose.model('Arrosage', ArrosageSchema);
