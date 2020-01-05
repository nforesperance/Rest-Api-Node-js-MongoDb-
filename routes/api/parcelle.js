const express = require('express');
const router = express.Router();

// Item Model
const Parcelle = require('../../models/Parcelle');
const Espece = require('../../models/Espece');

// @route   GET api/parcelle
// @desc    Get All parcelle
// @access  Public
router.get('/', (req, res) => {
  Parcelle.find()
    .populate('espece')
    .sort({ date_semis: 1 })
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

// @route   GET api/parcelle
// @desc    Get one parcelle
// @access  Public
router.get('/:id', (req, res) => {
    Parcelle.findById(req.params.id)
    .populate('espece')
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Parcelle not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Parcelle not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving parcelle with id " + req.params.id
        });
    });
});

//@route POST api/parcelle
//@desc Create an parcelle
//@access Public
router.post("/", (req, res) => {
    Espece.findById(req.body.espece_is)
        .then(espece =>{
            const data = new Parcelle({
                location: req.body.location,
                nombre_plant:req.body.nombre_plant,
                date_semis: req.body.date_semis,
                indice_crois: req.body.indice_crois,
                indice_perf: req.body.indice_perf,
                date_creation: req.body.date_creation,
                date_modification: req.body.date_modefication,
                code_createur: req.body.code_createur,
                statut: req.body.statut,
                espece:espece
              });
              data.save()
                .then(data => {
                  res.json(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Parcelle."
                    });
                });

        })
        .catch(err =>console.log(err)
        )
  });

//@route POST api/parcelles
//@desc Create an parcelle
//@access Public
router.put("/:id", (req, res) => {
    Espece.findById(req.body.espece_is)
        .then(espece =>{
            Parcelle.findByIdAndUpdate(req.params.id, {
                location: req.body.location,
                nombre_plant:req.body.nombre_plant,
                date_semis: req.body.date_semis,
                indice_crois: req.body.indice_crois,
                indice_perf: req.body.indice_perf,
                date_creation: req.body.date_creation,
                date_modefication: req.body.date_modification,
                code_createur: req.body.code_createur,
                statut: req.body.statut,
                espece:espece
            }, {new: true})
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        message: "Parcelle not found with id " + req.params.id
                    });
                }
                res.json(data);
            })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Parcelle not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating parcelle with id " + req.params.id
                });
            });

        })
        .catch(err =>console.log(err)
        )
  });

//@route DELETE api/parcelle:id
//@desc Delete an parcelle
//@access Public
router.delete("/:id", (req, res) => {
    Parcelle.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

