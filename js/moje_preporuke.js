oModul.directive("urediKomentarPreporukeModal", function() {
  return {
    template : `<div id="KomentarPreporukeModal" class="modal fade" role="dialog" data-backdrop="static">
				  	<div class="modal-dialog">
				    	<div class="modal-content">
					      	<div class="modal-header">
					        	<button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
					        	<h4 class="modal-title">Uredi preporuku</h4>
					      	</div>
					      	<div class="modal-body">
					      		<textarea style="resize: none;" id="textarea_uredi_komentar" rows="9" cols="76" maxlength="500"></textarea>
					      		<p style="margin-top: 10px;"><i>Preporučeno korisnicima:</i></p>
					      		<div style="display:inline-block; position:relative;" ng-repeat="korisnik in primatelji_preporuke | orderBy : 'prezime'">
							     	<label for="{{'check-' + korisnik.id}}" style="text-align:center; cursor:pointer;" data-toggle="tooltip" title="{{ '@' + korisnik.korisnicko_ime}}" tooltip>
										<img ng-src="{{korisnik.slika}}" height="60px" width="60px" id="preporuke_slika">
										<p id="preporuke_korisnik">{{korisnik.ime}}<br>{{korisnik.prezime}}</p>
									</label>
									<input type="checkbox" id="{{'check-' + korisnik.id}}" name="check" value="{{korisnik.id}}" style="display:none" ng-model='korisnik.selected' ng-change="Check(korisnik.id)"/>
								</div>
								<i style="display: block; margin-top: 20px; font-size: 13px; color: grey;"><span class="glyphicon glyphicon-info-sign"></span> Pritisnite korisnika za uklanjanje!</i>
					      	</div>
					      	<div class="modal-footer">
					      		<button type="button" class="btn btn-default spremi_komentar_preporuke" ng-click="UrediPreporuku()">Spremi</button>
					      	</div>
				    	</div>
				  	</div>
				</div>`
  };
});

oModul.directive("updatePreporukaAlert", function() {
  return {
    template : `<div id="myUpdatePreporukaAlert" class="alert alert-success collapse text-center">Preporuka ažurirana!</div>`
  };
});

