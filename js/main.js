d3.json('datas.json', draw);
			function draw(data){
				//création de div par département
				d3.selectAll('div#chart')
				.data(data.datas)
				.enter()
				.append('div')
				.attr('class', 'departements');

				//mise en place des données
				d3.selectAll('.departements')
				.append('p')
				.attr('class', 'name')
				.text(function(d){
					return d.departements
				});

				//création de la liste

				data.datas.forEach(function(value, key){
						console.log(value);
						var departement = value.departements;
						var sports = value.sports;
						d3.selectAll('.departements')
						.append('ul')
						.attr('class', departement);
						for(var key in sports){
							d3.selectAll('.'+departement+' > .liste')
							.append('li')
							.attr('class', key)
							.text(function(key, sports){
								return key + " : " + sports[key]
							});
						};
				});


				// //football
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'football')
				// .text(function(d){
				// 	return "Football :" + d.football
				// });

				// //tennis
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'tennis')
				// .text(function(d){
				// 	return "Tennis :" + d.tennis
				// });

				// //combat
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'combat')
				// .text(function(d){
				// 	return "Combat :" + d.combat
				// });

				// //provencal
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'provencal')
				// .text(function(d){
				// 	return "Provençal :" + d.provencal
				// });

				// //basketball
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'basketball')
				// .text(function(d){
				// 	return "Basketball :" + d.basketball
				// });

				// //equitation
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'equitation')
				// .text(function(d){
				// 	return "Équitation :" + d.equitation
				// });

				// //golf
				// d3.selectAll('.departements > .liste')
				// .append('li')
				// .attr('class', 'golf')
				// .text(function(d){
				// 	return "Golf :" + d.golf
				// });
			}
