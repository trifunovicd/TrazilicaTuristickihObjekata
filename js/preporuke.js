oModul.directive("preporukeModal", function() {
  return {
    template : `<div id="PreporukeModal" class="modal fade" role="dialog" data-backdrop="static">
				  	<div class="modal-dialog">
				    	<div class="modal-content">
					      	<div class="modal-header">
					        	<button type="button" class="close" data-dismiss="modal" style="color: white">&times;</button>
					        	<h4 class="modal-title">Preporuči lokaciju ~ <i>{{preporuka_naziv}}</i></h4>
					      	</div>
					      	<div class="modal-body" > 
					     		<textarea style="resize: none;" id="textarea_preporuke" rows="9" cols="76" maxlength="500" placeholder="Unesite komentar..."></textarea>
					     	
						     	<div class="search_korisnik">
			                        <span class="glyphicon glyphicon-search" style="color: white;"></span>
			                        <input id="search_korisnik" placeholder="Pretraži korisnika" ng-model="sKorisnik">
			                    </div>

						     	<div style="display:inline-block;" ng-repeat="korisnik in primatelji | filter : sKorisnik | orderBy : 'prezime'">
							     	<label style="text-align:center; cursor:pointer;" for="{{'check-' + korisnik.id}}" data-toggle="tooltip" title="{{ '@' + korisnik.korisnicko_ime}}" tooltip>
										<img ng-src="{{korisnik.slika}}" height="60px" width="60px" id="preporuke_slika">
										<p id="preporuke_korisnik">{{korisnik.ime}}<br>{{korisnik.prezime}}</p>
									</label>
									<input type="checkbox" id="{{'check-' + korisnik.id}}" name="check" value="{{korisnik.id}}" style="display:none" ng-model='korisnik.selected' ng-change="Check(korisnik.id)"/>
								</div>
					      	</div>
					      	<div class="modal-footer">
					      		<button type="button" class="btn btn-default" id="preporuci_button" ng-click="Preporuci()"><span class="glyphicon glyphicon-send"></span></button>
					      	</div>
				    	</div>
				  	</div>
				</div>`
  };
});

oModul.directive("preporukaAlert", function() {
  return {
    template : `<div id="myPreporukaAlert" class="alert alert-success collapse text-center">Preporuka poslana!</div>`
  };
});

oModul.directive("deletePreporukaAlert", function() {
  return {
    template : `<div id="myDeletePreporukaAlert" class="alert alert-danger collapse text-center">Preporuka obrisana!</div>`
  };
});

oModul.controller("preporukeController", function($scope, $http, $timeout) {

	$('#PreporukeModal').on('hidden.bs.modal', function ()
	{
		$(this).find("textarea").val('');
		$(this).find("img").attr('style', 'border: none;');
		$(this).find("p").attr('style', 'color: white;');
	});

	$scope.Check = function(kor_id)
	{
		if($("input[id='check-"+kor_id+"']").is(':checked'))
		{
	        $("label[for='check-"+kor_id+"'] img").attr('style', 'border-color: cornflowerblue; border-style: solid; border-width: 3px;');
	        $("label[for='check-"+kor_id+"'] p").attr('style', 'color: cornflowerblue;');
		}
		else
		{
			$("label[for='check-"+kor_id+"'] img").attr('style', 'border: none;');
	        $("label[for='check-"+kor_id+"'] p").attr('style', 'color: white;');
		}
    };

	$scope.PreporukeModal = function(id,naziv,mjesto,ocjena,lat,lng)
	{
		$scope.preporuka_id_lokacije = id; 
		$scope.preporuka_naziv = naziv;
		$scope.preporuka_mjesto = mjesto;
		$scope.preporuka_ocjena = ocjena;
		$scope.preporuka_lat = lat;
		$scope.preporuka_lng = lng;

		var config= {
			method:'GET',
			url:'preporuke.php?action_id=dohvati_korisnike'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			//console.log(response.data);
			$scope.primatelji = response.data;
			$("#PreporukeModal").modal();
		},
		function(error)
		{
			console.log(error);
		});
		
	}
	
	$scope.Preporuci = function()
	{
	    var checkedUsers = [];
	    $scope.primatelji.forEach(function(korisnik)
	    {
		    if (korisnik.selected)
		    {
			    checkedUsers.push(korisnik.id);
		    }
	    });

	    $scope.result = checkedUsers;
	    //console.log($scope.result);
	 	
	 	if($('#textarea_preporuke').val() != "")
	 	{
	 		if($scope.result.length != 0)
		    {
		    	var config= {
					method:'POST',
					url:'preporuke.php',
					data: {
						'action_id': 'preporuci',
						'komentar' : $('#textarea_preporuke').val(),
						'id_lokacije' : $scope.preporuka_id_lokacije,
						'naziv' : $scope.preporuka_naziv,
						'mjesto' : $scope.preporuka_mjesto,
						'ocjena' : $scope.preporuka_ocjena,
						'lat' : $scope.preporuka_lat,
						'lng' : $scope.preporuka_lng,
						'primatelji' : $scope.result
		 			}
				};

				var request=$http(config);

				request.then(function(response)
				{				
					console.log(response.data);
					$("#PreporukeModal").modal("hide");
					$('#myPreporukaAlert').show('fade');
					$timeout(function () {
		                $('#myPreporukaAlert').hide('fade');
		            }, 1000);
				},
				function(error)
				{
					console.log(error);
				});
		    }
		    else
		    {
		    	alert('Izaberite korisnika!');
		    }
	 	}
	 	else
	 	{
	 		alert('Popunite polje za unos komentara!');
	 	}
	    
    }
});