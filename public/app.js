var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}


var resortIndexRequestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var resortsData = JSON.parse(jsonString);
  var regions = getRegions(resortsData);
  var trimmedDataSet = trimDataSet(resortsData, "Quebec");
  createRegionSelector(regions);
  populateResorts(trimmedDataSet);
}

var getRegions = function(resortsData){
  var regions = [];
  for(var resort of resortsData){
    var region = resort.Region[0];
    if (region != undefined){
      if (!regions.includes(region.name)){
        regions.push(region.name);
      }
    }
  }
  regions.sort();
  console.log(regions);
  return regions;
}

var trimDataSet = function(resortsData, regionName){
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

var createRegionSelector = function(regions){
  var regionSelect = document.getElementById('region-select');
  var guidanceOption = document.createElement('option');
  guidanceOption.innerText = "Please select a region";
  guidanceOption.disabled = true;
  guidanceOption.selected = true;
  regionSelect.appendChild(guidanceOption);

  for (var region of regions){
    var regionOption = document.createElement('option');
    regionOption.innerText = region;
    regionSelect.appendChild(regionOption);
  }
}

var populateResorts = function(resortsData){
  var regionSelect = document.getElementById('region-select');
}

var resortIndexRequest = function(){
  var url = "https://skimap.org/SkiAreas/index.json";
  makeRequest(url, resortIndexRequestComplete);
}


var weatherRequestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var weatherData = JSON.parse(jsonString);
  console.log(weatherData);
}

var weatherRequest = function(coords){
  var token = "ebbbfe3e5f59416284e222010170812";
  var lat = "45.3982";
  var long = "6.5657";
  var num_days = "2";
  var url = "https://api.worldweatheronline.com/premium/v1/ski.ashx?key=" + token + "&q=" + lat + "," + long + "&num_of_days=" + num_days + "&includeLocation=no&format=json";
  makeRequest(url, weatherRequestComplete);
}


var app = function(){
  resortIndexRequest();
}

window.addEventListener('load', app);
