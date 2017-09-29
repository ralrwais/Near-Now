var infowindow;

var sanfran = new google.maps.LatLng(37.773972, -122.431297);


var map = new google.maps.Map(document.getElementById('map'), {
		center: sanfran,
		zoom: 13
	});


$(".searchButton").on("click", function() {
	var input = $("#searchBox").val();

	var request = {
		location: sanfran,
		radius: '500',
		query: input,
		openNow: true

	};
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callback);

})

function callback(results, status) {
	
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for(var i = 0; i < 10; i++){
			if(results[i].photos) {
			var place = results[i];
			var placeID = place.place_id;	
			createMarker(place)

			var request = {
  				placeId: placeID
			};

		service = new google.maps.places.PlacesService(map);
		service.getDetails(request, callback);

		function callback(place, status) {
  		if (status == google.maps.places.PlacesServiceStatus.OK) {
  			var details = place;
  			
    		var name = details.name
    		
    		var address = details.formatted_address;
    		
    		var website = details.website;
    		
    		var pic = details.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250});
    		
    		var rating = details.rating + ' Stars';

    		var open = 'Open Now';

    		var template = `	
				<div class="card" style="width: 20rem;">
                      <img class="card-img-top img" src=${pic} alt="Card image cap">
                      <div class="card-block">
                        <h4 class="card-title" id="name">${name}</h4>
                        <p class="card-text" id="address">${address}</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item rating" id="rating">${rating}</li>
                        <li class="list-group-item open" id="open">${open}</li>
                      </ul>
                      <div class="card-block">
                        <a href=${website} class="card-link" id="website"> Visit Website </a>
                      </div>
                    </div>`

             var myCard = $('#media').append(template);
            }
		      }
	     }
  	} 
	} 
  $('#media').empty();
}

	 function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        });

        marker.addListener('click', toggleBounce);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
    }



