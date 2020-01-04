const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: Boolean,
    required: false,
},
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
  },
  planactioneur: {
    type: Schema.Types.ObjectId,
    ref: 'PlanActionneur',
  },
});

module.exports = Arrosage = mongoose.model('Action', ActionSchema);
