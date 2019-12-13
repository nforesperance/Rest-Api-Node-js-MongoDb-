const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlanCapteurSchema = new Schema({
  
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
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
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

module.exports = PlanCapteur = mongoose.model('PlanCapteur', PlanCapteurSchema);
