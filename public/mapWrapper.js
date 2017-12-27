var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
  this.newMarker = [];
}

MapWrapper.prototype.addMarker = function(skiArea){
  var marker = new google.maps.Marker({
    position: skiArea.location,
    icon: "/icons/gnss.png",
    infoWindowOpen: false,
    map: this.googleMap
  });

  this.markers.push(marker);
  var contentString = '<div id="content">'+
  `<h4 id="ski-area-region">${skiArea.region}</h4>`+
  '<div id="bodyContent">'+
  `<h3 id="ski-area-name">${skiArea.name}</h3>` +
  `<h5>Location: ${marker.position}</h5>`+
  '</div>'+
  '</div>';
  marker.infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function(){
    for (var mark of this.markers){
      if (mark.infowindowOpen){
        mark.infowindow.close();
      }
    }
    marker.infowindow.open(this.googleMap, marker);
    marker.infowindowOpen = true;
  }.bind(this));

}

MapWrapper.prototype.centerFunction = function(coords){
  this.googleMap.setCenter(coords);
  this.googleMap.setMapTypeId('hybrid');
  this.googleMap.setZoom(10);
}

MapWrapper.prototype.whereAmI = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var coords = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.googleMap.setCenter(coords);
    this.googleMap.setMapTypeId('hybrid');
    this.googleMap.setZoom(19);
    this.addMarker(coords);
  }.bind(this));
}

MapWrapper.prototype.createSearchBox = function(input){
  var searchBox = new google.maps.places.SearchBox(input);
  this.googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // this.googleMap.addListener('bounds_changed', function() {
  //   searchBox.setBounds(this.googleMap.getBounds());
  // });

  // Listen for the event fired when the user selects a prediction and retrieve
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var newPlace = place;
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      console.log(this);
      console.log(this.googleMap);

      this.createMarker(newPlace, icon);

      // this.addSearchedLocationMarker(newMarker);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

    }.bind(this));

    this.googleMap.fitBounds(bounds);

  }.bind(this));

}

MapWrapper.prototype.createMarker = function(place, icon){
  var newMarker = new google.maps.Marker({
    map: this.googleMap,
    icon: icon,
    title: place.name,
    position: place.geometry.location
  });
  console.log(newMarker);
  this.markers.push(newMarker);
}
