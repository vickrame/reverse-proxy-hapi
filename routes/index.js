'use strict';
var Joi = require('joi');
var personneValidator = require('../validate/personne.js');

module.exports = [
  {
    method: 'GET',
    path: '/personnes/{email}',
	config:{
		tags :['API'],
		description: 'retourne le detail d\' personne à partir de son email',
		validate : {
			params : personneValidator.schemaEmail,
			failAction : function (request, reply, source, error){
				console.log("erreur de validation");
				reply('KO');
			}
		}
	},
    handler: function(request, reply) {
		reply.redirect('http://www.google.com'); 
    }
  }
,
  {
    method: 'GET',
    path: '/personnes',
	config:{
		tags :['API'],
		description: 'retourne le detail d\' personne à partir de son nom et prenom',
		validate : {    
			query: personneValidator.schemaNomPrenom,
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
    path: '/personnes/{email}',
	config:{
		tags :['API'],
		description: 'suppression de la ressources personnes en fonction de son email',
		validate : {
			params : personneValidator.schemaEmail,
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
    path: '/personnes',
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
	handler : {
		proxy: {
			passThrough: true,
			xforward: true,
            mapUri: function (request, callback) {
			console.log('connexion nouvelle pour ipas');
				callback(null, 'https://rlon6670-cca.intra.laposte.fr/',
				 {
				'X-Forwarded-For': 'EXTRANET',
				'X-Frontal': 'PFE',
				'Host' :'rlon6670-cca.intra.laposte.fr',			
				'Referrer' :'rlon6668.spid.log.intra.laposte.fr/',	
				'X-Forwarded-Host' :'rlon6668.spid.log.intra.laposte.fr',
				'X-Forwarded-Proto' : 'https'				
				}
				);
            }
		}
	}
}	
];
