/**
 * @file utils.js
 * @description
 * Collection de fonctions utiles
 */
var getFiles = function(path) {
    if (! global['fs']) {
      global['fs'] = require('fs');
    }
    path = path[path.length-1] !== '/' ? path + '/' : path;
    var files = [];
    try {
      files = fs.readdirSync(__dirname + '/' + path);
    } catch (e) {
      err(e);
      process.exit();
    }
    return files.map(function(file) {
      return __dirname + '/' + path + file;
    });
  };

var xml2jsonData = function(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
  
module.exports = { getFiles : getFiles, xml2jsonData: xml2jsonData};