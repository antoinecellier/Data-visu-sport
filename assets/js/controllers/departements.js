DataVizSport.controller("MapDepartementCtrl",['$interval', '$scope', '$rootScope', 'DatasService', 'DatasWidgetsService',
	function($interval, $scope, $rootScope, DatasService, DatasWidgetsService) {

		/**
		 * Récupération des départements
		 */
		DatasService.getDepartements().then(function(departements){
			$scope.dataMap = departements;
			$scope.loadingIsDone = true;
		});

		/**
		 * Récupération du nombre de département
		 */
		DatasWidgetsService.getNbDepartements().then(function(NbDepartements){
			$scope.incremChiffreDep(0 , NbDepartements);
		});

		$rootScope.nbDepartements = 0;
		var intervalDepartement;
		$scope.incremChiffreDep = function(nb , nbDepartements) {
			intervalDepartement = $interval(function() {
				nb += 1;
				$rootScope.nbDepartements = nb;
				if(nb >= nbDepartements){
					$interval.cancel(intervalDepartement);
 				}
			}, 20);
		};


		/**
		 * Affichage du nombre de licences / département | TODO
		 */
		DatasWidgetsService.getNbLicenceParDepartements(10).then(function(NbLicenceParDepartement){
			// console.log(NbLicenceParDepartement);
		});
		// getNbLicenceParDepartement = function(){

		// }


		/**
		 * Récupération du nombre d'équipement total
		 */
		DatasWidgetsService.getNbLicencesTotal().then(function(NbLicencesTotal){
			$scope.incremChiffreLicenceTotal(0 ,NbLicencesTotal);
		});

		$rootScope.nbLicencesTotal = 0;
		var intervalLicenceTot;
		$scope.incremChiffreLicenceTotal = function(nb , nbLicencesTotal) {
			intervalLicenceTot = $interval(function() {
				//Si on arrive bientôt au bout (si le pas est supérieur au nombre total - le nombre courant, on le passe à 1)
				if ( (nbLicencesTotal-nb) < parseInt(nbLicencesTotal/300) )
					nb += 1;
				else
					nb += parseInt(nbLicencesTotal/300);

				$rootScope.nbLicencesTotal = nb;
				if(nb >= nbLicencesTotal)
					$interval.cancel(intervalLicenceTot);
			}, 5);
		};

		/**
		 * Récupération du nombre d'équipement total
		 */
		DatasWidgetsService.getNbEquipementsTotal().then(function(NbEquipementsTotal){
			$scope.incremChiffreEquiementTotal(0 ,NbEquipementsTotal);
		});

		$rootScope.nbEquipementsTotal = 0;
		var intervalEquipementTot;
		$scope.incremChiffreEquiementTotal = function(nb , nbEquipementsTotal) {
			intervalEquipementTot = $interval(function() {
				//Si on arrive bientôt au bout (si le pas est supérieur au nombre total - le nombre courant, on le passe à 1)
				if ( (nbEquipementsTotal-nb) < 5)
					nb += 1;
				else
					nb += 5;

				$rootScope.nbEquipementsTotal = nb;
				if(nb >= nbEquipementsTotal)
					$interval.cancel(intervalEquipementTot);
			}, 5);
		};
}]);