MapDepartement.controller("MapDepartementCtrl",['$scope','DatasService', function($scope, DatasService) {
	
		DatasService.getDepartement().then(function(departements){
			$scope.dataMap = departements;
			$scope.loadingIsDone = true;
		});		



}]);