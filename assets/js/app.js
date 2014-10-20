var DataVizSport = angular.module('DataVizSport', ['ngRoute','ngAnimate']);

DataVizSport.config(function($routeProvider){
	$routeProvider
	.when('/', {templateUrl: 'views/home.html', controller: 'MainCtrl'})
	.when('/map', {templateUrl: 'views/map.html', controller: 'MapDepartementCtrl'})
	.when('/departement/:id', {templateUrl: 'views/departement.html', controller: 'DepartementCtrl'})

	//url qu'il ne connait pas
	.otherwise({redirectTo: '/'});
});