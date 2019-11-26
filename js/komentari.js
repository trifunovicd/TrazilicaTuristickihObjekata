oModul.directive("komentariModal", function() {
  return {
    template : `<div id="KomentariModal" class="modal fade" role="dialog" data-backdrop="static">
				  	<div class="modal-dialog">
				    	<div class="modal-content">
					      	<div class="modal-header">
					        	<button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
					        	<h4 class="modal-title">Komentari</h4>
					        	<a href="" ng-click="KomentariModal(place_id,place_lat,place_lng,place_naziv,place_mjesto,place_ocjena)"><small id="osvjezi_komentare" class="glyphicon glyphicon-refresh" ></small></a>
					      	</div>
					      	<div class="modal-body kom" >
						     	<div style="position:relative; margin-bottom:60px;" ng-repeat="objekt in komentari | orderBy : 'vrijeme' : true">
							      	<img ng-src="{{objekt.putanja_slike}}" height="60px" width="60px" id="komentar_slika">
							        <label for="komentar_tekst">{{objekt.ime}} {{objekt.prezime}} <small style="color: grey;">@{{objekt.korisnicko_ime}}</small></label>
							        <a data-toggle="tooltip" title="Uredi komentar" href="" ng-click="UrediKomentar(objekt.id, $index)"><small id="uredi_komentar" class="{{objekt.uredi}}pencil"></small></a>
							        <a data-toggle="tooltip" title="Obriši komentar" href="" ng-click="ObrisiKomentar(objekt.id)"><small id="obrisi_komentar" class="{{objekt.uredi}}trash" ></small></a>
							        <a data-toggle="tooltip" title="Ažuriraj komentar" href="" ng-click="AzurirajKomentar(objekt.id)"><small id="azuriraj_komentar" class="{{objekt.uredi}}ok"></small></a>
							        <pre ng-attr-id="{{ 'komentar-' + objekt.id }}" class="komentar_tekst">{{objekt.komentar}}</pre>
						     	</div>
						     	<h5 id="nema_komentara"><i>~ Nema komentara! ~</i></h5>
					      	</div>
					      	<div class="modal-footer">
					      		<button type="button" class="btn btn-default kom_button" data-toggle="modal" data-target="#DodajKomentarModal" id="komentiraj_button" ng-click="ResetEditModal(old_kom_id)">Komentiraj</button>
					      		
					      	</div>
				    	</div>
				  	</div>
				</div>`
  }; 
});

oModul.directive("mojiKomentariModal", function() {
  return {
    template : `<div id="MojiKomentariModal" class="modal fade" role="dialog" data-backdrop="static">
				  	<div class="modal-dialog">
				    	<div class="modal-content">
					      	<div class="modal-header">
					        	<button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
					        	<h4 class="modal-title">Komentari</h4>
					      	</div>
					      	<div class="modal-body kom" >
						     	<div style="position:relative; margin-bottom:60px;" ng-repeat="objekt in moji_komentari | orderBy : 'vrijeme' : true">
							      	<img ng-src="{{user_putanja_slike}}" height="60px" width="60px" id="komentar_slika">
							        <label for="komentar_tekst">{{user_ime}} {{user_prezime}} <small style="color: grey;">@{{user_korisnicko_ime}}</small></label>
							        <a data-toggle="tooltip" title="Uredi komentar" href="" ng-click="UrediKomentar(objekt.id, $index)"><small id="uredi_komentar" class="glyphicon glyphicon-pencil"></small></a>
							        <a data-toggle="tooltip" title="Obriši komentar" href="" ng-click="ObrisiKomentar(objekt.id)"><small id="obrisi_komentar" class="glyphicon glyphicon-trash" ></small></a>
							        <a data-toggle="tooltip" title="Ažuriraj komentar" href="" ng-click="AzurirajKomentar(objekt.id)"><small id="azuriraj_komentar" class="glyphicon glyphicon-ok"></small></a>
							        <pre ng-attr-id="{{ 'komentar-' + objekt.id }}" class="komentar_tekst">{{objekt.komentar}}</pre>
						     	</div>
						     	<h5 id="nema_mojih_komentara"><i>~ Nema komentara! ~</i></h5>
					      	</div>
					      	
				    	</div>
				  	</div>
				</div>`
  };
});

