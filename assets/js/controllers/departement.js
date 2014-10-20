DataVizSport.controller("DepartementCtrl",
						['$routeParams','$interval', '$scope', 
						 '$rootScope', 'DatasService', 'DatasWidgetsService',
	function($routeParams, $interval, $scope, $rootScope, DatasService, DatasWidgetsService) {

		// Classe transition
		$scope.transition = "page-departement";

		$scope.numDep = $routeParams.id;
		$scope.loadingIsDone = false;
		/**
		 * Récupération des données d'un departement
		 */
		DatasService.getDataDep($routeParams.id).then(function(dataCurrentDep){
			$scope.dataDep = dataCurrentDep;
			$scope.loadingIsDone = true;
		});

		/**
		 * Affichage du nombre de licences / département | TODO
		 */
		DatasWidgetsService.getNbLicenceParDepartements($routeParams.id).then(function(NbLicenceDep){
			$scope.incremChiffreLicenceDep(0 , NbLicenceDep);
		});
		$scope.incremChiffreLicenceDep = function(nb , nbLicencesDep) {
			intervalLicenceTot = $interval(function() {
				//Si on arrive bientôt au bout (si le pas est supérieur au nombre total - le nombre courant, on le passe à 1)
				if ( (nbLicencesDep-nb) < parseInt(nbLicencesDep/300) )
					nb += 1;
				else
					nb += parseInt(nbLicencesDep/300);

				$scope.nbLicencesDep = nb;
				if(nb >= nbLicencesDep)
					$interval.cancel(intervalLicenceTot);
			}, 5);
		};


		/**
		 * Récupération du nombre d'équipement pour un departement
		 */
		DatasWidgetsService.getNbEquipementsParDepartement($routeParams.id).then(function(NbEquipementsDep){
			$scope.getEquipementsDep(0 ,NbEquipementsDep);
		});

		$scope.equipementsBind = 0;
		var intervalEquipementDep;
		$scope.getEquipementsDep = function(nb , NbEquipementsDep) {
			intervalEquipementDep = $interval(function() {
				//Si on arrive bientôt au bout (si le pas est supérieur au nombre total - le nombre courant, on le passe à 1)
				if ( (NbEquipementsDep-nb) < 5)
					nb += 1;
				else
					nb += 2;

				$scope.equipementsBind = nb;
				if(nb >= NbEquipementsDep)
					$interval.cancel(intervalEquipementDep);
			}, 200);
		};
}]);