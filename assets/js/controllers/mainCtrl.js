DataVizSport.controller("MainCtrl", ['$routeParams','$scope',
									 '$rootScope','$window','$location',
	function($routeParams, $scope, $rootScope, $window, $location) {

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