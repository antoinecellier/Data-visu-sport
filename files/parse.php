<?php

$csv = file_get_contents('datas.csv');

//Mise en place des lignes
$lines = explode("\n", $csv);

if ($lines){

	$colums = array();
	$datas = array();
	foreach ($lines as $key => $line){
		$cells = explode(";", $line);

		if ($key > 0){
			if (sizeof($cells) == 8){

				//En tête
				if ($key==1){
					foreach ($cells as $c => $cell){
						$colums[$c] = trim($cell);
					}
				}
				//Autres
				else {
					$temp = array();
					foreach ($cells as $c => $cell){
						$temp[$colums[$c]] = trim($cell);
					}
					$datas[] = $temp;
				}
			}
		}
	}
}

$return = array();
$return['colums'] = $colums;
$return['datas']  = $datas;

$data_json = json_encode($return, JSON_UNESCAPED_UNICODE);
//echo $data_json;

file_put_contents("datas.json", $data_json);

?>