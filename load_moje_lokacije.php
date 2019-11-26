<?php 
session_start();
include "connection.php";

$oJson=array();

$sQuery="SELECT * FROM moje_lokacije WHERE id_korisnika = '".$_SESSION['id']."'";
$oRecord=$oConnection->query($sQuery);

while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
{
	if($oRow['vidljivost'] == 0)
	{
		$oLokacija=new MojaLokacija(
			$oRow['id'],
			$oRow['id_korisnika'],
			$oRow['naziv'],
			$oRow['mjesto'],
			$oRow['ocjena'],
			$oRow['lat'],
			$oRow['lng'],
			$oRow['vrijeme'],
			'close'
		);
	}
	else
	{
		$oLokacija=new MojaLokacija(
			$oRow['id'],
			$oRow['id_korisnika'],
			$oRow['naziv'],
			$oRow['mjesto'],
			$oRow['ocjena'],
			$oRow['lat'],
			$oRow['lng'],
			$oRow['vrijeme'],
			'open'
		);
	}
	
	array_push($oJson,$oLokacija);
}
echo json_encode($oJson);

?>
