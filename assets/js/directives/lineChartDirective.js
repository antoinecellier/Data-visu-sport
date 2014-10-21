DataVizSport.directive('linechart', ['DatasService','$http','$location',
	function (DatasService, $http, $location) {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function (scope, element, $scope) {
				var datas = scope.data;
				// console.log(datas);

				// Mise en variable des données
				var width = 380,
					height = 380,
					radius = Math.min(width, height) / 2;
					radiusImage = Math.min(width, height) / 2;

				var color = d3.scale.category20();

				// retourner des parts égales
				var pie = d3.layout.pie()
					.value(function(d) { return d.sport })
					.sort(null);

				// retourner l'arc
				var arc = d3.svg.arc()
					.innerRadius(radius - 80)
					.outerRadius(radius);

				var arcImage = d3.svg.arc()
					.innerRadius(radiusImage - 80)
					.outerRadius(radiusImage);

				// var arcBorder = d3.svg.arc()
				// 	.innerRadius(radius)
				// 	.outerRadius(radius + 10);

				var svg = d3.select(element[0])
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("class", "graphDep")
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

				/**
				 * Génération du rectangle pour mettre les données
				 */
				var restData = svg.append("g")
				.attr("class", "rectZone");

				restData.append("rect")
				.attr("transform", function(d) { return "translate(-" + width/3 + ", -" + height/3 +")"; })
				.attr("fill", "white")
				.attr("width", width/1.5 + "px")
				.attr("height", height/1.5 + "px")
				.attr("class", function(d) { return "rectData"; });

				/**
				 * Création d'un objet pour matcher aux données attendues
				 */
				var var_graph = [];
				angular.forEach(datas.sport, function(value, key){
					temp = { "sport": 100, "classe": key}
					var_graph.push(temp);
				});

				/**
				 * Mise en place du graph
				 */
				var path = svg.datum(var_graph).selectAll("path")
					.data(pie)
					.enter().append("g")
					.attr("class", "arc");

				// arc, class et espacement
				path.append("path")
					.attr("fill", "black")
					.attr("d", arc)

					.attr("class", function(d) { return "path " + d.data.classe; })

					.style('stroke', 'white')
					.style('stroke-width', 1)

					//survol
					.on('mouseover', function(d){
						showSurvol(datas, d);
					}).on('mouseout', function(d){
						hideSurvol(datas, d);
					});

				// texte
				// path.append("text")
				// 	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				// 	.attr("fill", "white")
				// 	.style("text-anchor", "middle")
				// 	.style("color", "white")
				// 	.text(function(d) { return d.data.classe; });

				// images
				path.append("image")
					// translation - taille de l'image /2
					.attr("transform", function(d) { var translation = arcImage.centroid(d); return "translate(" + (translation[0]-14) + "," + (translation[1]-14) + ")"; })
					.attr("width", "28px")
					.attr("height", "28px")
					.attr("class", function(d) { return "pathtext text-"+d.data.classe; })
					.attr("alt", (function(d) { return d.data.classe; }))
					.attr("xlink:href", (function(d) { return 'assets/sass/img/icon/w-' + d.data.classe + '.png'; }))

					//survol
					.on('mouseover', function(d){
						showSurvol(datas, d);
					}).on('mouseout', function(d){
						hideSurvol(datas, d);
					});

					showSurvol = function(dataOb, d){
						//modifie les arcs
						path.selectAll("." + d.data.classe)
							.attr("fill", "white")
							.style("stroke", "black")
							.style('stroke-width', 0.5);

						//modifie les images
						path.selectAll(".text-" + d.data.classe).attr("xlink:href", (function(d) { return 'assets/sass/img/icon/' + d.data.classe + '.png'; }));

						//modifie le rectangle de tata
						restData.selectAll(".rectData").attr("fill", "#FFFBDF");

						var textrestData = restData.append("text")
							.attr("class", "rectText")
							.style("text-anchor", "middle")
							.style("color", "black")
							.style("font-size", "22px");

						textrestData.
							append("tspan")
							.attr('x', 0)
  							.attr('dy', -35)
							.text("Licenciés : " + datas.sport[d.data.classe].nbLicence);

						textrestData
							.append("tspan")
							.attr('x', 0)
  							.attr('dy', 25)
							.text("Équipements : " + datas.sport[d.data.classe].nbEquipement );

						textrestData
							.append("tspan")
							.attr('x', 0)
  							.attr('dy', 40)
							.text(parseFloat(parseFloat(datas.sport[d.data.classe].nbEquipement)/datas.sport[d.data.classe].nbLicence).toFixed(2) + " par personne" );

						textrestData
							.append("tspan")
							.attr('x', 0)
  							.attr('dy', 50)
  							.style("font-size", "13px")
							.text("x 10 000");
					};

					hideSurvol = function(dataOb, d){
						//modifie les arcs
						path.selectAll("." + d.data.classe)
							.attr("fill", "black")
							.style("stroke", "white");

						//modifie les images
						path.selectAll(".text-" + d.data.classe).attr("xlink:href", (function(d) { return 'assets/sass/img/icon/w-' + d.data.classe + '.png'; }));

						//modifie le rectangle de tata
						restData.selectAll(".rectData").attr("fill", "white");
						restData.selectAll(".rectText").remove();
					}
			}

		}
	}

]);