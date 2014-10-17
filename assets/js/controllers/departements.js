MapDepartement.controller("MapDepartementCtrl",['$interval','$scope','$rootScope',
												'DatasService','DatasWidgetsService', 
						function($interval, $scope, $rootScope, DatasService, DatasWidgetsService) {
		
		
		DatasService.getDepartements().then(function(departements){
			$scope.dataMap = departements;
			$scope.loadingIsDone = true;
		});

		// DatasWidgetsService.getNbDepartements().then(function(nbDepartements){
		// 	incremChiffreDep(0 , nbDepartements);
		// });
		// $rootScope.nbDepartements = 0;
		// incremChiffreDep = function(nb , nbDepartements) {
		//     interval = $interval(function() {
		//      	nb += 1;    
		//      	$rootScope.nbDepartements = nb;
		//      	if(nb >= nbDepartements)
		//     		$interval.cancel(interval);
		//     }, 30); 
		//  };

		// DatasWidgetsService.getNbLicenceParDepartements(10).then(function(NbLicenceParDep){
		// });

		// DatasWidgetsService.getNbLicenceTotal().then(function(NbLicencesTotal){
		// 	incremChiffreLicencieTotal(0 ,NbLicencesTotal);
		// });
		// $rootScope.nbLicenciesTotal = 0;
		// incremChiffreLicencieTotal = function(nb , nbLicenciesTotal) {
		//     intervalLicencieTot = $interval(function() {
		//      	nb += 75;    
		//      	$rootScope.nbLicenciesTotal = nb;
		//      	if(nb > nbLicenciesTotal){
		//     		$interval.cancel(intervalLicencieTot);
		//      	}
		//     }, 5); 
		//  };
		
		

	  
}]);