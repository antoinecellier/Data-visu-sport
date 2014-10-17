var MapDepartement = angular.module('DataVizSport', ['ngRoute']);

MapDepartement.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl: 'views/home.html', controller: 'MapDepartementCtrl'})
	.when('/departements/:id', {templateUrl: 'views/departements.html', controller: 'MapDepartementCtrl'})

	//url qu'il ne connait pas
	.otherwise({redirectTo: '/'});
});