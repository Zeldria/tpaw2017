
 $(document).ready(function(){

 	$("#submitForm").on('click',function(){
 		if($("#inputEmail3").val()==""){
 			$('.modal-body').html('veuillez remplir les champs svp');
 			$('.modal').modal('show');

 		}
 		else {

 		    $('.modal-body').html('<p> vous êtes nés le 21/112/2000 et vous habitez <br/> <a href="https://developers.google.com/maps/documentation/static-maps/"> <img src="https://maps.googleapis.com/maps/api/staticmap?center=' + $("#inputAdresse").val() + '&markers=' + $("#inputAdresse").val() + '&size=640x400"/> </a> </p>');
 		$('.modal').modal('show');
 	}
 	});

 	$( "input.form-control" ).keyup(function() {
 		$(this).parent().parent().find(".keyCount").text($(this).val().length);
	});

 	
	});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
 	$("#inputAdress3").val(latlon);
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("demo").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("demo").innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("demo").innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            document.getElementById("demo").innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("demo").innerHTML = "An unknown error occurred."
            break;
    }
}

