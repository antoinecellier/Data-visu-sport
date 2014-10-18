var DataVizSport = angular.module('DataVizSport', ['ngRoute']);

DataVizSport.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl: 'views/home.html', controller: 'MapDepartementCtrl'})
	.when('/map', {templateUrl: 'views/map.html', controller: 'MapDepartementCtrl'})
	.when('/departement/:id', {templateUrl: 'views/departement.html', controller: 'DepartementCtrl'})

	//url qu'il ne connait pas
	.otherwise({redirectTo: '/'});
});