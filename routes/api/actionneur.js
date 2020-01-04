const express = require('express');
const router = express.Router();

// Item Model
const Actionneur = require('../../models/Actionneur');

// @route   GET api/actionneur
// @desc    Get All actionneur
// @access  Public
router.get('/', (req, res) => {
  Actionneur.find()
    .sort({ name: 1 })
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

// @route   GET api/actionneur
// @desc    Get one actionneur
// @access  Public
router.get('/:id', (req, res) => {
    Actionneur.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Actionneur not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Actionneur not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving actionneur with id " + req.params.id
        });
    });
});

//@route POST api/actionneurs
//@desc Create an actionneur
//@access Public
router.post("/", (req, res) => {
    const newActionneur = new Actionneur({
      name: req.body.name,
      type_grandeur: req.body.type_grandeur,
      description: req.body.description,
      effectif: req.body.effectif,
      code_createur: req.body.code_createur,
      statut: req.body.statut,
    });
    newActionneur.save()
      .then(data => {
        res.json(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Actionneur."
          });
      });
  });

//@route POST api/actionneurs
//@desc Create an actionneur
//@access Public
router.post("/update/:id", (req, res) => {
        Actionneur.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type_grandeur: req.body.type_grandeur,
            description: req.body.description,
            effectif: req.body.effectif,
            code_createur: req.body.code_createur,
            statut: req.body.statut,
        }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Actionneur not found with id " + req.params.id
                });
            }
            res.json(data);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Actionneur not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Actionneur updating data with id " + req.params.id
            });
        });
  });

//@route DELETE api/actionneurs:id
//@desc Delete an actionneur
//@access Public
router.delete("/:id", (req, res) => {
    Actionneur.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

