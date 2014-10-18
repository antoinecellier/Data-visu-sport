DataVizSport.controller("MainCtrl", ['$routeParams','$scope',
									 '$rootScope','$window','$location',
	function($routeParams, $scope, $rootScope, $window, $location) {

	$scope.back = function (){
 		$window.history.back();
	};

	$scope.next = function (){

	};

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);