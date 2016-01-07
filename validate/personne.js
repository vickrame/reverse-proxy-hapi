'use strict';

var Joi = require('joi');

var schemaEmail = Joi.object(
		{ email : Joi.string().email().required()}
		).options(
			{abortEarly: false}
			);
	
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

module.exports = 
{
	params : {
		email : Joi.string().email().required()
	}
}
;