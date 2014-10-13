MapDepartement.provider("DatasService", function (){
			this.$get = function($http, $q){

				var projets;
				var promiseStart = $q.when('start');
				var departements = promiseStart.then(function(value){
					return 	$http.get("data/departements.json")
							.success(function(data, status){
								projets = data;
							});
				});

				var datas = promiseStart.then(function(value){
					return 	$http.get("data/datas.json")
							.success(function(data, status){
								projets = data;
							});
				});


				var ManageData = {
					getDepartement : function() {
						var promiseEnd = departements.then(function(value){
							return projets;
						}, function(reason){
							return $q.reject(reason);
						});

						return promiseEnd;
					},
					getDatas: function() {
						var promiseEnd = datas.then(function(value){
							return projets;
						}, function(reason){
							return $q.reject(reason);
						});

						return promiseEnd;
					}
				};

				return ManageData;
			}
		});