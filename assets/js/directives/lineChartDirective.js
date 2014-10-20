DataVizSport.directive('linechart', ['DatasService','$http','$location',
	function (DatasService, $http, $location) {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function (scope, element, $scope) {
				var datas = scope.data;

				console.log(datas);
			}
		}
	}

]);