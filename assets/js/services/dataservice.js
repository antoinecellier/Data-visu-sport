MapDepartement.provider("DatasService", function (){
			this.$get = function($http, $q){

				var departements;
				var promiseStart = $q.when('start');
				var departements = promiseStart.then(function(value){
					return 	$http.get("data/departements.json")
							.success(function(data, status){
								geoDep = data;
							});
				});

				var datas = promiseStart.then(function(value){
					return 	$http.get("data/datas.json")
							.success(function(data, status){
								sportDep = data.datas;
							});
				});


				var ManageData = {
					getDepartements : function() {
						var promiseEnd = departements.then(function(geoDep){
							return geoDep.data;
						}, function(reason){
							return $q.reject(reason);
						});
						return promiseEnd;
					},
					getGeoDep: function( id ) {
						var geoDepartement = 
							ManageData.getDepartements().then(function(geoDep){
								angular.forEach(geoDep.features, function(index) {
								  if(index.properties.CODE_DEPT == id){
								   	departement = index;
								  }
								});
								return departement;
							});
						return geoDepartement;
					},
					getDatas: function() {
						var promiseEnd = datas.then(function(value){
							return value;
						}, function(reason){
							return $q.reject(reason);
						});

						return promiseEnd;
					},
					getDataDep: function( id ) {
						var departement = 
							ManageData.getDatas().then(function(sportDep){
								angular.forEach(sportDep, function(index) {
								  if(index.id == id){
								  	departement = index;
								  }
								});
								return departement;
							});
						return departement;
					}
				};

				return ManageData;
			}
		});

MapDepartement.provider("DatasWidgetsService", function (){
			this.$get = function($http, $q, DatasService){


				var ManageWidgetData = {
					getNbDepartements : function() {
						var nbDepartements = 
						DatasService.getDepartements().then(function(departements){
							return departements.features.length;
						}, function(reason){
							return $q.reject(reason);
						});
						return nbDepartements;
					 }//,
					// getNbInstallation: function( id ) {
					// 	var geoDepartement = 
					// 		ManageData.getDepartements().then(function(geoDep){
					// 			angular.forEach(geoDep.features, function(index) {
					// 			  if(index.properties.CODE_DEPT == id){
					// 			   	departement = index;
					// 			  }
					// 			});
					// 			return departement;
					// 		});
					// 	return geoDepartement;
					// },
					// getNbLicencies: function() {
					// 	var promiseEnd = datas.then(function(value){
					// 		return value;
					// 	}, function(reason){
					// 		return $q.reject(reason);
					// 	});

					// 	return promiseEnd;
					// }
				};

				return ManageWidgetData;
			}
		});