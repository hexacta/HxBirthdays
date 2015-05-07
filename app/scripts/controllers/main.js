'use strict';

/**
 * @ngdoc function
 * @name hxBirthdaysApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hxBirthdaysApp
 */
 
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');

// Conexión con la base de datos			
mongoose.connect('mongodb://localhost:27017/HxBirthdays_app');

// Configuración
app.configure(function() {
    // Localización de los ficheros estaticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());                  
}); 

angular.module('hxBirthdaysApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
