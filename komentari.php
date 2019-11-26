<?php 
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);


if(isset($oPostData->action_id))
{
	$sAction = $oPostData->action_id;
}
else
{
	$sAction = $_GET['action_id'];
}

if(isset($oPostData->place_id))
{
	$sIdLokacije = $oPostData->place_id;
}
if(isset($oPostData->place_lat))
{
	$sLatLokacije = $oPostData->place_lat;
}
if(isset($oPostData->place_lng))
{
	$sLngLokacije = $oPostData->place_lng;
}
if(isset($oPostData->place_naziv))
{
	$sNazivLokacije = $oPostData->place_naziv;
}
if(isset($oPostData->place_mjesto))
{
	$sMjestoLokacije = $oPostData->place_mjesto;
}
if(isset($oPostData->place_ocjena))
{
	$sOcjenaLokacije = $oPostData->place_ocjena;
	if($sOcjenaLokacije == 'N/A')
	{
		$sOcjenaLokacije = null;
	}
}

if(isset($oPostData->id))
{
	$sId = $oPostData->id;
}

if(isset($oPostData->komentar))
{
	$sKomentar = $oPostData->komentar;
}

switch($sAction)
{
	case 'dohvati_komentare':
		$Komentari=array();

		$sQuery="SELECT komentari.*, korisnici.ime, korisnici.prezime, korisnici.korisnicko_ime, korisnici.putanja_slike FROM komentari, korisnici WHERE komentari.id_korisnika = korisnici.id AND komentari.id_lokacije = '$sIdLokacije'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			if($oRow['id_korisnika'] == $_SESSION['id'])
			{
				$podaci= array(
					'id' => $oRow['id'],
					'id_korisnika'=> $oRow['id_korisnika'],
					'id_lokacije' => $oRow['id_lokacije'],
					'komentar' => $oRow['komentar'],
					'ime' => $oRow['ime'],
					'prezime'=> $oRow['prezime'],
					'korisnicko_ime' => $oRow['korisnicko_ime'],
					'putanja_slike' => $oRow['putanja_slike'],
					'vrijeme' => $oRow['vrijeme'],
					'uredi' => 'glyphicon glyphicon-'
				);
			}
			else
			{
				$podaci= array(
					'id' => $oRow['id'],
					'id_korisnika'=> $oRow['id_korisnika'],
					'id_lokacije' => $oRow['id_lokacije'],
					'komentar' => $oRow['komentar'],
					'ime' => $oRow['ime'],
					'prezime'=> $oRow['prezime'],
					'korisnicko_ime' => $oRow['korisnicko_ime'],
					'putanja_slike' => $oRow['putanja_slike'],
					'vrijeme' => $oRow['vrijeme']
				);
			}
			
			array_push($Komentari,$podaci);
		}

		echo json_encode($Komentari);
	break;

	case 'dodaj_komentar':
		date_default_timezone_set("Europe/Zagreb");
		$sQuery = "INSERT INTO komentari (id_korisnika, id_lokacije, naziv, mjesto, ocjena, lat, lng, komentar, vrijeme) VALUES (:id_korisnika, :id_lokacije, :naziv, :mjesto, :ocjena, :lat, :lng, :komentar, :vrijeme)";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
			'id_korisnika' => $_SESSION['id'],
			'id_lokacije' => $sIdLokacije,
			'naziv' => $sNazivLokacije,
			'mjesto' => $sMjestoLokacije,
			'ocjena' => $sOcjenaLokacije,
			'lat' => $sLatLokacije,
			'lng' => $sLngLokacije,
			'komentar' => $sKomentar,
			'vrijeme' => date('Y-m-d H:i:s')
		);
		$oStatement->execute($oData);
	break;

	case 'uredi_komentar':
		$sQuery = "UPDATE komentari SET komentar=:komentar WHERE id=:id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sId,
		 'komentar' => $sKomentar
		);
		$oStatement->execute($oData);
	break;

	case 'obrisi_komentar':
		$sQuery = "DELETE FROM komentari WHERE id=:id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sId
		);	
		$oStatement->execute($oData);
	break;

	case 'dohvati_komentirane_lokacije':
		$Lokacije=array();

		$sQuery="SELECT DISTINCT id_lokacije,naziv,mjesto,ocjena,lat,lng FROM komentari WHERE id_korisnika = '".$_SESSION['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oLokacija=new MojaLokacija(
				$oRow['id_lokacije'],
				null,
				$oRow['naziv'],
				$oRow['mjesto'],
				$oRow['ocjena'],
				$oRow['lat'],
				$oRow['lng']
			);

			array_push($Lokacije,$oLokacija);
		}

		echo json_encode($Lokacije);
	break;

	case 'dohvati_moje_komentare':
		$Komentari=array();

		$sQuery="SELECT id,komentar,vrijeme FROM komentari WHERE id_lokacije = '$sIdLokacije' AND id_korisnika = '".$_SESSION['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$podaci= array(
				'id' => $oRow['id'],
				'komentar' => $oRow['komentar'],
				'vrijeme'=> $oRow['vrijeme']
			);

			array_push($Komentari,$podaci);
		}

		echo json_encode($Komentari);
	break;
}

?>