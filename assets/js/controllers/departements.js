MapDepartement.controller("MapDepartementCtrl",['$interval','$scope','$rootScope',
												'DatasService','DatasWidgetsService', 
						function($interval, $scope, $rootScope, DatasService, DatasWidgetsService) {
		

		DatasService.getDepartements().then(function(departements){
			$scope.dataMap = departements;
			$scope.loadingIsDone = true;
		});

		DatasWidgetsService.getNbDepartements().then(function(nbDepartements){
			incremChiffreDep(0 , nbDepartements);
		});

		// $rootScope.nbDepartements = 0;
		// var incremChiffreDep = function ( nb, nbDepartements){
		// 	if(nb < nbDepartements){
		// 		nb += 1;
		// 		console.log(nb);
		// 		$rootScope.nbDepartements = nb;
		// 		$scope.$apply();
		// 		$interval(incremChiffreDep(nb, nbDepartements),10000);
		// 	}
		// };
		
		$rootScope.nbDepartements = 0;


	incremChiffreDep = function(nb , nbDepartements) {
	    interval = $interval(function() {
	     	nb += 1;    
	     	$rootScope.nbDepartements = nb;
	     	if(nb >= nbDepartements)
	    		$interval.cancel(interval);
	    }, 30);
	    
	  };
	  
}]);