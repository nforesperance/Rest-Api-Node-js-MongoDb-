const express = require('express');
const router = express.Router();

// Item Model
const Espece = require('../../models/Espece');

// @route   GET api/admin
// @desc    Get All admin
// @access  Public
router.get('/', (req, res) => {
  Espece.find()
    .sort({ name: 1 })
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

// @route   GET api/admin
// @desc    Get one admin
// @access  Public
router.get('/:id', (req, res) => {
    Espece.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Espece not found with id " + req.params.id
            });            
        }
        res.json(data)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Espece not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving espece with id " + req.params.id
        });
    });
});

//@route POST api/admins
//@desc Create an admin
//@access Public
router.post("/", (req, res) => {
    const data = new Espece({
      name: req.body.name,
      description:req.body.desc,
    });
    data.save()
      .then(data => {
        res.json(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Note."
          });
      });
  });

//@route POST api/admins
//@desc Create an admin
//@access Public
router.post("/update/:id", (req, res) => {
        Espece.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description:req.body.desc,
        }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Espece not found with id " + req.params.id
                });
            }
            res.json(data);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Espece not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating espece with id " + req.params.id
            });
        });
  });

//@route DELETE api/admins:id
//@desc Delete an Admin
//@access Public
router.delete("/:id", (req, res) => {
    Espece.findById(req.params.id)
      .then(data =>
        data
          .remove()
          .then(data => res.json(data))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

