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
							return value.data.datas;
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
					 },
					 getNbLicenceParDepartements: function( id ) {
						var nbLicenceParDepartement =
							DatasService.getDataDep( id ).then(function(dataDep){
								var nbLicencies = 0;
								angular.forEach(dataDep.sport, function (index){
									nbLicencies += parseInt(index.nbLicence);
								});
								return nbLicencies;
							});
						return nbLicenceParDepartement;
					},
					getNbLicenceTotal: function() {
						var NbLicenceTotal = 
							DatasService.getDatas().then(function(datas){
								var nbLicenciesTotal = 0;
								angular.forEach(datas, function (index){
									angular.forEach(index.sport, function (index){
										if(!isNaN(index.nbLicence))
											nbLicenciesTotal += parseInt(index.nbLicence);
									});
								});
								return nbLicenciesTotal;
							}, function(reason){
								return $q.reject(reason);
							});
						return NbLicenceTotal;
					}// ,
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