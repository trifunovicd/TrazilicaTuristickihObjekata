oModul.directive("kartaModal", function() {
  return {
    template : `<div id="myModal" class="modal fade" role="dialog" data-backdrop="static">
			        <div class="modal-dialog">
			            <div class="modal-body" id="mapModal"> </div>      
			            <div class="modal-footer">
			                <button id="closeModal" type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
			            </div>
			        </div>
			    </div>`
  };
});

oModul.directive("addLocationAlert", function() {
  return {
    template : `<div id="myAddAlert" class="alert alert-success collapse text-center">Lokacija spremljena!</div>`
  };
});

oModul.directive("formPopup", function() {
  return {
    template : `<div class="form-popup" id="myForm" style="display: none;">
				    <form class="form-container">
					  	<div class="form-group">
					    	<label for="privatno"><b>Privatno</b></label>
					    	<input type="radio" name="vidljivost" ng-model="value" value="0" id="privatno" ng-click='SpremiLokaciju(value)'>
						</div>
						<div class="form-group">
					    	<label for="javno"><b>Javno</b></label>
					    	<input type="radio" name="vidljivost" ng-model="value" value="1" id="javno" ng-click='SpremiLokaciju(value)'>
						</div>
				    </form>
				</div>`
  };
});

oModul.controller("pretragaController", function($scope, $http, $timeout, $cookies, $window) {

	var ActivatePlacesSearch = function()
	{
	    var input = document.getElementById('lokacija');
	    var autocomplete = new google.maps.places.Autocomplete(input); 
	    google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    
		    var place = autocomplete.getPlace();
		    $scope.lat = place.geometry.location.lat();
		    $scope.lng = place.geometry.location.lng();
		});
	}

	ActivatePlacesSearch();

	var SelectTip = function()
	{
		$.getJSON('assets/places.json', function(podaci) {
		    
		    var types=podaci;

		    for(var i = 0; i < types.length; i++)
		    {
		        var data = {
				    id: types[i].id,
				    text: types[i].name
				};

				var newOption = new Option(data.text, data.id, false, false);
				$('#tip').append(newOption).trigger('change');
			    
			}
			$('#tip').select2({placeholder: {id: '-1', text:'-- Odaberite tip --'}});
		});
	}

	SelectTip();

	var initMap = function()
	{
		var center_location = {lat: $scope.lat, lng: $scope.lng};

	  	var map = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: center_location});

		for(var i = 0; i < $scope.msg.length; i++)
		{
			var location={
				coords: {lat: $scope.msg[i].lat, lng: $scope.msg[i].lng},
				content: "<b>" + $scope.msg[i].naziv + "</b> <br>" + $scope.msg[i].mjesto + "<br> Ocjena: " + $scope.msg[i].ocjena
			}
			addMarker(location);
		}

	    function addMarker(lokacija)
		{
			var marker = new google.maps.Marker({position: lokacija.coords, map: map});
			var infoWindow = new google.maps.InfoWindow({ content: lokacija.content });
			marker.addListener('click', function(){
	        infoWindow.open(map, marker);
	      });
		}
	}

	$scope.Submit = function()
	{
		var sTip=$('#tip').val();
		var sRadijus=$('#radijus').val();
		var sLokacija=$('#lokacija').val();

		if($scope.lat != undefined || $scope.lng != undefined)
		{
			if(sTip != "-1" && sLokacija != "")
			{
				var config= {
					method:'POST',
					url:'pretraga.php',
					data: {
						'action_id': 'dohvati_lokacije',
						'tip': sTip,
						'radijus': sRadijus,
						'lat': $scope.lat,
						'lng': $scope.lng
		 			}
				};

				var request=$http(config);

				request.then(function(response)
				{
					if(response.data.length==0)
					{
						$('#tablica-lokacije').attr('style', 'display: none');
						$('.tekst').attr('style', 'text-align:center; display: block; margin-top: 30px;');
						$('.no_location').attr('style', 'opacity: 0.3; margin: auto; display: block');
					}
					else
					{
						if(response.data.slice(-1)[0]['true'] == 1)
						{
							$scope.pagetoken = response.data.slice(-1)[0]['pagetoken'];
							response.data.pop();
							$('#ucitaj_vise').show();
						}
						else
						{
							$scope.pagetoken = null;
							$('#ucitaj_vise').hide();
						}
						//console.log($scope.pagetoken);

						$scope.msg=response.data;
						console.log($scope.msg);

						$('.tekst').attr('style', 'text-align:center; display: none; margin-top: 30px;');
						$('.no_location').attr('style', 'opacity: 0.3; margin: auto; display: none');
						$('#tablica-lokacije').attr('style', 'display: table');
						initMap();
					}
				},
				function(error)
				{
					$scope.msg=error.data;
					console.log($scope.msg);
				});
			}
			else
			{
				alert("Popunite sva polja!");
			}
			
		}
		else
		{
			alert('Neispravan unos lokacije!');
		}
		
	}

	$scope.UcitajViseLokacija = function()
	{
		var config= {
			method:'POST',
			url:'pretraga.php',
			data: {
				'action_id': 'dohvati_vise_lokacija',
				'pagetoken': $scope.pagetoken
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{
			if(response.data.slice(-1)[0]['true'] == 1)
			{
				$scope.pagetoken = response.data.slice(-1)[0]['pagetoken'];
				response.data.pop();
				$('#ucitaj_vise').show();
			}
			else
			{
				$scope.pagetoken = null;
				$('#ucitaj_vise').hide();
			}
			//console.log($scope.pagetoken);

			$scope.dodatne_lokacije=response.data;
			console.log($scope.dodatne_lokacije);

			$scope.msg = $scope.msg.concat($scope.dodatne_lokacije);

			initMap();
			
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.SpremiLokaciju = function(value)
	{
		var config= {
			method:'POST',
			url:'moje_lokacije.php',
			data: {
				'action_id': 'new_location',
				'id': $scope.save_id,
				'id_korisnika': $cookies.get('logged_user_id'),
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
			console.log(response);

			if(response.data == 'postoji')
			{
				alert('Lokacija je već spremljena!');
				$('input[type=radio]').prop("checked", false);
		        $("#myForm").hide();
			}
			else
			{
				$('input[type=radio]').prop("checked", false);
		        $("#myForm").hide();

				$('#myAddAlert').show('fade');
				$timeout(function () {
	                $('#myAddAlert').hide('fade');
	            }, 1000);
			}
			
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.OpenSaveForm = function(event, id, naziv, mjesto, ocjena, lat, lng)
	{
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
	
	$scope.prikazTablica=function()
	{
		$('#pregledButton').find('span').attr('class', 'glyphicon glyphicon-map-marker');
		$('#kartaPrikaz').attr('style', 'display: none');
		$('#tablicaPrikaz').attr('style', 'display: block');
	}

	$scope.prikazKarta=function()
	{
		$('#pregledButton').find('span').attr('class', 'glyphicon glyphicon-th-list');
		$('#tablicaPrikaz').attr('style', 'display: none');
		$('#kartaPrikaz').attr('style', 'display: block');
	}

	$scope.karta=true;
	$scope.Pregled=function()
	{
		if($scope.karta==true)
        {
         	$scope.prikazKarta();
         	$scope.karta = false;
        }
        else
        {
        	$scope.prikazTablica();
          	$scope.karta = true;
        }
	}
});