DataVizSport.controller("MainCtrl", ['$routeParams','$scope',
									 '$rootScope','$window','$location','$route',
	function($routeParams, $scope, $rootScope, $window, $location, $route) {


	// Classe transition
	$scope.transition = "page-home";

	$scope.back = function (){
 		$window.history.back();
	};

	$scope.showInfo = function (){
        $scope.styleInfo = {'visibility' : 'visible'};
	};

    $scope.closeInfo = function (){
        $scope.styleInfo = {'visibility' : 'hidden'};
    };

}]);