// JavaScript source code
var meteoControllers = angular.module('meteoControllers', []);


meteoControllers.controller('MainController', ['$scope', '$http',
 function ($scope, $http) {

     $scope.recherche = function () {
         /* appel AJAX � l�API openweathermap */
         var responsePromise = $http.get('https://demo.bilelz.fr/owmap/forecast/?q=' + $scope.city + '&units=metric&appid=f629597651fec6baad6c6287b0230c78')
         responsePromise.success(function (data) {
             $scope.meteo = data;
         });
         responsePromise.error(function (data) {
             /* en cas d�erreur */
             $scope.errorMsg = "Hum. Error... please retry.";
         });
         // appel AJAX pour recevoir les donn�es des 5 prochaines jours	    
         $http.get('https://demo.bilelz.fr/owmap/forecast/?q=' + $scope.city + '&units=metric&appid=f629597651fec6baad6c6287b0230c78')
         responsePromise.success(function(data) {
             $scope.forecast = data;
         }).error(function(data) {
             $scope.loadingMsg = "Erreur pour les donn�es sur 5 jours...";
         });

     }
  
     /* .success(function(data){$scope.forecast=data;}).error(function(data){$scope.loadingMsg="erreur pour les donn�es sur 5 jours...";});*/
     $scope.gps = function () {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(showPosition, showError);
         } else {
             $scope.errorMsg = "Geolocation is not supported by this browser.";
         }
     }

     function showPosition(position) {
         $scope.errorMsg = "";
         /* appel AJAX � l�API openweathermap */
         $http.get('https://demo.bilelz.fr/owmap/?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=0ada432b59deb9716c357092c5f79be6') /* mettre votre API id */
             .success(function (data) {
                 /* on met dans l�objet meteo les donn�es retourn�es par openweathermap */
                 $scope.meteo = data;
                 if (data == "") {
                     $scope.errorMsg = "Pas de r�sultat pour votre recherche...";
                 }
             }).error(function (data) {
                 /* en cas d�erreur */
                 $scope.errorMsg = "Hum. Error... please retry.";
             });
     }

     function showError(error) {
         switch (error.code) {
             case error.PERMISSION_DENIED:
                 $scope.errorMsg = "User denied the request for Geolocation."
                 break;
             case error.POSITION_UNAVAILABLE:
                 $scope.errorMsg = "Location information is unavailable."
                 break;
             case error.TIMEOUT:
                 $scope.errorMsg = "The request to get user location timed out."
                 break;
             case error.UNKNOWN_ERROR:
                 $scope.errorMsg = "An unknown error occurred."
                 break;
         }
     }
 }]);