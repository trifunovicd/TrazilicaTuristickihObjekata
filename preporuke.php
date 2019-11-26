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

if(isset($oPostData->komentar))
{
	$sKomentar = $oPostData->komentar;
}
if(isset($oPostData->id_lokacije))
{
	$sIdLokacije = $oPostData->id_lokacije;
}
if(isset($oPostData->naziv))
{
	$sNaziv = $oPostData->naziv;
}
if(isset($oPostData->mjesto))
{
	$sMjesto = $oPostData->mjesto;
}
if(isset($oPostData->ocjena))
{
	$sOcjena = $oPostData->ocjena;
	if($sOcjena == 'N/A')
	{
		$sOcjena = null;
	}
}
if(isset($oPostData->lat))
{
	$sLat = $oPostData->lat;
}
if(isset($oPostData->lng))
{
	$sLng = $oPostData->lng;
}
if(isset($oPostData->vidljivost))
{
	$sVidljivost = $oPostData->vidljivost;
}
if(isset($oPostData->primatelji))
{
	$oPrimatelji = $oPostData->primatelji;
}
if(isset($oPostData->id_preporuke))
{
	$sIdPreporuke = $oPostData->id_preporuke;
}
if(isset($oPostData->korisnik_id))
{
	$sKorisnikId = $oPostData->korisnik_id;
}


