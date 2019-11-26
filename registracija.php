<?php 
session_start();
include "connection.php";

$korisnik=false;

$sQuery="SELECT * FROM korisnici";
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
	echo 1;
}
else
{
	$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

	$slika = "img/korisnici/" . $_POST['korisnicko_ime'] . "." . $ext;

	move_uploaded_file($_FILES['file']['tmp_name'], $slika);

	$sQuery2 = "INSERT INTO korisnici (ime, prezime, korisnicko_ime, lozinka, putanja_slike) VALUES (:ime, :prezime, :korisnicko_ime, :lozinka, :putanja_slike)";
	$oStatement = $oConnection->prepare($sQuery2);
	$oData = array(
		'ime' => $_POST['ime'],
		'prezime' => $_POST['prezime'],
		'korisnicko_ime' => $_POST['korisnicko_ime'],
		'lozinka' => $_POST['lozinka'],
		'putanja_slike' => $slika
	);
	$oStatement->execute($oData);
}
?>