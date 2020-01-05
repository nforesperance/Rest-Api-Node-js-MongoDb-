const express = require('express');
const router = express.Router();

// Item Model
const Action = require('../../models/Action');
const PlanAction = require('../../models/PlanActionneur');
const Parcelle = require('../../models/Parcelle');


// @route   GET api/action
// @desc    Get all action
// @access  Public
router.get('/', (req, res) => {
    Action.find()
      .populate('planactioneur')
      .populate('parcelle')
      .sort({ date: 1 })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  });
 

// @route   GET api/mesure/id_mesure
// @desc    Get one mesure
// @access  Public
router.get('/:id', (req, res) => {
    Action.findById(req.params.id)
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

// @route   GET api/mesure/all/id_parcelle
// @desc    Get all the mesure of one parcelle
// @access  Public
router.get('/all/:parcelle_id', (req, res) => {
    Parcelle.findById(req.params.parcelle_id)
    .then(parcelle => {
            Action.find({ parcelle: parcelle })
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

//@route POST api/id_parcelle/id_parcelles
//@access Public
router.post("/", (req, res) => {
PlanAction.findById(req.body.planaction_id)
        .then(planactioneur =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    const data = new Action({
                        date: req.body.date,
                        statut:req.body.statut,
                        planactioneur:planactioneur,
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
  router.put("/:id", (req, res) => {
    PlanAction.findById(req.body.actionneur_id)
        .then(planactioneur =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    Action.findByIdAndUpdate(req.params.id, {
                        date: req.body.date,
                        statut:req.body.statut,
                        planactioneur:planactioneur,
                        parcelle:parcelle,
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
    Action.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

