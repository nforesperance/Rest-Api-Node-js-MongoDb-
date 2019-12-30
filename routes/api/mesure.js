const express = require('express');
const router = express.Router();

// Item Model
const Mesure = require('../../models/Mesure');
const Capteur = require('../../models/Capteur');
const Parcelle = require('../../models/Parcelle');


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
    let arr = []
  Capteur.find()
    .then(capteurs => {
        capteurs.forEach((capteur,index) =>{
            Mesure.findOne({ capteur: capteur }).sort('-date')
                .then(data => {
                    arr.push(data)                   
                })
                .then(()=>{
                    if(index == capteurs.length-1){
                        res.json(arr)
                    }
                })
        })
    })
    .catch(err => console.log(err))
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

// @route   GET api/mesure/all/id_capteur
// @desc    Get all the mesure of one capteur
// @access  Public
router.get('/all/:capteur_id', (req, res) => {
    Capteur.findById(req.params.capteur_id)
    .then(capteur => {
            Mesure.find({ capteur: capteur })
                .then(data => {
                    res.json(data)                  
                })
                .catch(err =>{
                    res.status(404).send({
                        message: err.message || "No Mesure found"
                    });
                })
    })
    .catch(err => console.log(err))
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

// router.post("/update//:parcelle_id/:capteur_id", (req, res) => {
//   });

//@route DELETE api/mesures:id
//@desc Delete mesures
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

