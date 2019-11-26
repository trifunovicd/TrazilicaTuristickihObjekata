oModul.controller("registracijaController", function($scope, $http, $location, Authentication, Korisnik) {

	$scope.Registracija = function()
	{
		var files = document.querySelector('#slika_input').files;

		if($('#reg_ime').val() != "" && $('#reg_prezime').val() != "" && $('#reg_kor_ime').val() != "" && $('#reg_lozinka').val() != "" && files['length'] != 0)
		{
			var fd = new FormData();
		    fd.append("file", files[0]);
		    fd.append("ime", $scope.reg_ime);
		    fd.append("prezime", $scope.reg_prezime);
		    fd.append("korisnicko_ime", $scope.reg_kor_ime);
		    fd.append("lozinka", $scope.reg_lozinka);

		    $http.post('registracija.php', fd, { headers: {'Content-Type': undefined }}).then
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
		    			$("#RegModal").modal("hide");
			    		alert('Profil je uspješno kreiran!');
			    		$scope.Prijava();
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

	$scope.Prijava = function()
	{
		var oData = {
			'action_id': 'login',
			'user_name': $scope.reg_kor_ime,
			'password': $scope.reg_lozinka
		};

	    $http.post('login.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
	    		$scope.odgovor=response.data;
	    		//console.log($scope.odgovor);
		    	if( $scope.odgovor.length == 1 )
		    	{
		    		Authentication.SetLoggedUser($scope.odgovor[0]['ime'] + " " + $scope.odgovor[0]['prezime']);

		    		Korisnik.SetKorisnikInfo($scope.odgovor[0]['id'], $scope.odgovor[0]['ime'], $scope.odgovor[0]['prezime'], $scope.odgovor[0]['korisnicko_ime'], $scope.odgovor[0]['lozinka'], $scope.odgovor[0]['slika']);
		    		
		    		$location.path('/pretraga');
		    	}
		    	else
		    	{
		    		alert('Netočni podaci. Pokušajte ponovno');
		    	}
		    },
		    function (e) 
		    {
		    	console.log('error');
		 	}
		);
	};

	$("#RegModal").on('show.bs.modal', function()
	{
	    $(".loginbox").attr('style', 'display: none');
	});
	$("#RegModal").on('hide.bs.modal', function()
	{
	    $(".loginbox").attr('style', 'display: block');
	});    

});