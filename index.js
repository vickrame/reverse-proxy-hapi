'use strict';
/**
 * @file index.js
 * @description
 * Fichier d'initalisation de l'API
 */
;(function(log, err, exit, undefined) {

  /**
   * On récupère le fichier package.json
   * On stock l'objet dans une variable `appPackage`
   */
  try {
    var appPackage = require(__dirname + '/package.json');
  } catch (e) {
    // Il se passe quelque chose.. Peut être un problème de permission
    // ou alors il vous manque le fichier package.json (ou celui-ci est malformaté)
    err(e);
    exit();
  }

  /**
   * On parcourt la liste des dépendences nécessaires au
   * bon fonctionnement de l'application et on tente de
   * les récupérer via un `require`.
   * Celles si sont alors stockées en global de sorte à
   * ce que la première lettre de la dépendence soit en majuscule
   * et que si le nom du module contient des caractères non-alpha
   * ceux si sont supprimés.
   */
  try {
    for (var dependency in appPackage.dependencies) {
      global[(dependency[0].toUpperCase() + dependency.substr(1).toLowerCase()).replace(/[\W\d\s_-]+/g, '')] = 
        require(dependency);
    }
  } catch (e) {
    // Il s'est passé quelque chose, peut être un problème de permission
    // ou alors vous avez oublié de faire un `npm install`
    err(e);
    exit();
  }



  var utils = require('./utils.js');
  var server = new Hapi.Server();
  var parser = require('xml2js');
  var simpleConvertXML = require('simpleconvert-XML'),
	DOMParser = require('xmldom').DOMParser;
	
  // On configure HapiJS depuis la configuration définie dans les fichiers de configuration
  // Par défaut, le fichier de configuration défini sera:
  // ./config/default.json
  // Lorsque vous mettrez en production votre projet, il se peut que vous ayez besoin de
  // définir des variables de développement différentes (accès à la base de données, port, etc...)
  // Dans ce cas, il vous faudra définir la variable d'environnement NODE_ENV à production.json
  // Votre fichier ./config/production.json contiendra quant à lui les variables de configuration
  // qui viendront surcharger celles de votre fichier ./config/default.json
  server.connection(Config.get('server.connection'));

  // On demande à HapiJS de lancer le serveur
  server.start(function() {
    // Lorsque le serveur est lancé, on affiche un petit message
    log('%s %s est lancé sur %s', appPackage.name, appPackage.version, server.info.uri);
  });

server.ext('onRequest', function (request, reply) {
    if(request.method == 'post' && (request.headers['content-type'] == 'application/xml' || request.headers['content-type'] == 'text/xml'))
        request.setUrl('/xmlTojson');
    return reply.continue();
});  

  // On récupère les fichiers de routage définis dans le dossier ./routes
  utils.getFiles('routes').forEach(function(routesFile) {
    log("Ajout des routes du fichier %s", routesFile);

    // On boucle sur le tableau de routes présent dans chaque fichier de routage
    require(routesFile).forEach(function(route) {
      log(" +  %s %s", route.method, route.path);
      // On ajoute chacune des routes à HapiJS
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
  
})(console.log, console.error, process.exit);
