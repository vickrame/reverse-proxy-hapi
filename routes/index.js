'use strict';
var Joi = require('joi');
//var Wreck = require('wreck');
//var parseString = require('xml2js').parseString;
//var Joi = require('joi');
//var validator = require('../validate/personne.js').params;
//console.log(" validate : " + validator);
//console.log(" validate : " + validator.params);
//console.log(" validate : " + require('../validate/personne.js').validatorEmail);

module.exports = [
  {
    method: 'GET',
    path: '/pathParam/{email}',
	config:{
		tags :['API'],
		description: 'l\'api de test pour la metho GET pour le cas des path params',
		validate : {
			params : {
				email : Joi.string().email().required()
			},
			failAction : function (request, reply, source, error){
				console.log("erreur de validation");
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
		reply.redirect('http://www.google.com');
      //reply();      
    }
  }
,
  {
    method: 'GET',
    path: '/pathQuery',
	config:{
		tags :['API'],
		description: 'test de query param',
		validate : {    
			query: {
				nom: Joi.string().min(3).max(30).required(),
				prenom: Joi.string().min(3).max(30).required()
			},
			failAction : function (request, reply, source, error){
				console.log("erreur de validation");
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
		reply.redirect('http://www.google.com');
      //reply();      
    }
  }  
,
{
    method: 'DELETE',
    path: '/pathParam/{email}',
	config:{
		tags :['API'],
		description: 'l\'api de test de la methode HTTP DELETE pour le pathParams',
		validate : {
			params : {
				email : Joi.string().email().required()
			},
			failAction : function (request, reply, source, error){
				console.log("erreur de validation pour l'appel au delete");
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
		reply.redirect('http://www.google.com');
      //reply();      
    }
},
{
    method: 'POST',
    path: '/create',
	config:{
		tags :['API'],
		description: 'creation',
		validate : {
			payload: Joi.object().keys({
				email: Joi.string(),
				password: Joi.string(),
				token: Joi.string()
				}).and('email', 'password').xor('token', 'password')
,
			failAction : function (request, reply, source, error){
				console.log("erreur de validation pour l'appel au post " + request.payload);
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
	   console.log("coucou " + request.payload);	
	   reply(200);      
    }
}
,
{
    method: 'POST',
    path: '/createJson',
	config:{
		tags :['API'],
		description: 'creation',
		validate : {
			payload: Joi.object().keys({
				email: Joi.string().email(),
				password: Joi.string(),
				token: Joi.string()
				}).and('email', 'password').xor('token', 'password')
,
			failAction : function (request, reply, source, error){
				console.log("erreur de validation pour l'appel au post " + request.payload);
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
	   console.log("coucou " + request.payload);	
	   reply.redirect("http://www.google.fr");      
    }
},
{
	method: 'GET',
	path: '/',
	handler: function(request, reply){

		reply.redirect("https://rlon6670-cca.intra.laposte.fr/ipas/ipas.do").header('X-Forwarded-For', 'EXTRANET').header('X-Frontal', 'PFE');
	}
}	
];
