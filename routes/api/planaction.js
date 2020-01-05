const express = require('express');
const router = express.Router();

// Item Model
const PlanAction = require('../../models/PlanActionneur');
const Actionneur = require('../../models/Actionneur');
const Parcelle = require('../../models/Parcelle');


// @route   GET api/mesures
// @desc    Get all mesures
// @access  Public
router.get('/', (req, res) => {
    PlanAction.find()
      .populate('actionneur')
      .populate('parcelle')
      .sort({ ate_creation: 1 })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  });

// @route   GET api/mesure/id_mesure
// @desc    Get one mesure
// @access  Public
router.get('/:id', (req, res) => {
    PlanAction.findById(req.params.id)
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

// @route   GET api/mesure/parcelle/id_parcelle
// @desc    Get all the mesure of one parcelle
// @access  Public
router.get('/parcelle/:parcelle_id', (req, res) => {
    Parcelle.findById(req.params.parcelle_id)
    .then(parcelle => {
            PlanAction.find({ parcelle: parcelle })
                .then(data => {
                    res.json(data)                  
                })
                .catch(err =>{
                    res.status(404).send({
                        message: err.message || "No planification found"
                    });
                })
    })
    .catch(err => console.log(err))
});

// @route   GET api/mesure/actionneur/id_actionneur
// @desc    Get all the mesure of one actionneur
// @access  Public
router.get('/actionneur/:actionneur_id', (req, res) => {
    Actionneur.findById(req.params.actionneur_id)
    .then(actionneur => {
            PlanAction.find({ actionneur: actionneur })
                .then(data => {
                    res.json(data)                  
                })
                .catch(err =>{
                    res.status(404).send({
                        message: err.message || "No planification found"
                    });
                })
    })
    .catch(err => console.log(err))
});


//@route POST api/id_parcelle/id_capteurs
//@desc save the mesures of one capteurs for a particular parcelle
//@access Public
router.post("/", (req, res) => {
Actionneur.findById(req.body.actionneur_id)
        .then(actionneur =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    const data = new PlanAction({
                        details: req.body.details,
                        date_prochaine: req.body.date_prochaine,
                        attribut_quatre: req.body.attribut_quatre,
                        date_debut: req.body.date_debut,
                        date_fin: req.body.date_fin,
                        date_creation: req.body.date_creation,
                        date_modification: req.body.date_modification,
                        code_createur: req.body.code_createur,
                        statut: req.body.statut,
                        parcelle: parcelle,
                        actionneur: actionneur,
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

router.put("/:id", (req, res) => {
    Actionneur.findById(req.body.actionneur_id)
        .then(actionneur =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    PlanAction.findByIdAndUpdate(req.params.id, {
                        details: req.body.details,
                        date_prochaine: req.body.date_prochaine,
                        attribut_quatre: req.body.attribut_quatre,
                        date_debut: req.body.date_debut,
                        date_fin: req.body.date_fin,
                        date_creation: req.body.date_creation,
                        date_modification: req.body.date_modification,
                        code_createur: req.body.code_createur,
                        statut: req.body.statut,
                        parcelle: parcelle,
                        actionneur: actionneur,
                    }, {new: true})
                    .then(data => {
                        if(!data) {
                            return res.status(404).send({
                                message: "data not found with id " + req.params.id
                            });
                        }
                        res.json(data);
                    })
                    .catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "data not found with id " + req.params.id
                            });                
                        }
                        return res.status(500).send({
                            message: "Error updating data with id " + req.params.id
                        });
                    });
                })
                .catch(err => res.status(404).json({ success: false }));
                
            })
        .catch(err => res.status(404).json({ success: false }));
    
  });

//@route DELETE api/mesures:id
//@desc Delete mesures
//@access Public
router.delete("/:id", (req, res) => {
    PlanAction.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

