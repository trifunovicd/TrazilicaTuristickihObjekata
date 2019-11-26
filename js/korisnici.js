oModul.directive("podaciKorisnikaModal", function() {
  return {
    template : `<div id="PodaciKorisnikaModal" class="modal fade" role="dialog" data-backdrop="static">
	                <div class="modal-dialog modal-lg">
	                    <div class="modal-content">
	                        <div class="modal-header">
	                            <button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
	                            <h4 class="modal-title">O korisniku</h4>
	                        </div>
	                        <div class="modal-body">
	                        	<div style="text-align:center;">
		                        	<div style="display:inline-block">
		                        		<img src="{{korisnik_slika}}" height="150px" width="150px" style="border-radius: 50%;">
	                        		</div>
	                        		<div style="display:inline-block; position:relative; height:150px;">
			                            <div style="text-align:left; position:relative; top:20%; left:20px;">
			                                <p><b>Ime:</b> <i style="font-size:15px">{{korisnik_ime}}</i></p>
			                                <p><b>Prezime:</b> <i style="font-size:15px">{{korisnik_prezime}}</i></p>
			                                <p><b>Korisničko ime:</b> <i style="font-size:15px">{{korisnik_korisnicko_ime}}</i></p>
			                            </div>
		                            </div>
	                            </div>
	                            <hr>
	                            <div id="spremnik-korisnikove-lokacije" style="display: none;">
	                                <table id="tablica-korisnikove-lokacije" class="table table-striped">
	                                    <thead>
	                                        <tr>
	                                            <th class="align">Naziv</th>
	                                            <th class="align">Lokacija</th>
	                                            <th>Ocjena</th>
	                                            <th>Karta</th>
	                                            <th>Spremi</th>
	                                        </tr>
	                                    </thead>
	                                    <tbody>
	                                        <tr ng-repeat="objekt in korisnikove_lokacije">
	                                            <td data-toggle="tooltip" title="Pogledaj komentare" class="align" ng-click="KomentariModal(objekt.id,objekt.lat,objekt.lng,objekt.naziv,objekt.mjesto,objekt.ocjena)" style="cursor: pointer;">{{objekt.naziv}}</td>
	                                            <td data-toggle="tooltip" title="Pogledaj komentare" class="align" ng-click="KomentariModal(objekt.id,objekt.lat,objekt.lng,objekt.naziv,objekt.mjesto,objekt.ocjena)" style="cursor: pointer;">{{objekt.mjesto}}</td>
	                                            <td data-toggle="tooltip" title="Pogledaj komentare" ng-click="KomentariModal(objekt.id,objekt.lat,objekt.lng,objekt.naziv,objekt.mjesto,objekt.ocjena)" style="cursor: pointer;">{{objekt.ocjena}}</td>
	                                            <td data-toggle="tooltip" title="Prikaži na karti"><a style="cursor: pointer; color: #05A334;" ng-click="KartaModal(objekt.lat,objekt.lng,objekt.naziv,objekt.mjesto,objekt.ocjena)"><span class="glyphicon glyphicon-map-marker"></span></a></td>
	                                            <td data-toggle="tooltip" title="Spremi lokaciju u favorite"><a style="cursor: pointer; color: #FF9A00;" ng-click="OpenSaveForm($event,objekt.id,objekt.naziv,objekt.mjesto,objekt.ocjena,objekt.lat,objekt.lng)"><span class="glyphicon glyphicon-star-empty"></span></a></td>
	                                        </tr>
	                                    </tbody>
	                                </table>
	                            </div>
	                            <h5 id="nema_lokacija" style="display: none;"><i>~ Nema spremljenih lokacija! ~</i></h5>
	                        </div>
	                    </div>
	                </div>
	            </div>`
  }; 
});

oModul.controller("korisniciController", function($scope, $http) {

	$scope.DohvatiKorisnike = function()
	{
		$('#page_mask').show();
		$('#search_users').show();
 	 	$('#outer').fadeIn(); 
		
		var config= {
			method:'GET',
			url:'preporuke.php?action_id=dohvati_korisnike'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.svi_korisnici = response.data;
		},
		function(error)
		{
			console.log(error);
		});
		
	}

	$scope.ZatvoriPretraguKorisnika = function()
	{
		$('#page_mask').hide();
		$('#search_users').hide();
		$('#outer').fadeOut();
	}

	$scope.PrikaziKorisnikoveLokacije = function(id,ime,prezime,korisnicko_ime,slika)
	{
		$scope.korisnik_ime = ime;
		$scope.korisnik_prezime = prezime;
		$scope.korisnik_korisnicko_ime = korisnicko_ime;
		$scope.korisnik_slika = slika;

		var config= {
			method:'POST',
			url:'korisnici.php',
			data: {
				'id_korisnika': id
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.korisnikove_lokacije = response.data;
			if(response.data.length == 0)
			{
				$('#spremnik-korisnikove-lokacije').attr('style', 'display: none');
				$('#nema_lokacija').attr('style', 'display: block');
			}
			else
			{
				$('#nema_lokacija').attr('style', 'display: none');
				$('#spremnik-korisnikove-lokacije').attr('style', 'display: block');
			}
			$('#PodaciKorisnikaModal').modal();
		},
		function(error)
		{
			console.log(error);
		});
		
	}
});