oModul.controller("mojepreporukeController", function($scope, $http, $timeout) {

	$("#sortiraj option[value='-vrijeme']").prop('selected', true);
    $scope.selected='-vrijeme';

	$('#KomentarPreporukeModal').on('hidden.bs.modal', function ()
	{
		$(this).find("img").attr('style', 'filter: grayscale(0%);');
		$(this).find("p").attr('style', 'color: white;');
	});

	$scope.Check = function(kor_id)
	{
		if($("input[id='check-"+kor_id+"']").is(':checked'))
		{
	        $("label[for='check-"+kor_id+"'] img").attr('style', 'filter: grayscale(100%);');
	        $("label[for='check-"+kor_id+"'] p").attr('style', 'color: grey;');
		}
		else
		{
			$("label[for='check-"+kor_id+"'] img").attr('style', 'filter: grayscale(0%);');
	        $("label[for='check-"+kor_id+"'] p").attr('style', 'color: white;');
		}
    };

	var UcitajPreporuceneLokacije = function()
	{
	  	var config= {
			method:'GET',
			url:'preporuke.php?action_id=dohvati_preporucene_lokacije'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.preporuke = response.data;

			if($scope.preporuke.length == 0)
			{
				$('#no_img').attr('style', 'display: block;');
				$('#no_text').attr('style', 'display: block;');
			}
			else
			{
				$('#no_img').attr('style', 'display: none;');
				$('#no_text').attr('style', 'display: none;');
			}

			$timeout(function () {
               $scope.PreporucenaLokacijaKarta();
            }, 1);
		},
		function(error)
		{
			console.log(error);
		});
	}

	UcitajPreporuceneLokacije();

	$scope.PreporucenaLokacijaKarta = function()
	{
		for(var i=0;i<$scope.preporuke.length;i++)
		{
			var locationLat = parseFloat($scope.preporuke[i].lat);
			var locationLng = parseFloat($scope.preporuke[i].lng);

		  	var location = {lat: locationLat, lng: locationLng};
		  
		  	var map = new google.maps.Map(document.getElementById('preporucena_lokacija_map-' + $scope.preporuke[i].id_preporuke), {zoom: 16, center: location, streetViewControl: false, mapTypeControl: false});

		  	var marker = new google.maps.Marker({position: location, map: map});
		}
	}

	$scope.PrikaziKomentarPreporuke = function(id_preporuke)
	{
		$('#preporuka_naziv_mjesta-' + id_preporuke).attr('style', 'opacity: 0;');
		$('#preporuka_lokacija-' + id_preporuke).attr('style', 'opacity: 0;');
		$('#preporuka_ocjena-' + id_preporuke).attr('style', 'opacity: 0;');
		$('#preporuka_preporucitelj-' + id_preporuke).attr('style', 'opacity: 0;');
		$('#preporuka_spremi-' + id_preporuke).attr('style', 'opacity: 0;');

		$('#preporuka_komentar-' + id_preporuke).attr('style', 'display: block;');
		$('#zatvori_komentar_preporuke-' + id_preporuke).attr('style', 'display: block;');
	}

	$scope.SakrijKomentarPreporuke = function(id_preporuke)
	{
		$('#preporuka_komentar-' + id_preporuke).attr('style', 'display: none;');
		$('#zatvori_komentar_preporuke-' + id_preporuke).attr('style', 'display: none;');

		$('#preporuka_naziv_mjesta-' + id_preporuke).attr('style', 'opacity: 1;');
		$('#preporuka_lokacija-' + id_preporuke).attr('style', 'opacity: 1;');
		$('#preporuka_ocjena-' + id_preporuke).attr('style', 'opacity: 1;');
		$('#preporuka_preporucitelj-' + id_preporuke).attr('style', 'opacity: 1;');
		$('#preporuka_spremi-' + id_preporuke).attr('style', 'opacity: 1;');
	}

	$scope.SpremiLokaciju = function(value)
	{
		var config= {
			method:'POST',
			url:'preporuke.php',
			data: {
				'action_id': 'spremi_preporucenu_lokaciju',
				'id_preporuke': $scope.save_id_preporuke,
				'id_lokacije': $scope.save_id,
				'naziv': $scope.save_naziv,
				'mjesto': $scope.save_mjesto,
				'ocjena': $scope.save_ocjena,
				'lat': $scope.save_lat,
				'lng': $scope.save_lng,
				'vidljivost': value
			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			if(response.data == 'postoji')
			{
				alert('Lokacija je već spremljena!');
			}
			else
			{
				UcitajPreporuceneLokacije();

				$('input[type=radio]').prop("checked", false);
		        $("#myForm").hide();

	        	$('#myAddAlert').show();
				$timeout(function () {
	                $('#myAddAlert').hide();
	            }, 2000);
			}
			
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.OpenSaveForm = function(event, id_preporuke, id, naziv, mjesto, ocjena, lat, lng)
	{
		$scope.save_id_preporuke = id_preporuke;
		$scope.save_id = id;
		$scope.save_naziv = naziv;
		$scope.save_mjesto = mjesto;
		$scope.save_ocjena = ocjena;
		$scope.save_lat = lat;
		$scope.save_lng = lng;

		var x = event.pageX;
  		var y = event.pageY;
  		//console.log(x,y);
  		document.getElementById("myForm").style.position = 'absolute';
  		document.getElementById("myForm").style.left = (x-70) + 'px';
 	 	document.getElementById("myForm").style.top = (y-70) + 'px';
 	 	document.getElementById("myForm").style.display = 'block';
 	 	
	}

	$(document).mouseup(function(e) 
	{
	    var container = $("#myForm");

	    if (!container.is(e.target) && container.has(e.target).length === 0) 
	    {
	    	$('input[type=radio]').prop("checked", false);
	        container.hide();
	    }
	});

	$scope.ObrisiPreporuku = function(id_preporuke)
	{
		var config= {
			method:'POST',
			url:'preporuke.php',
			data: {
				'action_id': 'obrisi_preporuku',
				'id_preporuke': id_preporuke
				}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			UcitajPreporuceneLokacije();

        	$('#myDeletePreporukaAlert').show();
			$timeout(function () {
                $('#myDeletePreporukaAlert').hide();
            }, 2000);
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.PrikaziPrimljeno = function()
	{
		UcitajPreporuceneLokacije();
		$('.preporuka_search').attr('style', 'display: none;');
		$('#sortiraj_preporuke').attr('style', 'display: none;');
		$('#no_sent_img').attr('style', 'display: none;');
		$('#no_sent_text').attr('style', 'display: none;');
		$('#poslanelokacije-container').attr('style', 'display: none;');
		$('#preporuceno_spremnik').attr('style', 'display: block;');
		$('#preporuke_primljeno').attr('style', 'color: darkorange;');
		$('#preporuke_poslano').attr('style', 'color: white;');

	}

	$scope.PrikaziPoslano = function()
	{
		$('.preporuka_search').attr('style', 'display: block;');
		$('#sortiraj_preporuke').attr('style', 'display: block;');
		$('#preporuceno_spremnik').attr('style', 'display: none;');
		$('#preporuke_primljeno').attr('style', 'color: white;');
		$('#preporuke_poslano').attr('style', 'color: darkorange;');

		var config= {
			method:'GET',
			url:'preporuke.php?action_id=dohvati_poslane_preporuke'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.poslane_preporuke=response.data;
			if($scope.poslane_preporuke.length == 0)
			{
				$('#no_sent_img').attr('style', 'display: block;');
				$('#no_sent_text').attr('style', 'display: block;');
				$('#poslanelokacije-container').attr('style', 'display: none;');
			}
			else
			{
				$('#no_sent_img').attr('style', 'display: none;');
				$('#no_sent_text').attr('style', 'display: none;');
				$('#poslanelokacije-container').attr('style', 'display: block;');
			}
		},
		function(error)
		{
			console.log(error);
		});
	}
	
	$scope.OtvoriKomentarPreporukeModal = function(id_preporuke, komentar)
	{
		$scope.id_poslane_preporuke = id_preporuke;

		var config= {
			method:'POST',
			url:'preporuke.php',
			data: {
				'action_id': 'dohvati_primatelje',
				'id_preporuke': id_preporuke
				}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.primatelji_preporuke = response.data;
			if($scope.primatelji_preporuke.length == 0)
			{
				$("#KomentarPreporukeModal").modal("hide");
				$scope.ObrisiPoslanuPreporuku(id_preporuke);
			}
		},
		function(error)
		{
			console.log(error);
		});

		$("#textarea_uredi_komentar").val(komentar);
		$("#KomentarPreporukeModal").modal();
	}


	$scope.UrediPreporuku = function()
	{
		var checkedUsers = [];
	    $scope.primatelji_preporuke.forEach(function(korisnik)
	    {
		    if (korisnik.selected)
		    {
			    checkedUsers.push(korisnik.id);
		    }
	    });

	    $scope.result = checkedUsers;
	    //console.log($scope.result);

		if($("#textarea_uredi_komentar").val() != "")
		{
			var config= {
				method:'POST',
				url:'preporuke.php',
				data: {
					'action_id': 'uredi_preporuku',
					'id_preporuke': $scope.id_poslane_preporuke,
					'komentar' : $("#textarea_uredi_komentar").val(),
					'primatelji' : $scope.result
					}
			};

			var request=$http(config);

			request.then(function(response)
			{				
				console.log(response.data);
				$scope.PrikaziPoslano();
				$scope.OtvoriKomentarPreporukeModal($scope.id_poslane_preporuke, $("#textarea_uredi_komentar").val());

				$('#myUpdatePreporukaAlert').show('fade');
				$timeout(function () {
	                $('#myUpdatePreporukaAlert').hide('fade');
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

	$scope.ObrisiPoslanuPreporuku = function(id_preporuke)
	{
	    var config= {
			method:'POST',
			url:'preporuke.php',
			data: {
				'action_id': 'obrisi_poslanu_preporuku',
				'id_preporuke': id_preporuke
				}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.PrikaziPoslano();

			$('#myDeletePreporukaAlert').show('fade');
			$timeout(function () {
                $('#myDeletePreporukaAlert').hide('fade');
            }, 1000);
		},
		function(error)
		{
			console.log(error);
		});
	}
});