const express = require('express');
const router = express.Router();

// Item Model
const Admin = require('../../models/Admin');

// @route   GET api/admin
// @desc    Get All admin
// @access  Public
router.get('/', (req, res) => {
  Admin.find()
    .sort({ name: 1 })
    .then(admins => res.json(admins))
    .catch(err => console.log(err));
});

// @route   GET api/admin
// @desc    Get one admin
// @access  Public
router.get('/:id', (req, res) => {
    Admin.findById(req.params.id)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.id
            });            
        }
        res.json(admin)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.id
        });
    });
});

//@route POST api/admins
//@desc Create an admin
//@access Public
router.post("/", (req, res) => {
    const newAdmin = new Admin({
      name: req.body.name,
      addresse:req.body.addr,
    });
    newAdmin.save()
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
        Admin.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            addresse: req.body.addr
        }, {new: true})
        .then(admin => {
            if(!admin) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.json(admin);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating admin with id " + req.params.id
            });
        });
  });

//@route DELETE api/admins:id
//@desc Delete an Admin
//@access Public
router.delete("/:id", (req, res) => {
    Admin.findById(req.params.id)
      .then(admin =>
        admin
          .remove()
          .then(admin => res.json(admin))
          .catch(err => res.json({ success: false }))
      )
      .catch(err => res.status(404).json({ success: false }));
  });
module.exports = router;

