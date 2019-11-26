<?php 
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

if(isset($oPostData->action_id))
{
	$sActionID=$oPostData->action_id;
}

if(isset($oPostData->id))
{
	$sId=$oPostData->id;
}

if(isset($oPostData->id_korisnika))
{
	$sIdKorisnika=$oPostData->id_korisnika;
}

if(isset($oPostData->naziv))
{
	$sNaziv=$oPostData->naziv;
}

if(isset($oPostData->mjesto))
{
	$sMjesto=$oPostData->mjesto;
}

if(isset($oPostData->ocjena))
{
	$sOcjena=$oPostData->ocjena;
	if($sOcjena == 'N/A')
	{
		$sOcjena = null;
	}
}

if(isset($oPostData->lat))
{
	$sLat=$oPostData->lat;
}

if(isset($oPostData->lng))
{
	$sLng=$oPostData->lng;
}

if(isset($oPostData->vidljivost))
{
	$sVidljivost=$oPostData->vidljivost;
}

switch ($sActionID) 
{
	case 'new_location':

		$lokacija_postoji = false;

		$sQuery2="SELECT id, id_korisnika FROM moje_lokacije WHERE id_korisnika = '".$_SESSION['id']."'";
		$oRecord2=$oConnection->query($sQuery2);

		while($oRow=$oRecord2->fetch(PDO::FETCH_BOTH))
		{
			if($oRow['id'] == $sId)
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
				'id' => $sId,
				'id_korisnika' => $sIdKorisnika,
				'naziv' => $sNaziv,
				'mjesto' => $sMjesto,
				'ocjena' => $sOcjena,
				'lat' => $sLat,
				'lng' => $sLng,
				'vrijeme' => date('Y-m-d H:i:s'),
				'vidljivost' => $sVidljivost
			);
			try
			{
				$oStatement->execute($oData);
				echo 1;
			}
			catch(PDOException $error)
			{
				echo $error;
				echo 0;
			}		
		}
		else
		{
			echo 'postoji';
		}
		
	break;

	case 'edit_location':
		$sQuery = "UPDATE moje_lokacije SET vidljivost=:vidljivost WHERE id=:id AND id_korisnika=:id_korisnika";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sId,
		 'id_korisnika' => $_SESSION['id'],
		 'vidljivost'=> $sVidljivost
		);
		try
		{
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
	break;

	case 'delete_location':
		$sQuery = "DELETE FROM moje_lokacije WHERE id=:id AND id_korisnika=:id_korisnika";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
			'id'=> $sId,
			'id_korisnika'=>$sIdKorisnika
		);
		try
		{
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
	break;
}

?>