oModul.controller("mojikomentariController", function($scope, $http) {

	$('#MojiKomentariModal').on('hidden.bs.modal', function ()
	{
		DohvatiKomentiraneLokacije();	
	});

	var DohvatiKomentiraneLokacije = function()
	{
		var config= {
			method:'GET',
			url:'komentari.php?action_id=dohvati_komentirane_lokacije'
		};

		var request=$http(config);

		request.then(function(response)
		{				
			console.log(response.data);
			$scope.komentirane_lokacije = response.data;
			if(response.data.length == 0)
			{
				$('#tablica-mojikomentari').attr('style', 'display: none');
				$('#tablica-mojikomentari').after('<h4 style="text-align:center; color: white; font-weight: normal; margin-top: 30px;"><i> ~ Niste komentirali niti jednu lokaciju! ~ </i></h4>');
				$('#tablica-mojikomentari').after('<img src="img/no_comment.png" width="300px" height="300px" style="opacity: 0.3; margin: auto; display: block;">');
			}
			else
			{
				$('#tablica-mojikomentari').attr('style', 'display: table');
			}
		},
		function(error)
		{
			console.log(error);
		});
	}
	DohvatiKomentiraneLokacije();
});