var map, infoWindow, ubicacion;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -12.1188, lng: -77.037},
    zoom: 18
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
      console.log(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  //autocompletePartida
  var inputSalida = document.getElementById('input-partida');
  var autocompletePartida = new google.maps.places.Autocomplete(inputSalida);
  autocompletePartida.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  autocompletePartida.addListener('place_changed', function() {
    infowindow.close();
    var place = autocompletePartida.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });

  //autocompleteLlegada
  var inputLlegada = document.getElementById('input-llegada');
  var autocompleteLlegada = new google.maps.places.Autocomplete(inputLlegada);
  autocompleteLlegada.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  autocompleteLlegada.addListener('place_changed', function() {
    infowindow.close();
    var place = autocompleteLlegada.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
