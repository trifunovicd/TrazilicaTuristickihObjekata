var oModul = angular.module('app', ['ngRoute', 'ngCookies']);

oModul.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'glavniController'
	});

	$routeProvider.when('/pretraga', {
		templateUrl: 'templates/pretraga.html',
		controller: 'glavniController'
	});

	$routeProvider.when('/moje_lokacije', {
		templateUrl: 'templates/moje_lokacije.html',
		controller: 'glavniController'
	});

	$routeProvider.when('/preporuke', {
		templateUrl: 'templates/preporuke.html',
		controller: 'glavniController'
	});

	$routeProvider.when('/komentari', {
		templateUrl: 'templates/komentari.html',
		controller: 'glavniController'
	});

	$routeProvider.when('/moj_profil', {
		templateUrl: 'templates/moj_profil.html',
		controller: 'glavniController'
	});

	$routeProvider.otherwise({
		template:'Došlo je do pogreške'
	});
});

oModul.factory('Korisnik', function($cookies){

	var oKorisnik = {};

	oKorisnik.SetKorisnikInfo = function( sId, sIme, sPrezime, sKorisnickoIme, sLozinka, sSlika)
	{
		$cookies.put('logged_user_id', sId);
		$cookies.put('logged_user_ime', sIme);
		$cookies.put('logged_user_prezime', sPrezime);
		$cookies.put('logged_user_korime', sKorisnickoIme);
		$cookies.put('logged_user_lozinka', sLozinka);
		$cookies.put('logged_user_slika', sSlika);
	}

	return oKorisnik;
});


oModul.factory('Authentication', function( $cookies ){

	var oAutentication = {};
	oAutentication.GetLoginStatus = function()
	{
		if( $cookies.get('logged_user') )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	oAutentication.SetLoggedUser = function( sLoggedUser)
	{
		$cookies.put('logged_user', sLoggedUser)
	}

	oAutentication.GetLoggedUser = function()
	{
		return $cookies.get('logged_user')
	}

	oAutentication.Logout = function()
	{
		$cookies.remove('logged_user');
		$cookies.remove('logged_user_id');
		$cookies.remove('logged_user_ime');
		$cookies.remove('logged_user_prezime');
		$cookies.remove('logged_user_korime');
		$cookies.remove('logged_user_lozinka');
		$cookies.remove('logged_user_slika');
	}

	return oAutentication;
});

oModul.controller("glavniController", function($scope, $http, $location, Authentication, Korisnik, $cookies) {

	if( Authentication.GetLoginStatus() == false )
	{
		$location.path('/');
	}

	$scope.Prijava = function()
	{
		var oData = {
			'action_id': 'login',
			'user_name': $scope.user,
			'password': $scope.pass
		};

	    $http.post('login.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
	    		$scope.odgovor=response.data;
	    		console.log($scope.odgovor);
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

	$scope.Odjava = function()
	{
		var oData = {
			'action_id': 'logout'
		};
		$http.post('login.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
		    		Authentication.Logout();
		    		alert('Uspješno ste se odjavili!');
		    		$location.path('/');
			    },
			    function (e) 
			    {
			    	console.log('error');
			 	}
		);
	}

	$scope.korisnik=Authentication.GetLoggedUser();
	$scope.id=$cookies.get('logged_user_id');
	$scope.ime=$cookies.get('logged_user_ime');
	$scope.prezime=$cookies.get('logged_user_prezime');
	$scope.korisnicko_ime=$cookies.get('logged_user_korime');
	$scope.lozinka=$cookies.get('logged_user_lozinka');
	$scope.slika=$cookies.get('logged_user_slika');
});