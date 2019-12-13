const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlanActionneurSchema = new Schema({
  
 details: {
    type: String,
    required: true
  },
  date_prochaine: {
    type: Date,
    default: Date.now
  },
  attribut_quatre: {
    type: String,
    required: true
  },
  date_debut: {
    type: Date,
    default: Date.now
  },
  date_fin: {
    type: Date,
    default: Date.now
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
},
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
    unique:true
  },
  actionneur: {
    type: Schema.Types.ObjectId,
    ref: 'Actionneur',
    unique:true
  },

});

module.exports = PlanActionneur = mongoose.model('PlanActionneur', PlanActionneurSchema);
