var MapWrapper = function(container, coords, zoom){
  this.googleMap = google.map.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    icon: "/icons/gnss.png",
    infoWindowOpen: false,
    map: this.googleMap
  });

  this.markers.push(marker);
  marker.infoWindow = new google.maps.InfoWindow({
    content: `${marker.position}`  // resort name and location
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
