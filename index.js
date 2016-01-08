'use strict';
/**
* @file index.js
* @description
* Fichier d'initalisation de l'API
*/

var hapi = require('hapi');
var utils = require('./utils.js');
var parser = require('xml2js');
var Fs = require('fs');

var configFile = 	{
	"server": {
		"connection": {
			"host": "rlon6668.spid.log.intra.laposte.fr",
			"port": 3000
		},
		"connectionHttps": {
			"host": "rlon6668.spid.log.intra.laposte.fr",
			"port": 8443
		}
	}
}

var server = new hapi.Server();

server.register({
	register: require('h2o2')
}, function (err) {

if (err) {
	console.log('Failed to load h2o2');
}

});  

// connexion hhtp
server.connection(configFile.server.connection);

// connexion https
server.connection(
	configFile.server.connectionHttps,
	{
		key: Fs.readFileSync('/cca/tools/.ssl/londres-site-de-test.intra.laposte.fr_KEY.pem'), 
		cert: Fs.readFileSync('/cca/tools/.ssl/londres-site-de-test.intra.laposte.fr_CER.pem'),
		ca: Fs.readFileSync('/cca/tools/.ssl/ca_SSL_chain_DSICentrale.pem')
	}
);


// On demande à hapiJS de lancer le serveur
server.start(function() {
});

server.ext('onRequest', function (request, reply) {
	if(request.method == 'post' && (request.headers['content-type'] == 'application/xml' || request.headers['content-type'] == 'text/xml'))
		request.setUrl('/xmlTojson');
	return reply.continue();
});  

// On récupère les fichiers de routage définis dans le dossier ./routes
utils.getFiles('routes').forEach(function(routesFile) {
	console.log("Ajout des routes du fichier %s", routesFile);

	// On boucle sur le tableau de routes présent dans chaque fichier de routage
	require(routesFile).forEach(function(route) {
	  console.log(" +  %s %s", route.method, route.path);
	  // On ajoute chacune des routes à hapiJS
	  server.route(route);
	  
	});


});  

// spécifique
server.route(
{
	method: 'POST',
	path: '/xmlTojson',
	config: {
		handler: function (request, reply) {
			console.log("flux request.payload " + request.payload);
				var optionsParser = {
					explicitArray: false
				}			
			parser.Parser(optionsParser).parseString(request.payload, function (error, result){
				console.log("result " + result.data);
				var options = {
					url: '/create',
					payload: result.data,
					method: 'POST'
				};
				server.inject(options, function (res){
					console.log("json " + res.payload );
					console.log("res.payload.status " + res.payload);
					console.log("res.payload.status " + res.payload);
					if(res.payload == 200){
						console.log("OK");
						reply.redirect('http://www.google.fr');
					}
					else{
						console.log("KO");
						reply("KO");
					}
				});
			});
		},
		payload: {
			output: 'data',
			parse: false,
			allow: 'application/xml'
		}
	}	
}
);

