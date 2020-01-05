const express = require('express');
const router = express.Router();

// Item Model
const Capteur = require('../../models/Capteur');

// @route   GET api/capteur
// @desc    Get All capteurs
// @access  Public
router.get('/', (req, res) => {
  Capteur.find()
    .sort({ name: 1 })
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

// @route   GET api/capteur
// @desc    Get one capteur
// @access  Public
router.get('/:id', (req, res) => {
    Capteur.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Capteur not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Capteur not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving capteur with id " + req.params.id
        });
    });
});

//@route POST api/capteurs
//@desc Create a capteur
//@access Public
router.post("/", (req, res) => {
    const data = new Capteur({
      name: req.body.name,
      type_grandeur: req.body.type_grandeur,
      description: req.body.description,
      effectif: req.body.effectif,
      date_creation: req.body.date_creation,
      date_modefication: req.body.date_modification,
      code_createur: req.body.code_createur,
      statut: req.body.statut,
    });
    data.save()
      .then(data => {
        res.json(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Capteur."
          });
      });
  });

//@route POST api/capteur
//@desc Create an capteur
//@access Public
router.put("/:id", (req, res) => {
        Capteur.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type_grandeur: req.body.type_grandeur,
            description: req.body.description,
            effectif: req.body.effectif,
            date_creation: req.body.date_creation,
            date_modefication: req.body.date_modification,
            code_createur: req.body.code_createur,
            statut: req.body.statut,
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
    Capteur.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

