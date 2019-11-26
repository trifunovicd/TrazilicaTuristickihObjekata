<?php
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

if(isset($oPostData->id_korisnika))
{
	$sIdKorisnika = $oPostData->id_korisnika;
}

$Lokacije=array();

$sQuery="SELECT * FROM moje_lokacije WHERE id_korisnika = '$sIdKorisnika' AND vidljivost = 1";
$oRecord=$oConnection->query($sQuery);

while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
{
	$oLokacija=new MojaLokacija(
		$oRow['id'],
		$oRow['id_korisnika'],
		$oRow['naziv'],
		$oRow['mjesto'],
		$oRow['ocjena'],
		$oRow['lat'],
		$oRow['lng'],
		$oRow['vrijeme']
	);

	array_push($Lokacije,$oLokacija);
}

echo json_encode($Lokacije);
?>