'use strict';

//Externos
var fs = require('fs');
var params = {};

exports.lectorArchivo= function(){
	var fileData = fs.readFileSync('LDAP/ldap_params.txt', 'utf8');
	var fileLines = fileData.split('\r\n');

	for (var x in fileLines){
		var fileLine = fileLines[x].split('|');
		params[fileLine[0]] = fileLine[1];
	}
};

exports.getURL= function(){
	return params.url;
	};
exports.getUser = function(){
	return params.user;
	};
exports.getPass= function(){
	return params.pass;
	};

exports.getDN= function(){
	return params.dn_bs + ','+ params.dn;
	};

