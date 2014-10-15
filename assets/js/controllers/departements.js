MapDepartement.controller("MapDepartementCtrl",['$scope','DatasService', function($scope, DatasService) {
	
		DatasService.getDepartements().then(function(departements){
			$scope.dataMap = departements;
			$scope.loadingIsDone = true;
		});		
}]);