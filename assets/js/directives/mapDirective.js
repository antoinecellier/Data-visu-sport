DataVizSport.directive('d3map', ['DatasService','$http','$location',
	function (DatasService, $http, $location) {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function (scope, element, $scope) {
				var width = 800;
				var height = 700;
				var datas = scope.data;

				initTitleDiv();
				/*
				 * On créait un nouvel objet path qui permet de manipuler les données géographiques.
				 */
				var path = d3.geo.path();

				// On définit les propriétés de la projection à utiliser
				var projection = d3.geo.conicConformal() // Lambert-93
								.center([2.454071, 47.279229]) // On centre la carte sur la France
								.scale(4000)
								.translate([width / 2, height / 2]);

				// On assigne la projection au path
				path.projection(projection);

				/*
				 * On créait un nouvel élément svg à la racine de notre div #map, définie plus haut dans le HTML
				 */
				var svg = d3.select(element[0]).append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("id","svgMapDep");

				/*
				 * On créait un groupe SVG qui va accueillir tous nos départements
				 */
				var deps = svg
					.append("g")
					.attr("id", "departements")
					.attr("transform", "translate(0,0)scale(1,1)");;

					// deps
					// .transition()
					// .duration(2000)
					// .attr("transform", "translate(0,0)scale(1,1)");

				/*
				 * On charge les données GeoJSON
				 */
				var loadData =function(datas) {

					/*
					 * On "bind" un élément SVG path pour chaque entrée du tableau features de notre objet geojson
					 */

					//On créait un ColorScale, qui va nous permettre d'assigner plus tard une couleur de fond à chacun de nos départements
					//var colorScale = d3.scale.category20c();

					/*
					 * Pour chaque entrée du tableau feature, on créait un élément SVG path, avec les propriétés suivantes
					 */
					var features = deps
					.selectAll("path")
					.data(datas.features)
					.enter()
					.append("path")
					.attr('class', 'departement')
					.attr('fill','white')
					.attr('stroke','grey')
					.attr('d', path)
					.on('click', countyClickHandler)
					.on('mouseover', function( d ){
						return displayStatDep( d );
					}).on('mouseout', function( d ){
						return removeStatDep( d );
					});
				};

				loadData(datas);

				/*
				 * Fonction qui affichage les stats à la volé pour un département
				 */
				function displayStatDep(d){
					d3.selectAll('.titleSite').remove();
					d3.selectAll('.oneStatDep').remove();

					var dataCurrentDep = getDataDep(d.properties.CODE_DEPT);
					var frameInfoDep = d3.selectAll('.infoCurrentDep');

					var divOneDep = frameInfoDep
						.append('div')
						.attr('class','oneStatDep');

					divOneDep.append('div')
						.attr('class','infoNumCurrentDep')
						.text(function() {
							return "#"+d.properties.CODE_DEPT;
						});

					divOneDep.append('h1')
						.attr('class','infoNomCurrentDep')
						.text(function() {
							return d.properties.NOM_DEPT;
						});

					var divTwoDep = divOneDep.append('div')
						.attr('class','listContent');

					var listIcon = divTwoDep.append('div')
						.attr('class','listIcon');

					listIcon.append('div')
						.attr('class','iconSport icon-football');
					listIcon.append('div')
						.attr('class','iconSport icon-tennis');

					listIcon.append('div')
						.attr('class','iconSport icon-combat');

					listIcon.append('div')
						.attr('class','iconSport icon-petanque');

					listIcon.append('div')
						.attr('class','iconSport icon-basketball');

					listIcon.append('div')
						.attr('class','iconSport icon-horse');

					listIcon.append('div')
						.attr('class','iconSport icon-golf');

					var listNbLicencies = divTwoDep.append('div')
						.attr('class','listNbLicencies');

					for(var sport in dataCurrentDep)
					{
						// console.log(dataCurrentDep[sport]);
						listNbLicencies.append('span')
							.attr('class','chiffre')
							.text(function (){
						 		return dataCurrentDep[sport].nbLicence;
							});
					}

					// SVG chart nbLicence / Sport / Departement
					var svgOneDep = divOneDep.append('svg')
						.attr("width","360")
						.attr("height","300");

					var gOneDep = svgOneDep.append('g');
					var spaceBarX = 15;
					for(var sport in dataCurrentDep)
					{
						//215 max taille possible
						//588 max valeur possible dans les sport
						//TODO : récup le max par département dans l'idéal..

						// console.log(dataCurrentDep[sport]);
						gOneDep.append('rect')
							.attr('class','bar')
							.attr('x', spaceBarX)
							.attr('y', '100')
							.attr('width', '30')
							.attr('height', parseInt(dataCurrentDep[sport].nbLicence) * 215 / 588);

							spaceBarX += 50;
					}

					/**
					divOneDep.append('div')
						.attr('class','infoNbLicenciesCurrentDep')
						.text(function() {
							return 759 - (6 * d.properties.ID_GEOFLA);
						});

					divOneDep.append('div')
						.attr('class','infoLibelleNbLicenciesCurrentDep')
						.text(function() {
							return "licenciés";
						});
					**/
				}

				/*
				 * Fonction qui retire les stats à la volé pour un département
				 */
				function removeStatDep(d) {
					d3.selectAll('.oneStatDep').remove();
					initTitleDiv();
				}

				/*
				 *	Initialise la div "titre du site"
				*/
				function initTitleDiv(){
					var frameInfoDep = d3.selectAll('.infoCurrentDep');

					var titleSite = frameInfoDep
						.append('div')
						.attr('class','titleSite');

					var hightTitle = titleSite
						.append('div')
						.attr('class','hightTitle')
						.text(function(){
							return "INSTALLATIONS & LICENCIES SPORTIFS"
						});

					titleSite.append('div')
						.attr('class','subTitle')
						.text(function(){
							return "en France métropolitaine"
						});
				}

				/*
				 * Fonction qui permet de zoomer sur la carte en cliquant sur les départements Récupéré ici : http://bl.ocks.org/mbostock/2206340
				 */
				var centered;
				function countyClickHandler(d) {
					$location.path('/departement/'+d.properties.CODE_DEPT);
				};

				// Cache la vue pour un departement
				function hideDepData(){
					d3.select('#departementData')
					.style("visibility", "hidden");
				}

				// Affiche la vue pour un departement
				function showDepData(){
					d3.select('#departementData')
					.style("visibility", "visible");
				}

				// Cache la vue de la carte de France
				function hideMap(){
					d3.select('#map')
					.style("visibility", "hidden")
					.style("position", "absolute");
				}

				// Affiche la vue de la carte de France
				function showMap(){
					d3.select('#map')
					.style("visibility", "visible");
				}

				// Affichage d'une vue pour un département
				function initViewOneDepartement( data ){
					var chefLieu = data.properties.NOM_CHF;
					d3.selectAll('div#departementData')
						.append('div')
						.attr('class','oneDepartement '+data.properties.CODE_DEPT);

					d3.selectAll('.oneDepartement')
						.append('h1')
						.text(function(data){
							return " Chef lieu : "+chefLieu;
						});
				}

				// Données d'un département
				function getDataDep(id){
					var dataDep;

					DatasService.getDatas().then(function(sportData){
						$scope.dataSport = sportData;
					});
					angular.forEach($scope.dataSport, function(index){
						if(index.id == id)
							dataDep = index.sport
					});
					return dataDep;
				}
			}
		}
	}

]);