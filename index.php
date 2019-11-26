<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="hr">
    <head>
        <meta charset="UTF-8">
        <title>Tražilica turističkih objekata</title>
        <script src="assets/plugins/jquery/jquery-3.2.1.min.js"></script>
        <link rel="stylesheet" href="assets/plugins/bootstrap-3.3.7-dist/css/bootstrap.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/css/select2.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/login.css">
        <link rel="stylesheet" href="css/style.css">
        <script src="assets/plugins/AngularJS/angular.min.js"></script>
        <script src="assets/plugins/AngularJS/angular-route.min.js"></script>
        <script src="assets/plugins/AngularJS/angular-cookies.min.js"></script>
    </head>
    <body ng-app="app">

    	<div class="container-fluid">
    		
    		<div ng-view></div>

    	</div>

        <script src="assets/plugins/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/js/select2.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNbXYCxvcGcmv4J_Zr_8shCctINpArEcs&libraries=places"></script>
        <script src="js/login.js"></script>    
        <script src="js/pretraga.js"></script>
        <script src="js/moje_lokacije.js"></script>
        <script src="js/moj_profil.js"></script>
        <script src="js/registracija.js"></script>
        <script src="js/komentari.js"></script>
        <script src="js/preporuke.js"></script>
        <script src="js/moje_preporuke.js"></script>
        <script src="js/moji_komentari.js"></script>
        <script src="js/korisnici.js"></script>
    </body>
</html>