const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ParcelleSchema = new Schema({
    location: {
        'type': {
          type: String,
          required: true,
          enum: ['Point', 'LineString', 'Polygon'],
          default: 'Point'
        },
        coordinates: [Number]
      },
    date_semis: {
        type: Date,
        default: Date.now
    },
    indice_crois: {
        type: Number,
        required: false,
    },
    indice_perf: {
        type: Number,
        required: false,
    },
    nombre_plant: {
        type: Number,
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
        unique: false
    },
    statut: {
        type: Boolean,
        required: false,
    }
});

module.exports = Parcelle = mongoose.model('Parcelle', ParcelleSchema);
