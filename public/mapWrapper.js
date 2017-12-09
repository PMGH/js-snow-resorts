var mapWrapper = function(container, coords, zoom){
  this.googleMap = google.map.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}
