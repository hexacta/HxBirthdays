'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Cumpleanio = mongoose.model('Cumpleanio'),
	Usuario = mongoose.model('User'),
	_ = require('lodash');

var listaCumpleanios;

function obtenerCumpleanios(){

	//obtencion de LDAP

	//cumpleaños harcodeados
	listaCumpleanios = [{'id':1,'firstname':'Eduardo','lastname':'Malvino','name':'emalvino','birthday':'1981-02-17T12: 00: 00','collecting':false},
			{'id':2,'firstname':'Jesica','lastname':'Taira','name':'jtaira','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':3,'firstname':'Juan','lastname':'Jaime','name':'jjaime','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':4,'firstname':'Juan','lastname':'Jaime','name':'jjaime','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':5,'firstname':'Nahuel','lastname':'Schlegel','name':'nschlegel','birthday':'1981-02-17T12: 00: 00','collecting':false},
			{'id':6,'firstname':'Matias','lastname':'Rios','name':'matrios','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':7,'firstname':'Oscar','lastname':'Pinto','name':'opinto','birthday':'1981-02-17T12: 00: 00','collecting':false},
			{'id':8,'firstname':'Victor','lastname':'Di Lena','name':'vdilena','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':9,'firstname':'Raul','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':10,'firstname':'Pedro','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':11,'firstname':'Miguel','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':12,'firstname':'Anabella','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':13,'firstname':'Cintia','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':14,'firstname':'Daiana','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':15,'firstname':'Claudia','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':16,'firstname':'Marina','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':17,'firstname':'Franco','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':18,'firstname':'Jorge','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':19,'firstname':'Pablo','lastname':'Morixe','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':20,'firstname':'Carolina','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':21,'firstname':'Jose','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':22,'firstname':'Adriana','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':23,'firstname':'Mauro','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':24,'firstname':'Ramiro','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':25,'firstname':'Daniel','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':26,'firstname':'Ezequiel','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':27,'firstname':'Natalia','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':28,'firstname':'Leonardo','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':29,'firstname':'Agustin','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':30,'firstname':'Melchor','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':31,'firstname':'Gaspar','lastname':'Perez','name':'pmorixe','birthday':'1981-02-17T12: 00: 00','collecting':true},
			{'id':32,'firstname':'Baltazar','lastname':'Wieja','name':'mwieja','birthday':'1981-02-17T12: 00: 00','collecting':true}];

	return listaCumpleanios;
}


/**
 * Create a Cumpleanio
 */
exports.create = function(req, res) {
	var cumpleanio = new Cumpleanio(req.body);
	cumpleanio.user = req.user;

	cumpleanio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * Show the current Cumpleanio
 */
exports.read = function(req, res) {
	res.jsonp(req.cumpleanio);
};

/**
 * Update a Cumpleanio
 */
exports.update = function(req, res) {
	var cumpleanio = req.cumpleanio ;

	cumpleanio = _.extend(cumpleanio , req.body);

	cumpleanio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * Delete an Cumpleanio
 */
exports.delete = function(req, res) {
	var cumpleanio = req.cumpleanio ;

	cumpleanio.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * List of Cumpleanios
 */
exports.list = function(req, res) { 
	Cumpleanio.find().where('name').ne(req.user.username).sort('-birthday').populate('user', 'displayName').exec(function(err, cumpleanios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			var nuevosCumpleanios =  obtenerCumpleanios();
			var cumpleaniosSinUsuarioLogueado = [];

			for(var x in nuevosCumpleanios){
				if(nuevosCumpleanios[x].name !== req.user.username){
					cumpleaniosSinUsuarioLogueado.push(nuevosCumpleanios[x]);
				}
			}

			var cumpleaniosFiltrados = cumpleaniosSinUsuarioLogueado.slice(0,10);

			// Filtro por usuario logueado

			//lista de cumpleaños filtrada
			res.jsonp(cumpleaniosFiltrados);
		}
	});
};

/**
 * Cumpleanio middleware
 */
exports.cumpleanioByID = function(req, res, next, id) { 

	Cumpleanio.findById(id).populate('user', 'displayName').exec(function(err, cumpleanio) {
		if (err) return next(err);
		if (! cumpleanio) return next(new Error('Failed to load Cumpleanio ' + id));
		req.cumpleanio = cumpleanio ;
		next();
	});
};

/**
 * Cumpleanio authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cumpleanio.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


/*
* Lista de cumplaños para los que no se esta juntando
*/
exports.cumpleanierosParaLosQueNoJuntan = function(req,res){

	var nuevosCumpleanios =  obtenerCumpleanios();

	var cumpleaniosParaLosQueNoSeJuntaActualmente = [];

	for(var x in nuevosCumpleanios){
		if(nuevosCumpleanios[x].collecting === false){
			cumpleaniosParaLosQueNoSeJuntaActualmente.push(nuevosCumpleanios[x]);
		}
	}

	res.jsonp(cumpleaniosParaLosQueNoSeJuntaActualmente);

};

exports.postularseParaJuntar = function(req,res,id){

	var nuevosCumpleanios =  obtenerCumpleanios();

	for(var x in nuevosCumpleanios){
		if(nuevosCumpleanios[x].id === id){
			nuevosCumpleanios[x].collecting = true;
		}
	}
	cumpleaniosParaLosQueNoSeJuntaActualmente.splice();

}