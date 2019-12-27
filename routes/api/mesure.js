const express = require('express');
const router = express.Router();

// Item Model
const Mesure = require('../../models/Mesure');
const Capteur = require('../../models/Capteur');
const Parcelle = require('../../models/Parcelle');


function getMesure(capteur,res) {
    Mesure.findOne({ capteur: capteur},{ sort: { 'date' : -1 }}, function (err, data) {
        if(data){
            res.json(data)
        }       
    });
}

// @route   GET api/mesures
// @desc    Get all mesures
// @access  Public
router.get('/', (req, res) => {
    Mesure.find()
      .populate('capteur')
      .populate('parcelle')
      .sort({ name: 1 })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  });
 
// @route   GET api/mesures/latest
// @desc    Get latest mesures for all capteurs
// @access  Public
router.get('/latest/', (req, res) => {
  Capteur.find()
    .then(capteurs => {
        capteurs.forEach(capteur =>{
            Mesure.findOne({ capteur: capteur }).sort('-date').exec(function(err, data) {console.log(data);})
        })
    })
    .catch(err => console.log(err))
    .finally();
});

// @route   GET api/mesure/id_mesure
// @desc    Get one mesure
// @access  Public
router.get('/:id', (req, res) => {
    Mesure.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Mesure with id " + req.params.id
        });
    });
});

//@route POST api/id_parcelle/id_capteurs
//@desc save the mesures of one capteurs for a particular parcelle
//@access Public
router.post("/:parcelle_id/:capteur_id", (req, res) => {
Capteur.findById(req.params.capteur_id)
            .then(capteur =>{
                        Parcelle.findById(req.params.parcelle_id)
                            .then(parcelle => {
                                const data = new Mesure({
                                    grandeur: req.body.grandeur,
                                    valeur:req.body.valeur,
                                    capteur:capteur,
                                    parcelle:parcelle,
                                });
                                data.save()
                                    .then(data => {
                                    res.json(data);
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: err.message || "Some error occurred while creating the Mesure."
                                        });
                                    });
                            })
                            .catch(err => res.status(404).json({ success: false }));
              })
            .catch(err => res.status(404).json({ success: false }));
  });

//@route POST api/capteur
//@desc Create an capteur
//@access Public
router.post("/update/:id", (req, res) => {
        Capteur.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type_grandeur:req.body.type,
            description:req.body.desc,
            effectif:req.body.effectif,
        }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Capteur not found with id " + req.params.id
                });
            }
            res.json(data);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Capteur not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating capteur with id " + req.params.id
            });
        });
  });

//@route DELETE api/capteur:id
//@desc Delete Capteur
//@access Public
router.delete("/:id", (req, res) => {
    Mesure.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

