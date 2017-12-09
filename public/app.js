var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var resortRequestComplete = function(){

}


var resortIndexRequestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var resortsData = JSON.parse(jsonString);
  console.log(resortsData);
  var trimmedDataSet = trimDataSet(resortsData, "Quebec");
  populateResorts(trimmedDataSet);
}

var trimDataSet = function(resortsData, regionName){
  // get data to work with
  var trimmedDataSet = [];

  // console.log(resortsData[0]);
  // console.log(resortsData[0].Region);
  // console.log(resortsData[0].Region[0].name);
  for(var resort of resortsData){
    if ((resort.Region[0] != undefined) && (resort.Region[0].name === regionName)){
       trimmedDataSet.push(resort);
    }
  }
  console.log(trimmedDataSet);
  return trimmedDataSet;
}

var populateResorts = function(resortsData){

}

var resortIndexRequest = function(){
  // skimap - ski area request
  var url = "https://skimap.org/SkiAreas/index.json";
  makeRequest(url, resortIndexRequestComplete);
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
