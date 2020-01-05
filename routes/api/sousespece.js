const express = require('express');
const router = express.Router();

// Item Model
const SousEspece = require('../../models/SousEspece');
const Espece = require('../../models/Espece');
const Parcelle = require('../../models/Parcelle');


// @route   GET api/mesures
// @desc    Get all mesures
// @access  Public
router.get('/', (req, res) => {
    SousEspece.find()
      .populate('espece')
      .populate('parcelle')
      .sort({ ate_creation: 1 })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  });

// @route   GET api/mesure/id_mesure
// @desc    Get one mesure
// @access  Public
router.get('/:id', (req, res) => {
    SousEspece.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "data not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "data not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving data with id " + req.params.id
        });
    });
});

//@route POST api/id_parcelle/id_capteurs
//@desc save the mesures of one capteurs for a particular parcelle
//@access Public
router.post("/", (req, res) => {
Espece.findById(req.body.espece_id)
        .then(espece =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    const data = new SousEspece({
                        name: req.body.name,
                        description: req.body.description,
                        date_creation: req.body.date_creation,
                        date_modification: req.body.date_modification,
                        code_createur: req.body.code_createur,
                        statut: req.body.statut,
                        parcelle: parcelle,
                        espece: espece,
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
    Espece.findById(req.body.espece_id)
        .then(espece =>{
            Parcelle.findById(req.body.parcelle_id)
                .then(parcelle => {
                    SousEspece.findByIdAndUpdate(req.params.id, {
                        dname: req.body.name,
                        description: req.body.description,
                        date_creation: req.body.date_creation,
                        date_modification: req.body.date_modification,
                        code_createur: req.body.code_createur,
                        statut: req.body.statut,
                        parcelle: parcelle,
                        espece: espece,
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
    SousEspece.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

