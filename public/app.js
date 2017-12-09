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
  var regionSelect = document.getElementById('region-select');

  populateRegionSelector(regions);
  regionSelect.addEventListener('change', function(){
    var selectedRegion = regionSelect[regionSelect.selectedIndex].value;
    var trimmedDataSet = trimDataSet(resortsData, selectedRegion);
    populateResorts(trimmedDataSet);
  });
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
  for(var resort of resortsData){
    if ((resort.Region[0] != undefined) && (resort.Region[0].name === regionName)){
      trimmedDataSet.push(resort.SkiArea);
    }
  }
  console.log(trimmedDataSet);
  return trimmedDataSet;
}

var populateRegionSelector = function(regions){
  var regionSelect = document.getElementById('region-select');
  removeChildNodes(regionSelect);
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

var populateResorts = function(skiAreas){
  var main = document.getElementById('page-main');
  removeChildNodes(main);
  skiAreas.forEach(function(area){
    // get area details
    var areaName = area.name;
    var areaWebsite = area.official_website;
    var areaLatitude = area.geo_lat;
    var areaLongitude = area.geo_lng;

    // create HTML elements
    var containerSection = document.createElement('section');
    var detailsDiv = document.createElement('div');

    var skiAreaName = document.createElement('h2');
    var skiAreaLink = document.createElement('a');
    var skiAreaLocation = document.createElement('h3');

    var weatherDiv_1 = document.createElement('div');
    var weatherDiv_2 = document.createElement('div');

    // set elements
    skiAreaName.innerText = areaName;
    if (areaWebsite != null){
      skiAreaLink.href = areaWebsite;
      skiAreaLink.innerText = `${areaName} official website`;
    } else {
      skiAreaLink.innerText = "No official website"
    }
    if (areaLatitude != null && areaLongitude != null){
      skiAreaLocation.innerText = `Latitude: ${areaLatitude}, Longitude: ${areaLongitude}`
    } else {
      skiAreaLocation.innerText = "No location available"
    }

    // append elements
    detailsDiv.appendChild(skiAreaName);
    detailsDiv.appendChild(skiAreaLink);
    detailsDiv.appendChild(skiAreaLocation);
    containerSection.appendChild(detailsDiv);
    main.appendChild(containerSection);

  });
}

var removeChildNodes = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
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
