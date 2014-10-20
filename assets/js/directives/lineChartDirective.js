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
				var width = 500,
					height = 500,
					radius = Math.min(width, height) / 2;
					radiusImage = Math.min(width, height) / 2;

				var color = d3.scale.category20();

				// retourner des parts égales
				var pie = d3.layout.pie()
					.value(function(d) { return d.sport })
					.sort(null);

				// retourner l'arc
				var arc = d3.svg.arc()
					.innerRadius(radius - 150)
					.outerRadius(radius);

				var arcImage = d3.svg.arc()
					.innerRadius(radiusImage - 150)
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

				// création d'un objet pour matcher aux données attendues
				var var_graph = [];
				angular.forEach(datas.sport, function(value, key){
					temp = { "sport": 100, "classe": key}
					var_graph.push(temp);
				});

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
						//modifie les arcs
						path.selectAll("." + d.data.classe).attr("fill", "white");
						path.selectAll("." + d.data.classe).style("stroke", "black").style('stroke-width', 0.5);

						//modifie les images
						path.selectAll(".text-" + d.data.classe).attr("xlink:href", (function(d) { return 'assets/sass/img/icon/' + d.data.classe + '.png'; }));
					}).on('mouseout', function(d){
						//modifie les arcs
						path.selectAll("." + d.data.classe).attr("fill", "black");
						path.selectAll("." + d.data.classe).style("stroke", "white");

						//modifie les images
						path.selectAll(".text-" + d.data.classe).attr("xlink:href", (function(d) { return 'assets/sass/img/icon/w-' + d.data.classe + '.png'; }));
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
					.attr("class", function(d) { return "text-"+d.data.classe; })
					.attr("alt", (function(d) { return d.data.classe; }))
					.attr("xlink:href", (function(d) { return 'assets/sass/img/icon/w-' + d.data.classe + '.png'; }));
			}

		}
	}

]);