oModul.directive("dodajKomentarModal", function() {
  return {
    template : `<div id="DodajKomentarModal" class="modal fade" role="dialog" data-backdrop="static">
				  	<div class="modal-dialog">
				    	<div class="modal-content">
					      	<div class="modal-header">
					        	<button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
					        	<h4 class="modal-title">Dodaj komentar</h4>
					      	</div>
					      	<div class="modal-body"> 
					     		<textarea style="resize: none;" id="textarea_komentar" rows="9" cols="76" maxlength="500" placeholder="Unesite komentar..."></textarea>
					      	</div>
					      	<div class="modal-footer">
					      		<button type="button" class="btn btn-default kom_button" ng-click="DodajKomentar()">Komentiraj</button>
					      	</div>
				    	</div>
				  	</div>
				</div>`
  };
});

oModul.directive("deleteCommentAlert", function() {
  return {
    template : `<div id="myDeleteCommentAlert" class="alert alert-danger collapse text-center">Komentar obrisan!</div>`
  };
});

oModul.directive("addCommentAlert", function() {
  return {
    template : `<div id="myAddCommentAlert" class="alert alert-success collapse text-center">Komentar dodan!</div>`
  };
});

oModul.directive("editCommentAlert", function() {
  return {
    template : `<div id="myEditCommentAlert" class="alert alert-success collapse text-center">Komentar ažuriran!</div>`
  };
});

oModul.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.hover(function(){
                element.tooltip('show');
            }, function(){
                element.tooltip('hide');
            });
        }
    };
});

