oModul.directive("mojeLokacijeFormPopup", function() {
  return {
    template : `<div class="form-popup" id="myForm" style="display: none;">
				    <form class="form-container">
					  	<div class="form-group">
					    	<label for="privatno"><b>Privatno</b></label>
					    	<input type="radio" name="vidljivost" ng-model="value" value="0" id="privatno" ng-click='AzurirajLokaciju(value)'>
						</div>
						<div class="form-group">
					    	<label for="javno"><b>Javno</b></label>
					    	<input type="radio" name="vidljivost" ng-model="value" value="1" id="javno" ng-click='AzurirajLokaciju(value)'>
						</div>
				    </form>
				</div>`
  };
});

oModul.directive("editVisibilityAlert", function() {
  return {
    template : `<div id="myVisibilityAlert" class="alert alert-success collapse text-center">Lokacija ažurirana!</div>`
  };
});


oModul.controller("mojeLokacijeController", function($scope, $http, $timeout) {

	$("#sortiraj option[value='-vrijeme']").prop('selected', true);
    $scope.selected='-vrijeme';
	
	var LoadLocations=function()
	{
		
		var config= {
			method:'GET',
			url:'load_moje_lokacije.php'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			$scope.msg=response.data;
			console.log($scope.msg);

			if($scope.msg.length==0)
			{
				$('#tablica-mojelokacije').attr('style', 'display: none');
				$('#tablica-mojelokacije').after('<h4 style="text-align:center; color: white; font-weight: normal; margin-top: 30px;"><i> ~ Nemate spremljenih lokacija! Pritisnite <span class="glyphicon glyphicon-star-empty"></span> za spremanje lokacije! ~ </i></h4>');
				$('#tablica-mojelokacije').after('<img src="img/no_location.png" width="300px" height="300px" style="opacity: 0.3; margin: auto; display: block;">');
			}
			else
			{
				$('#tablica-mojelokacije').attr('style', 'display: table');
			}
		},
		function(error)
		{
			$scope.msg=error.data;
			console.log($scope.msg);
		});
	}

	LoadLocations();


	$scope.DeleteLocation=function(id,id_korisnika)
	{
		var config= {
			method:'POST',
			url:'moje_lokacije.php',
			data: {
				'action_id': 'delete_location',
				'id': id,
				'id_korisnika':id_korisnika
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response);
			LoadLocations();
			$('#myAlert').show('fade');
			$timeout(function () {
                $('#myAlert').hide('fade');
            }, 1000);
		},
		function(error)
		{
			console.log(error);
		});
	}
	
	$scope.AzurirajLokaciju = function(value)
	{
		var config= {
			method:'POST',
			url:'moje_lokacije.php',
			data: {
				'action_id': 'edit_location',
				'id': $scope.edit_id,
				'vidljivost': value 
 			}
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response);

			$('input[type=radio]').prop("checked", false);
	        $("#myForm").hide();
	        LoadLocations();
			$('#myVisibilityAlert').show('fade');
			$timeout(function () {
                $('#myVisibilityAlert').hide('fade');
            }, 1000);
		},
		function(error)
		{
			console.log(error);
		});
	}

	$scope.OpenForm = function(event, id, vidljivost)
	{
		$scope.edit_id = id;

		if(vidljivost == 'open')
		{
			$('#javno').prop('checked', true);
		}
		else
		{
			$('#privatno').prop('checked', true);
		}

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
	
});