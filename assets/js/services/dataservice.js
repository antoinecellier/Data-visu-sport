MapDepartement.provider("DatasService", function (){
	this.$get = function($http, $q){

		var departements;
		var promiseStart = $q.when('start');
		var departements = promiseStart.then(function(value){
			return	$http.get("datas/departements.json")
					.success(function(data, status){
						geoDep = data;
					});
		});

		var datas = promiseStart.then(function(value){
			return	$http.get("datas/datas_formated.json")
					.success(function(data, status){
						sportDep = data.datas;
					});
		});

		/**
		 * Gestion des données
		 */
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
			getDataDep: function(id) {
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

			/**
			 * Fonction : Récupération du nombre de département
			 */
		 	getNbDepartements : function() {
				var nbDepartements =
				DatasService.getDepartements().then(function(departements){
					return departements.features.length;
				}, function(reason){
					return $q.reject(reason);
				});
				return nbDepartements;
			 },

			/**
			 * Fonction : Affichage du nombre de licences / département | TODO
			 */
			 getNbLicenceParDepartements: function( id ) {
				var nbLicenceParDepartement =
					DatasService.getDataDep(id).then(function(dataDep){
						var nbLicencies = 0;
						angular.forEach(dataDep.sport, function (index){
							nbLicencies += parseInt(index.nbLicence);
						});
						return nbLicencies;
					});
				return nbLicenceParDepartement;
			},

			/**
			 * Fonction : Récupération du nombre d'équipement total
			 */
			getNbLicencesTotal: function() {
				var NbLicenceTotal =
					DatasService.getDatas().then(function(datas){
						var nbLicencesTotal = 0;
						angular.forEach(datas, function (index){
							angular.forEach(index.sport, function (index){
								if(!isNaN(index.nbLicence))
									nbLicencesTotal += parseInt(index.nbLicence);
							});
						});
						return nbLicencesTotal;
					}, function(reason){
						return $q.reject(reason);
					});

				return NbLicenceTotal;
			},


			/**
			 * Fonction : Récupération du nombre d'équipement total
			 */
			getNbEquipementsTotal: function() {
				var NbEquipementTotal =
					DatasService.getDatas().then(function(datas){
						var nbEquipementsTotal = 0;
						angular.forEach(datas, function (index){
							angular.forEach(index.sport, function (index){
								if(parseFloat(index.nbEquipement)>=0){
									nbEquipementsTotal += parseFloat(index.nbEquipement);
								}
							});
						});
						return nbEquipementsTotal;
					}, function(reason){
						return $q.reject(reason);
					});
				return NbEquipementTotal;
			}

		};

		return ManageWidgetData;
	}
});