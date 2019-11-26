oModul.controller("profilController", function($scope, $http, $cookies, $location, Korisnik, Authentication) {

	$scope.UrediProfil = function()
	{
		var files = document.querySelector('#file_input').files;

		if($('#ime').val() != "" && $('#prezime').val() != "" && $('#korisnicko_ime').val() != "" && $('#lozinka').val() != "")
		{
			var fd = new FormData();
		    fd.append("file", files[0]);
		    fd.append("action_id", 'edit_profile');
		    fd.append("id", $cookies.get('logged_user_id'));
		    fd.append("ime", $('#ime').val());
		    fd.append("prezime", $('#prezime').val());
		    fd.append("korisnicko_ime", $('#korisnicko_ime').val());
		    fd.append("staro_korisnicko_ime", $cookies.get('logged_user_korime'));
		    fd.append("lozinka", $('#lozinka').val());

		    $http.post('moj_profil.php', fd, { headers: {'Content-Type': undefined }}).then
		    (
		    	function (response) 
		    	{
		    		//console.log(response.data);
		    		if(response.data == 1)
		    		{
		    			alert('Korisničko ime već postoji!');
		    		}
		    		else
		    		{
		                var img = document.getElementById("profile");
	    				img.src = response.data + "?" + new Date().getTime();
		    			Korisnik.SetKorisnikInfo($cookies.get('logged_user_id'), $('#ime').val(), $('#prezime').val(), $('#korisnicko_ime').val(), $('#lozinka').val(), response.data + "?" + new Date().getTime());
		    			Authentication.SetLoggedUser($('#ime').val() + " " + $('#prezime').val());
		    			$scope.korisnik=Authentication.GetLoggedUser();
		    			alert('Profil je ažuriran!');
		    		}
			    },
			    function (e) 
			    {
			    	console.log('error');
			 	}
			);
		}
		else
		{
			alert("Popunite sva polja!");
		}
	}

	$scope.ProfilPrompt = function()
	{
		if (confirm("Jeste li sigurni da želite obrisati svoj profil!")) 
		{
	    	$scope.ObrisiProfil();
	  	}
	}

	$scope.ObrisiProfil = function()
	{
		var oData = {
			'action_id': 'delete_profile',
			'id': $cookies.get('logged_user_id'),
			'korisnicko_ime': $cookies.get('logged_user_korime')
		};
		$http.post('moj_profil.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
		    		Authentication.Logout();
		    		alert('Profil je uspješno obrisan!');
		    		$location.path('/');
			    },
			    function (e) 
			    {
			    	console.log('error');
			 	}
		);
	}
});