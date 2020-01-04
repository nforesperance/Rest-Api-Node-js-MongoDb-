const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlanCapteurSchema = new Schema({
  
 details: {
    type: String,
    required: false
  },
  date_prochaine: {
    type: Date,
    default: Date.now
  },
  attribut_quatre: {
    type: String,
    required: false
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
    type: Boolean,
    required: false,
},
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  parcelle: {
    type: Schema.Types.ObjectId,
    ref: 'Parcelle',
  },
  capteur: {
    type: Schema.Types.ObjectId,
    ref: 'Capteur',
  },

});

module.exports = PlanCapteur = mongoose.model('PlanCapteur', PlanCapteurSchema);
