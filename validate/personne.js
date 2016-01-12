'use strict';

var Joi = require('joi');

var schemaEmail = { email : Joi.string().email().required() };
	
var schemaPostMessage = {
	nom : Joi.string().min(3).max(30).required(),
	prenom : Joi.string().min(3).max(30).required(),
	email : Joi.string().email().required()
};

function validEmail(){
  //var config = config || {};
  var err = Joi.validate(email, schemaEmail, config);
  console.log(err ? err : 'Valid!');

}

module.exports = {schemaEmail: schemaEmail};