oModul.controller("komentariController", function($scope, $http, $timeout, $cookies) {

	$scope.user_ime = $cookies.get('logged_user_ime');
	$scope.user_prezime = $cookies.get('logged_user_prezime');
	$scope.user_korisnicko_ime = $cookies.get('logged_user_korime');
	$scope.user_putanja_slike = $cookies.get('logged_user_slika');

	$('#DodajKomentarModal').on('hidden.bs.modal', function ()
	{
		$(this).find("textarea").val('');	
	});

	$('#KomentariModal').on('hidden.bs.modal', function ()
	{
		$scope.ResetEditModal($scope.old_kom_id);
	});

	$('#MojiKomentariModal').on('hidden.bs.modal', function ()
	{
		$scope.ResetEditModal($scope.old_kom_id);
	});

	$scope.KomentariModal = function(place_id,lat,lng,naziv,mjesto,ocjena)
	{
		$scope.place_id = place_id;
		$scope.place_lat = lat;
		$scope.place_lng = lng;
		$scope.place_naziv = naziv;
		$scope.place_mjesto = mjesto;
		$scope.place_ocjena = ocjena;

		var config= {
			method:'POST',
			url:'komentari.php',
			data: {
				'action_id': 'dohvati_komentare',
				'place_id': place_id
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.komentari = response.data;
			if(response.data.length == 0)
			{
				$("#nema_komentara").attr('style', 'display: block');
			}
			else
			{
				$("#nema_komentara").attr('style', 'display: none');
			}

			$("#KomentariModal").modal();
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.MojiKomentariModal = function(place_id)
	{
		$scope.moj_place_id = place_id;
		var config= {
			method:'POST',
			url:'komentari.php',
			data: {
				'action_id': 'dohvati_moje_komentare',
				'place_id': place_id
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.moji_komentari = response.data;
			if(response.data.length == 0)
			{
				$("#nema_mojih_komentara").attr('style', 'display: block');
			}
			else
			{
				$("#nema_mojih_komentara").attr('style', 'display: none');
			}
			$("#MojiKomentariModal").modal();
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.OtvoriUredivanje=function(index)
	{
		$('.kom .komentar_tekst').eq(index).attr('style', 'outline-style: dotted; outline-color:#4D90FE; outline-width: 1px;');
		$('.kom #obrisi_komentar').eq(index).attr('style', 'display: block');
		$('.kom #azuriraj_komentar').eq(index).attr('style', 'display: block');
		$('.kom #uredi_komentar').eq(index).attr('class', 'glyphicon glyphicon-remove');
	}

	$scope.ZatvoriUredivanje=function(index)
	{
		$('.kom .komentar_tekst').eq(index).attr('style', 'outline-style: none');
		$('.kom #obrisi_komentar').eq(index).attr('style', 'display: none');
		$('.kom #azuriraj_komentar').eq(index).attr('style', 'display: none');
		$('.kom #uredi_komentar').eq(index).attr('class', 'glyphicon glyphicon-pencil');
		
		
		if($scope.azurirano == 0)
		{
			$('.kom #komentar-' + $scope.old_kom_id).text($scope.old_text);
		}
		else
		{
			$scope.azurirano = 0;
		}

		$scope.old_index = undefined;
		$scope.old_kom_id = undefined;
		$scope.old_text = undefined;
	}

	$scope.ResetEditModal = function(kom_id)
	{
		if($('.kom #komentar-' + kom_id).val() == undefined || $('.kom #komentar-' + kom_id).val() == "")
		{
			console.log(kom_id);
		}
		else
		{
			$('.kom #komentar-' + kom_id).replaceWith($('<pre id="komentar-'+ kom_id +'" class="komentar_tekst">' + $('.kom #komentar-' + kom_id).val() + '</pre>'));
		}
		
		$scope.ZatvoriUredivanje($scope.old_index);
		$scope.visible = true;
	}

	$scope.visible = true;
	$scope.old_index;
	$scope.old_kom_id;
	$scope.old_text;
	$scope.UrediKomentar=function(kom_id, index)
	{
		if(index == $scope.old_index)
		{
			if($scope.visible==true)
	        {
	        	$scope.old_text = $('.kom #komentar-' + kom_id).text();
	         	$('.kom #komentar-' + kom_id).replaceWith($('<textarea id="komentar-'+ kom_id +'" class="komentar_tekst" cols="66" rows="9" maxlength="500">' + $('.kom #komentar-'+ kom_id).text() + '</textarea>'));
	         	$scope.OtvoriUredivanje(index);
	         	$scope.visible = false;
	         	$scope.old_index = index;
	         	$scope.old_kom_id = kom_id;
	        }
	        else
	        {
	        	$('.kom #komentar-' + kom_id).replaceWith($('<pre id="komentar-'+ kom_id +'" class="komentar_tekst">' + $('.kom #komentar-' + kom_id).val() + '</pre>'));
	          	$scope.ZatvoriUredivanje(index);
	          	$scope.visible = true;
	          	$scope.old_index = index;
	          	$scope.old_kom_id = kom_id;
	        }
		}
		else
		{
			$scope.ResetEditModal($scope.old_kom_id);
			if($scope.visible==true)
	        {
	        	$scope.old_text = $('.kom #komentar-' + kom_id).text();
	         	$('.kom #komentar-' + kom_id).replaceWith($('<textarea id="komentar-'+ kom_id +'" class="komentar_tekst" cols="66" rows="9" maxlength="500">' + $('.kom #komentar-'+ kom_id).text() + '</textarea>'));
	         	$scope.OtvoriUredivanje(index);
	         	$scope.visible = false;
	         	$scope.old_index = index;
	         	$scope.old_kom_id = kom_id;
	        }
	        else
	        {
	        	$('.kom #komentar-' + kom_id).replaceWith($('<pre id="komentar-'+ kom_id +'" class="komentar_tekst">' + $('.kom #komentar-' + kom_id).val() + '</pre>'));
	          	$scope.ZatvoriUredivanje(index);
	          	$scope.visible = true;
	          	$scope.old_index = index;
	          	$scope.old_kom_id = kom_id;
	        }
		}
		
	}

	$scope.ObrisiKomentar=function(kom_id)
	{
		var config= {
			method:'POST',
			url:'komentari.php',
			data: {
				'action_id': 'obrisi_komentar',
				'id': kom_id
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.ResetEditModal($scope.old_kom_id);
			//console.log($scope.place_id);
			if($scope.place_id == undefined)
          	{
          		$scope.MojiKomentariModal($scope.moj_place_id);
			}
			else
			{
				$scope.KomentariModal($scope.place_id,$scope.place_lat,$scope.place_lng,$scope.place_naziv,$scope.place_mjesto,$scope.place_ocjena);
			}
			$('#myDeleteCommentAlert').show('fade');
			$timeout(function () {
                $('#myDeleteCommentAlert').hide('fade');
            }, 1000);
		},
		function(error)
		{
			console.log(error);
		});
	
	}
	
	$scope.azurirano = 0;
	$scope.AzurirajKomentar=function(kom_id)
	{
		$scope.azurirano++;
		//console.log($scope.azurirano);
		if($('.kom #komentar-' + kom_id).val() != "")
		{
			var config= {
				method:'POST',
				url:'komentari.php',
				data: {
					'action_id': 'uredi_komentar',
					'id': kom_id,
					'komentar': $('.kom #komentar-' + kom_id).val()
	 			}
			};

			var request=$http(config);

			request.then(function(response)
			{
				console.log(response);
				$scope.ZatvoriUredivanje($scope.old_index);
				$('.kom #komentar-' + kom_id).replaceWith($('<pre id="komentar-'+ kom_id +'" class="komentar_tekst">' + $('.kom #komentar-' + kom_id).val() + '</pre>'));
	          	$scope.visible = true;
	          	//console.log($scope.place_id);
	          	if($scope.place_id == undefined)
	          	{
	          		$scope.MojiKomentariModal($scope.moj_place_id);
				}
				else
				{
					$scope.KomentariModal($scope.place_id,$scope.place_lat,$scope.place_lng,$scope.place_naziv,$scope.place_mjesto,$scope.place_ocjena);
				}
	          	$('#myEditCommentAlert').show('fade');
				$timeout(function () {
	                $('#myEditCommentAlert').hide('fade');
	            }, 1000);
			},
			function(error)
			{
				console.log(error);
			});
		}
		else
		{
			alert('Popunite polje za unos komentara!');
		}
		
	}

	$scope.DodajKomentar=function()
	{
		if($('#textarea_komentar').val() != "")
		{
			var config= {
				method:'POST',
				url:'komentari.php',
				data: {
					'action_id': 'dodaj_komentar',
					'place_id': $scope.place_id,
					'place_lat': $scope.place_lat,
					'place_lng': $scope.place_lng,
					'place_naziv': $scope.place_naziv,
					'place_mjesto': $scope.place_mjesto,
					'place_ocjena': $scope.place_ocjena,
					'komentar': $('#textarea_komentar').val()
	 			}
			};

			var request=$http(config);

			request.then(function(response)
			{				
				console.log(response.data);
				$scope.KomentariModal($scope.place_id,$scope.place_lat,$scope.place_lng,$scope.place_naziv,$scope.place_mjesto,$scope.place_ocjena);
				$('#DodajKomentarModal').modal("hide");
				$('#myAddCommentAlert').show('fade');
				$timeout(function () {
	                $('#myAddCommentAlert').hide('fade');
	            }, 1000);
			},
			function(error)
			{
				console.log(error);
			});
		}
		else
		{
			alert('Popunite polje za unos komentara!');
		}
		
	}

	$scope.KartaModal = function(lat,lng,naziv,mjesto,ocjena)
	{
		var locationLat = parseFloat(lat);
		var locationLng = parseFloat(lng);

	  	var location = {lat: locationLat, lng: locationLng};
	  	var content = "<b>" + naziv + "</b> <br>" + mjesto + "<br> Ocjena: " + ocjena;
	  
	  	var map = new google.maps.Map(document.getElementById('mapModal'), {zoom: 16, center: location});
	
	  	var marker = new google.maps.Marker({position: location, map: map});

	  	var infoWindow = new google.maps.InfoWindow({ content: content });

		marker.addListener('click', function(){
	        infoWindow.open(map, marker);
	    });

	  	$("#myModal").modal();
	}
});