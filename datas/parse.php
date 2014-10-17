<?php

/**
 * FORME OUTPUT
 * http://jsonformatter.curiousconcept.com/
 */

/*
{
	"datas":
	{
		"01" : {
			"departement":"Ain",
			"id":"01",
			"sports" : {
				"football": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"tennis": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"combat": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"provencal": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"basketball": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"equitation": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				},
				"golf": {
					"nbLicence": "X",
					"nbEquipement": "Y"
				}
			}
		}
	},
	"infos":
	{
		"football": {
			"libelleLicence": "Football",
			"libelleEquipement": "Terrains de grands jeux"
		},
		"tennis": {
			"libelleLicence": "Tennis",
			"libelleEquipement": "Courts de tennis"
		},
		"combat": {
			"libelleLicence": "Judo, jujitsu et disciplines associées",
			"libelleEquipement": "Salles de combat"
		},
		"provencal": {
			"libelleLicence": "Pétanque et jeu provençal",
			"libelleEquipement": "Boulodromes"
		},
		"basketball": {
			"libelleLicence": "Basketball",
			"libelleEquipement": "Salles ou terrains de petits jeux"
		},
		"equitation": {
			"libelleLicence": "Equitation",
			"libelleEquipement": "Carrières et manèges"
		},
		"golf": {
			"libelleLicence": "Golf",
			"libelleEquipement": "Parcours et practices de golf"
		}
	}
}
*/

$return = array();
$infos_trans = array();

$csv = file_get_contents('columns.csv');

//Mise en place des lignes
$lines = explode("\n", $csv);

if ($lines){

	$colums = array();
	$datas = array();
	foreach ($lines as $key => $line){
		$cells = explode(";", $line);

		foreach ($cells as $c => $cell){

			//en tete
			if ($key==0){
				$infos_trans[$c] = trim($cell);
				$return['infos'][trim($cell)] = array();
			}

			//libelle
			else if ($key==1){
				$return['infos'][$infos_trans[$c]]['libelleLicence'] = trim($cell);
			}

			//équipement
			else if ($key==2){
				$return['infos'][$infos_trans[$c]]['libelleEquipement'] = trim($cell);
			}
		}
	}
}

unset($infos_trans);

$data_licences = array();
$data_equipements = array();
$colums = array();

$csv = file_get_contents('licences_2012.csv');
//Mise en place des lignes
$lines = explode("\n", $csv);

if ($lines){

	foreach ($lines as $key => $line){
		$cells = explode(";", $line);

		if ($key > 0){
			if (sizeof($cells) == 9){

				//En tête
				if ($key==1){
					foreach ($cells as $c => $cell){
						$colums[$c] = trim($cell);
					}
				}
				//Autres
				else {
					$temp = array();
					$temp[$colums[0]] = ($cells[0]);
					$temp[$colums[1]] = ($cells[1]);
					for ($i=2; $i < 9; $i++) {
						$temp['sport'][$colums[$i]]['nbLicence'] = trim($cells[$i]);
					}
					$data_licences[''.$cells[0].''] = $temp;
				}
			}
		}
	}
}
$return['datas'] = $data_licences;

$csv = file_get_contents('equipements_2012.csv');
//Mise en place des lignes
$lines = explode("\n", $csv);

if ($lines){

	foreach ($lines as $key => $line){
		$cells = explode(";", $line);

		if ($key > 0){
			if (sizeof($cells) == 9){

				//En tête
				if ($key>1){
					for ($i=2; $i < 9; $i++) {
						$return['datas'][''.$cells[0].'']['sport'][$colums[$i]]['nbEquipement'] = trim(str_replace(',', '.', $cells[$i]));
					}
				}
			}
		}
	}
}

// var_dump($return['datas']['01']);

$data_json = json_encode($return, JSON_UNESCAPED_UNICODE);
// echo $data_json;

file_put_contents("datas.json", $data_json);

?>