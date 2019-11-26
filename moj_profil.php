<?php 
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

if (isset($_POST['action_id']))
{
	$sAction = $_POST['action_id'];
}
else
{
	$sAction = $oPostData->action_id;
	$sId = $oPostData->id;
	$korisnicko_ime = $oPostData->korisnicko_ime;
}

switch($sAction)
{
	case 'edit_profile':

		$korisnik=false;
		$response=[];

		$sQuery="SELECT * FROM korisnici WHERE id != '".$_POST['id']."'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			if($oRow['korisnicko_ime'] == $_POST['korisnicko_ime'])
			{
				$korisnik=true;
			}
		}

		if($korisnik==true)
		{
			array_push($response, 1);
		}
		else
		{
			if (isset($_FILES['file']))
			{
				$filenames = array(
					'1' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".jpg",
					'2' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".jpeg",
					'3' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".png",
				);
				
				foreach ($filenames as $filename)
				{
					if(file_exists( $filename ))
					{
						unlink($filename);
					}
				}

				$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

				$slika = "img/korisnici/" . $_POST['korisnicko_ime'] . "." . $ext;

				move_uploaded_file($_FILES['file']['tmp_name'], $slika);

				array_push($response, $slika);

				$sQuery = "UPDATE korisnici SET ime=:ime, prezime=:prezime, korisnicko_ime=:korisnicko_ime, lozinka=:lozinka, putanja_slike=:putanja_slike WHERE id=:id";
				$oData = array(
				 'id'=> $_POST['id'],
				 'ime' => $_POST['ime'],
				 'prezime' => $_POST['prezime'],
				 'korisnicko_ime' => $_POST['korisnicko_ime'],
				 'lozinka' => $_POST['lozinka'],
				 'putanja_slike' => $slika
				);
			}
			else
			{
				$filenames = array(
					'1' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".jpg",
					'2' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".jpeg",
					'3' => "img/korisnici/" . $_POST['staro_korisnicko_ime'] . ".png",
				);
				
				foreach ($filenames as $filename) 
				{
					if(file_exists( $filename ))
					{
						$ext = pathinfo($filename, PATHINFO_EXTENSION);
						$oldimagename = "img/korisnici/". $_POST['staro_korisnicko_ime'] . "." . $ext;
						$newimagename = "img/korisnici/". $_POST['korisnicko_ime'] . "." . $ext;
						rename($oldimagename , $newimagename);
					}
					
				}
				array_push($response, $newimagename);


				$sQuery = "UPDATE korisnici SET ime=:ime, prezime=:prezime, korisnicko_ime=:korisnicko_ime, lozinka=:lozinka, putanja_slike=:putanja_slike WHERE id=:id";
				$oData = array(
				 'id'=> $_POST['id'],
				 'ime' => $_POST['ime'],
				 'prezime' => $_POST['prezime'],
				 'korisnicko_ime' => $_POST['korisnicko_ime'],
				 'lozinka' => $_POST['lozinka'],
				 'putanja_slike' => $newimagename
				);
			}
			
			$oStatement = $oConnection->prepare($sQuery);
			
			$oStatement->execute($oData);
		}

		echo json_encode($response);
		
	break;

	case 'delete_profile':
		$sQuery = "DELETE FROM korisnici WHERE id=:id";
		$oStatement = $oConnection->prepare($sQuery);
		$oData = array(
		 'id'=> $sId
		);	
		$oStatement->execute($oData);

		$filenames = array(
			'1' => "img/korisnici/" . $korisnicko_ime . ".jpg",
			'2' => "img/korisnici/" . $korisnicko_ime . ".jpeg",
			'3' => "img/korisnici/" . $korisnicko_ime . ".png",
		);
		
		foreach ($filenames as $filename) 
		{
			if(file_exists( $filename ))
			{
				unlink($filename);
			}
		}

		session_destroy();
	break;
}
?>