switch($sAction)
{
	case 'dohvati_korisnike':

		$response=[];

		$sQuery="SELECT * FROM korisnici WHERE id != '".$_SESSION['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oKorisnik=new Korisnik(
				$oRow['id'],
				$oRow['ime'],
				$oRow['prezime'],
				$oRow['korisnicko_ime'],
				null,
				$oRow['putanja_slike']
			);

			array_push($response, $oKorisnik);
		}

		echo json_encode($response);
	break;

	case 'preporuci':
		date_default_timezone_set("Europe/Zagreb");
		$sQuery = "INSERT INTO preporuke (preporucitelj_id, komentar, lokacija_id, naziv, mjesto, ocjena, lat, lng, vrijeme) VALUES (:preporucitelj_id, :komentar, :lokacija_id, :naziv, :mjesto, :ocjena, :lat, :lng, :vrijeme)";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
			'preporucitelj_id' => $_SESSION['id'],
			'komentar' => $sKomentar,
			'lokacija_id' => $sIdLokacije,
			'naziv' => $sNaziv,
			'mjesto' =>$sMjesto,
			'ocjena' => $sOcjena,
			'lat' => $sLat,
			'lng' => $sLng,
			'vrijeme' => date('Y-m-d H:i:s')
		);
		$oStatement->execute($oData);

		$last_preporuka_id = $oConnection->lastInsertId();

		$sQuery2 = "INSERT INTO primatelji (preporuka_id, primatelj_id, primljeno) VALUES (:preporuka_id, :primatelj_id, :primljeno)";
		$oStatement2 = $oConnection->prepare($sQuery2);

		foreach ($oPrimatelji as $primatelj_id)
		{
			$oData2 = array(
				'primljeno' => 0,
				'preporuka_id' => $last_preporuka_id,
				'primatelj_id' => $primatelj_id
			);
			$oStatement2->execute($oData2);
		}
	break;

	case 'dohvati_preporucene_lokacije':

		$response=[];

		$sQuery="SELECT preporuke.*, korisnici.ime, korisnici.prezime, korisnici.korisnicko_ime FROM preporuke, primatelji, korisnici WHERE preporuke.id = primatelji.preporuka_id AND preporuke.preporucitelj_id = korisnici.id AND primatelji.primljeno = 0 AND primatelji.primatelj_id = '".$_SESSION['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oPreporuka=new Preporuka(
				$oRow['id'],
				$oRow['preporucitelj_id'],
				$oRow['ime'],
				$oRow['prezime'],
				$oRow['korisnicko_ime'],
				$oRow['komentar'],
				$oRow['lokacija_id'],
				$oRow['naziv'],
				$oRow['mjesto'],
				$oRow['ocjena'],
				$oRow['lat'],
				$oRow['lng'],
				$oRow['vrijeme']
			);

			array_push($response, $oPreporuka);
		}

		echo json_encode($response);
	break;

	case 'spremi_preporucenu_lokaciju':

		$lokacija_postoji = false;

		$sQuery3="SELECT id, id_korisnika FROM moje_lokacije WHERE id_korisnika = '".$_SESSION['id']."'";
		$oRecord3=$oConnection->query($sQuery3);

		while($oRow=$oRecord3->fetch(PDO::FETCH_BOTH))
		{
			if($oRow['id'] == $sIdLokacije)
			{
				$lokacija_postoji = true;
			}

		}

		if($lokacija_postoji == false)
		{
			date_default_timezone_set("Europe/Zagreb");
			$sQuery = "INSERT INTO moje_lokacije (id, id_korisnika, naziv, mjesto, ocjena, lat, lng, vrijeme, vidljivost) VALUES (:id, :id_korisnika, :naziv, :mjesto, :ocjena, :lat, :lng, :vrijeme, :vidljivost)";
			$oStatement = $oConnection->prepare($sQuery);
			$oData = array(
				'id' => $sIdLokacije,
				'id_korisnika' => $_SESSION['id'],
				'naziv' => $sNaziv,
				'mjesto' => $sMjesto,
				'ocjena' => $sOcjena,
				'lat' => $sLat,
				'lng' => $sLng,
				'vrijeme' => date('Y-m-d H:i:s'),
				'vidljivost' => $sVidljivost
			);
			$oStatement->execute($oData);

			$sQuery2 = "UPDATE primatelji SET primljeno=:primljeno WHERE preporuka_id = :preporuka_id AND primatelj_id = :primatelj_id";
			$oStatement2 = $oConnection->prepare($sQuery2);
			$oData2 = array(
			 	'primljeno'=> 1,
				'preporuka_id'=> $sIdPreporuke,
				'primatelj_id'=> $_SESSION['id']
			);	
			$oStatement2->execute($oData2);
		}
		else
		{
			echo 'postoji';
		}
		
	break;

	case 'obrisi_preporuku':
		$sQuery = "UPDATE primatelji SET primljeno=:primljeno WHERE preporuka_id = :preporuka_id AND primatelj_id = :primatelj_id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
			'primljeno'=> 1,
			'preporuka_id'=> $sIdPreporuke,
			'primatelj_id'=> $_SESSION['id']
		);	
		$oStatement->execute($oData);
	break;

	case 'dohvati_poslane_preporuke':

		$response=[];

		$sQuery="SELECT * FROM preporuke WHERE preporuke.preporucitelj_id = '".$_SESSION['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oPreporuka=new Preporuka(
				$oRow['id'],
				null,
				null,
				null,
				null,
				$oRow['komentar'],
				$oRow['lokacija_id'],
				$oRow['naziv'],
				$oRow['mjesto'],
				$oRow['ocjena'],
				$oRow['lat'],
				$oRow['lng'],
				$oRow['vrijeme']
			);
			
			array_push($response, $oPreporuka);
		}

		echo json_encode($response);
	break;

	case 'obrisi_poslanu_preporuku':
		$sQuery = "DELETE FROM preporuke WHERE id = :id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sIdPreporuke
		);	
		$oStatement->execute($oData);
	break;

	case 'uredi_preporuku':
		$sQuery = "UPDATE preporuke SET komentar=:komentar WHERE id=:id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sIdPreporuke,
		 'komentar' => $sKomentar
		);
		$oStatement->execute($oData);

		$sQuery2 = "DELETE FROM primatelji WHERE preporuka_id = :preporuka_id AND primatelj_id = :primatelj_id";
		$oStatement2 = $oConnection->prepare($sQuery2);

		foreach ($oPrimatelji as $primatelj_id)
		{
			$oData2 = array(
			 'preporuka_id'=> $sIdPreporuke,
			 'primatelj_id'=> $primatelj_id
			);	
			$oStatement2->execute($oData2);
		}
	break;

	case 'dohvati_primatelje':

		$response=[];

		$sQuery="SELECT primatelji.*, korisnici.id, korisnici.ime, korisnici.prezime, korisnici.korisnicko_ime, korisnici.putanja_slike FROM primatelji, korisnici WHERE primatelji.primatelj_id = korisnici.id AND primatelji.preporuka_id = '$sIdPreporuke'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oKorisnik=new Korisnik(
				$oRow['id'],
				$oRow['ime'],
				$oRow['prezime'],
				$oRow['korisnicko_ime'],
				null,
				$oRow['putanja_slike']
			);
			
			array_push($response, $oKorisnik);
		}

		echo json_encode($response);
	break;
}

?>