<?php 
session_start();
include 'classes.php';

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

if(isset($oPostData->action_id))
{
	$sAction = $oPostData->action_id;
}
if(isset($oPostData->tip))
{
	$sTip = $oPostData->tip;
}
if(isset($oPostData->radijus))
{
	$sRadijus = $oPostData->radijus;
}
if(isset($oPostData->lat))
{
	$sLat = $oPostData->lat;
}
if(isset($oPostData->lng))
{
	$sLng = $oPostData->lng;
}
if(isset($oPostData->pagetoken))
{
	$sPageToken = $oPostData->pagetoken;
}


switch ($sAction)
{
	case 'dohvati_lokacije':

		$url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$sLat.",".$sLng."&radius=".$sRadijus."&type=".$sTip."&key=AIzaSyDNbXYCxvcGcmv4J_Zr_8shCctINpArEcs";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$result = curl_exec($ch);
		$json = json_decode($result, true);
		curl_close($ch);

		$oLokacija = new MojaLokacija();

		$aPodaci= [];
		$length = count($json['results']);

		for ($i = 0; $i < $length; $i++) 
		{
			if(isset($json['results'][$i]['place_id']))
			{
				$oLokacija->id=$json['results'][$i]['place_id'];
			}
			else
			{
				$oLokacija->id=$json['results'][$i]['id'];
			}

			if(isset($json['results'][$i]['name']))
			{
				$oLokacija->naziv=$json['results'][$i]['name'];
			}
			else
			{
				$oLokacija->naziv="N/A";
			}

			if(isset($json['results'][$i]['vicinity']))
			{
				$oLokacija->mjesto=$json['results'][$i]['vicinity'];
			}
			else
			{
				$oLokacija->mjesto="N/A";
			}

			if(isset($json['results'][$i]['rating']))
			{
				$oLokacija->ocjena=$json['results'][$i]['rating'];
			}
			else
			{
				$oLokacija->ocjena="N/A";
			}

			if(isset($json['results'][$i]['geometry']['location']['lat']))
			{
				$oLokacija->lat=$json['results'][$i]['geometry']['location']['lat'];
			}
			else
			{
				$oLokacija->lat="N/A";
			}

			if(isset($json['results'][$i]['geometry']['location']['lng']))
			{
				$oLokacija->lng=$json['results'][$i]['geometry']['location']['lng'];
			}
			else
			{
				$oLokacija->lng="N/A";
			}

			$podaci= array(
				'id' => $oLokacija->id,
				'id_korisnika'=> $_SESSION['id'],
				'naziv' => $oLokacija->naziv, 
				'mjesto' => $oLokacija->mjesto, 
				'ocjena' => $oLokacija->ocjena,
				'lat' => $oLokacija->lat,
				'lng' => $oLokacija->lng
			);

			array_push($aPodaci, $podaci);
			
		}

		if(isset($json['next_page_token']))
		{
			$podaci2= array(
				'true' => 1,
				'pagetoken'=> $json['next_page_token']
			);
			array_push($aPodaci, $podaci2);
		}
		
		echo json_encode($aPodaci);

	break;
	
	case 'dohvati_vise_lokacija':
		
		$url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=".$sPageToken."&key=AIzaSyDNbXYCxvcGcmv4J_Zr_8shCctINpArEcs";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$result = curl_exec($ch);
		$json = json_decode($result, true);
		curl_close($ch);

		$oLokacija = new MojaLokacija();

		$aPodaci= [];
		$length = count($json['results']);

		for ($i = 0; $i < $length; $i++) 
		{
			if(isset($json['results'][$i]['place_id']))
			{
				$oLokacija->id=$json['results'][$i]['place_id'];
			}
			else
			{
				$oLokacija->id=$json['results'][$i]['id'];
			}

			if(isset($json['results'][$i]['name']))
			{
				$oLokacija->naziv=$json['results'][$i]['name'];
			}
			else
			{
				$oLokacija->naziv="N/A";
			}

			if(isset($json['results'][$i]['vicinity']))
			{
				$oLokacija->mjesto=$json['results'][$i]['vicinity'];
			}
			else
			{
				$oLokacija->mjesto="N/A";
			}

			if(isset($json['results'][$i]['rating']))
			{
				$oLokacija->ocjena=$json['results'][$i]['rating'];
			}
			else
			{
				$oLokacija->ocjena="N/A";
			}

			if(isset($json['results'][$i]['geometry']['location']['lat']))
			{
				$oLokacija->lat=$json['results'][$i]['geometry']['location']['lat'];
			}
			else
			{
				$oLokacija->lat="N/A";
			}

			if(isset($json['results'][$i]['geometry']['location']['lng']))
			{
				$oLokacija->lng=$json['results'][$i]['geometry']['location']['lng'];
			}
			else
			{
				$oLokacija->lng="N/A";
			}

			$podaci= array(
				'id' => $oLokacija->id,
				'id_korisnika'=> $_SESSION['id'],
				'naziv' => $oLokacija->naziv, 
				'mjesto' => $oLokacija->mjesto, 
				'ocjena' => $oLokacija->ocjena,
				'lat' => $oLokacija->lat,
				'lng' => $oLokacija->lng
			);

			array_push($aPodaci, $podaci);
			
		}

		if(isset($json['next_page_token']))
		{
			$podaci2= array(
				'true' => 1,
				'pagetoken'=> $json['next_page_token']
			);
			array_push($aPodaci, $podaci2);
		}

		echo json_encode($aPodaci);

	break;
}

?>