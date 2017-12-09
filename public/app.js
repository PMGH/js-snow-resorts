var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var weatherRequestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var weatherData = JSON.parse(jsonString);
  console.log(weatherData);
}

var weatherRequest = function(){
  // worldweatheronline request
  var token = "ebbbfe3e5f59416284e222010170812";
  var lat = "45.3982";
  var long = "6.5657";
  var url = "https://api.worldweatheronline.com/premium/v1/ski.ashx?key=" + token + "&q=" + lat + "," + long + "&format=json";
  makeRequest(url, weatherRequestComplete);
}


var app = function(){
  resortIndexRequest();
}

window.addEventListener('load', app);
