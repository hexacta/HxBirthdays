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

	//cumpleaños mockeados
	listaCumpleanios = [{'id':1,'firstname':'Eduardo','lastname':'Malvino','name':'emalvino','birthday':new Date(new Date('1981/02/25')),'collecting':false},
			{'id':2,'firstname':'Jesica','lastname':'Taira','name':'jtaira','birthday':new Date('1981/03/21'),'collecting':true},
			{'id':3,'firstname':'Juan','lastname':'Jaime','name':'jjaime','birthday':new Date('1981/05/16'),'collecting':true},
			{'id':4,'firstname':'Juan','lastname':'Jaime','name':'jjaime','birthday':new Date('1981/01/07'),'collecting':true},
			{'id':5,'firstname':'Nahuel','lastname':'Schlegel','name':'nschlegel','birthday':new Date('1981/08/09'),'collecting':false},
			{'id':6,'firstname':'Matias','lastname':'Rios','name':'matrios','birthday':new Date('1981/09/10'),'collecting':true},
			{'id':7,'firstname':'Oscar','lastname':'Pinto','name':'opinto','birthday':new Date('1981/10/01'),'collecting':false},
			{'id':8,'firstname':'Victor','lastname':'Di Lena','name':'vdilena','birthday':new Date('1981/02/25'),'collecting':true},
			{'id':9,'firstname':'Raul','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/06/15'),'collecting':true},
			{'id':10,'firstname':'Pedro','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/12/05'),'collecting':true},
			{'id':11,'firstname':'Miguel','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/11/28'),'collecting':true},
			{'id':12,'firstname':'Anabella','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/02/04'),'collecting':true},
			{'id':13,'firstname':'Cintia','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/01/03'),'collecting':true},
			{'id':14,'firstname':'Daiana','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/01/27'),'collecting':true},
			{'id':15,'firstname':'Claudia','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/05/25'),'collecting':true},
			{'id':16,'firstname':'Marina','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/05/24'),'collecting':true},
			{'id':17,'firstname':'Franco','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/09/11'),'collecting':true},
			{'id':18,'firstname':'Jorge','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/07/08'),'collecting':true},
			{'id':19,'firstname':'Pablo','lastname':'Morixe','name':'pmorixe','birthday':new Date('1981/03/12'),'collecting':true},
			{'id':20,'firstname':'Carolina','lastname':'Perez','name':'pmorixe','birthday':new Date('1981/09/19'),'collecting':true}];

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

	//Vacion la lista de cumpleaños
	//Cumpleanio.remove().exec();
	// Cumpleanio.find().where('name').ne(req.user.username).sort('-birthday').populate('user', 'displayName').exec(function(err, cumpleanios) {

	Cumpleanio.find().sort('-birthday').populate('user', 'displayName').exec(function(err, cumpleanios) {

		if(cumpleanios.length === 0){

			//cargo la lista de cumpleaños
			var nuevaListaCumpleanios = obtenerCumpleanios();

			for(var x in nuevaListaCumpleanios){

				var cumpleanio = new Cumpleanio(nuevaListaCumpleanios[x]);
				cumpleanio.user = req.user;

				cumpleanio.save();
				cumpleanios.push(cumpleanio);
			}
		}

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanios);
		}
	});
};

/**
 * Cumpleanio middleware
 */
exports.cumpleanioByID = function(req, res, next, id) { 

	Cumpleanio.findOne().where('id').equals(id).exec(function(err, cumpleanio) {
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

	Cumpleanio.find({ $and: [{collecting: {$eq:false}},{name: {$ne:req.user.username}}]}).sort('-birthday').exec(function(err, cumpleanios) {

		res.jsonp(cumpleanios);
		
	});

};

exports.postularseParaJuntar = function(req,res){

	var cumpleanio = req.cumpleanio ;

	cumpleanio = _.extend(cumpleanio , req.body);
	cumpleanio.collecting = true;

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