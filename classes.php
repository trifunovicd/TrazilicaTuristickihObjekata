<?php 
class Configuration
{
	public $host="localhost";
	public $dbName="mojelokacije";
	public $username="root";
	public $password="";	
}

class MojaLokacija
{
	public $id="N/A";
	public $id_korisnika="N/A";
	public $naziv="N/A";
	public $mjesto="N/A";
	public $ocjena="N/A";
	public $lat="N/A";
	public $lng="N/A";
	public $vrijeme="N/A";
	public $vidljivost="N/A";

	public function __construct($id=null,$id_korisnika=null,$naziv=null,$mjesto=null,$ocjena=null,$lat=null,$lng=null,$vrijeme=null,$vidljivost=null)
	{
		if($id) $this->id=$id;
		if($id_korisnika) $this->id_korisnika=$id_korisnika;
		if($naziv) $this->naziv=$naziv;
		if($mjesto) $this->mjesto=$mjesto;
		if($ocjena) $this->ocjena=$ocjena;
		if($lat) $this->lat=$lat;
		if($lng) $this->lng=$lng;
		if($vrijeme) $this->vrijeme=$vrijeme;
		if($vidljivost) $this->vidljivost=$vidljivost;
	}
}

class Korisnik
{
	public $id="N/A";
	public $ime="N/A";
	public $prezime="N/A";
	public $korisnicko_ime="N/A";
	public $lozinka="N/A";
	public $slika="N/A";

	public function __construct($id=null,$ime=null,$prezime=null,$korisnicko_ime=null,$lozinka=null,$slika=null)
	{
		if($id) $this->id=$id;
		if($ime) $this->ime=$ime;
		if($prezime) $this->prezime=$prezime;
		if($korisnicko_ime) $this->korisnicko_ime=$korisnicko_ime;
		if($lozinka) $this->lozinka=$lozinka;
		if($slika) $this->slika=$slika;
	}
}

class Preporuka
{
	public $id_preporuke="N/A";
	public $preporucitelj_id="N/A";
	public $ime="N/A";
	public $prezime="N/A";
	public $korisnicko_ime="N/A";
	public $komentar="N/A";
	public $lokacija_id="N/A";
	public $naziv="N/A";
	public $mjesto="N/A";
	public $ocjena="N/A";
	public $lat="N/A";
	public $lng="N/A";
	public $vrijeme="N/A";

	public function __construct($id_preporuke=null,$preporucitelj_id=null,$ime=null,$prezime=null,$korisnicko_ime=null,$komentar=null,$lokacija_id=null,$naziv=null,$mjesto=null,$ocjena=null,$lat=null,$lng=null,$vrijeme=null)
	{
		if($id_preporuke) $this->id_preporuke=$id_preporuke;
		if($preporucitelj_id) $this->preporucitelj_id=$preporucitelj_id;
		if($ime) $this->ime=$ime;
		if($prezime) $this->prezime=$prezime;
		if($korisnicko_ime) $this->korisnicko_ime=$korisnicko_ime;
		if($komentar) $this->komentar=$komentar;
		if($lokacija_id) $this->lokacija_id=$lokacija_id;
		if($naziv) $this->naziv=$naziv;
		if($mjesto) $this->mjesto=$mjesto;
		if($ocjena) $this->ocjena=$ocjena;
		if($lat) $this->lat=$lat;
		if($lng) $this->lng=$lng;
		if($vrijeme) $this->vrijeme=$vrijeme;
	}
}
?>