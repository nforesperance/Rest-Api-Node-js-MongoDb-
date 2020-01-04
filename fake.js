
const Capteur=require('../API REST/models/Capteur');
const faker = require('mongoose-faker');
const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');

const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
let genderValues = ['Male', 'Female'];
// Creata a document and save it to the db


const url = require("./config/keys").mongoURI;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then()
  .catch(err => console.log(err));






capteur1=new Capteur();
capteur1.name="Capteur de Niveau d'eau K123";
capteur1.type_grandeur="volume";
capteur1.save(function (err, book) {
    if (err) return console.error(err);
   
  }); ;