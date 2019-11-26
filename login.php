<?php
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

$sAction = $oPostData->action_id;
$sUserName = "";
$sPassword = "";

if(isset($oPostData->user_name))
{
	$sUserName = $oPostData->user_name;
}
if(isset($oPostData->password))
{
	$sPassword = $oPostData->password;
}

switch($sAction)
{
	case 'login':

		$response=[];

		$sQuery="SELECT * FROM korisnici WHERE korisnicko_ime = '$sUserName' AND lozinka = '$sPassword'";
		$oRecord=$oConnection->query($sQuery);

		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oKorisnik=new Korisnik(
				$oRow['id'],
				$oRow['ime'],
				$oRow['prezime'],
				$oRow['korisnicko_ime'],
				$oRow['lozinka'],
				$oRow['putanja_slike']
			);

			$_SESSION['id'] = $oKorisnik->id;

			array_push($response, $oKorisnik);
		}

		echo json_encode($response);
	break;

	case 'logout':
		session_destroy();
	break;
}

?>