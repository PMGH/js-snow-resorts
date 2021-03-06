var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var resortIndexRequest = function(){
  var url = "https://skimap.org/SkiAreas/index.json";
  makeRequest(url, resortIndexRequestComplete);
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

  pieChartSkiAreaByRegion(resortsData, regions);

  populateMap(resortsData);
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
  return regions;
}

var trimDataSet = function(resortsData, regionName){
  var trimmedDataSet = [];
  for(var resort of resortsData){
    if ((resort.Region[0] != undefined) && (resort.Region[0].name === regionName)){
      trimmedDataSet.push(resort.SkiArea);
    }
  }
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
  var head = document.getElementById('page-header');
  var main = document.getElementById('page-main');
  removeChildNodes(main);
  // var numDaysSelect = document.createElement('select');
  // numDaysSelect.id = "num-days-select";

  skiAreas.forEach(function(area){
    // get area details
    // areaId made global to be accessible to the weatherRequest
    var areaId = area.id;
    var areaName = area.name;
    var areaWebsite = area.official_website;
    var areaLatitude = area.geo_lat;
    var areaLongitude = area.geo_lng;
    var areaLocation = {
      lat: areaLatitude,
      lng: areaLongitude
    }

    // request weather data
    weatherRequest(areaId, areaLocation, "2");

    // create HTML elements
    var containerSection = document.createElement('section');
    var detailsDiv = document.createElement('div');
    detailsDiv.id = areaId;

    var skiAreaName = document.createElement('h3');
    var skiAreaLink = document.createElement('a');
    var skiAreaLocation = document.createElement('h5');

    // set ski area details elements
    detailsDiv.className = "skiArea";
    skiAreaName.className = "skiAreaName";
    skiAreaLink.className = "skiAreaLink";
    skiAreaLocation.className = "skiAreaLocation";

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

var makeWeatherRequest = function(areaId, url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', function(){
    callback(areaId);
  }.bind(this));
  request.send();
}


var weatherRequest = function(areaId, coords, days){
  var id = areaId;
  var token = "ebbbfe3e5f59416284e222010170812";
  var lat = coords.lat;
  var long = coords.lng;
  var num_days = days;
  console.log("Preparing request for Id: ", areaId);
  var url = "https://api.worldweatheronline.com/premium/v1/ski.ashx?key=" + token + "&q=" + lat + "," + long + "&num_of_days=" + num_days + "&includeLocation=no&format=json";
  console.log(url);
  // makeRequest(url, weatherRequestComplete);

  // pass areaId into weatherRequestComplete???
  makeWeatherRequest(id, url, function(){
    weatherRequestComplete(id);
  });
}

var weatherRequestComplete = function(areaId){
  console.log("Requested weather for Id: ", areaId);
  if (this.status != 200){
    console.log("No luck");
    return;
  }
  console.log("Status code 200");
  var jsonString = this.responseText;
  var weatherData = JSON.parse(jsonString);
  console.log(weatherData);
  populateWeather(areaId, weatherData.data.weather);
}

var populateWeather = function(areaId, weather){
  console.log(`Id ${areaId}: `, weather);
  var detailsDiv = document.getElementById(areaId);

  weather.forEach(function(forecast){
    var weatherDiv = document.createElement('div');
    var date = document.createElement('h5');
    var chanceOfSnowfall = document.createElement('h5');
    var totalSnowfall = document.createElement('h5');

    weatherDiv.className = "weather";
    weatherDiv.id = forecast.date;

    date.innerText = forecast.date;
    chanceOfSnowfall.innerText = forecast.chanceofsnow;
    totalSnowfall.innerText = forecast.totalSnowfall_cm;

    weatherDiv.appendChild(date);
    weatherDiv.appendChild(chanceOfSnowfall);
    weatherDiv.appendChild(totalSnowfall);
    detailsDiv.appendChild(weatherDiv);
  });

}


var pieChartSkiAreaByRegion = function(apiData, regions){
  var main = document.getElementById('page-main');
  var id = 'region-pie-chart';

  var chartDiv = document.createElement('div');
  chartDiv.id = id;
  main.appendChild(chartDiv);

  var container = document.querySelector('#' + id);
  var title = 'Ski Areas by Region';
  var series = [{
    name: 'Ski Areas by region',
    data: []
  }];
  // get region objects
  var regionObjects = [];
  apiData.forEach(function(item){
    if (item.Region[0] != undefined){
      var region = {
        name: item.Region[0].name,
        y: 1
      }
      regionObjects.push(region);
    }
  });
  // count occurrences
  var counts = [];
  for (var region of regions){
    var count = {
      name: region,
      y: 0
    }
    counts.push(count);
  }
  for (var count of counts){
    for (var object of regionObjects){
      if (count.name === object.name){
        count.y += 1;
      }
    }
  }
  // push to series data
  counts.forEach(function(count){
    series[0].data.push(count);
  });
  // create pie chart
  new PieChart(container, title, series);
}


var populateMap = function(resortsData){
  var main = document.getElementById('page-main');
  var container = document.createElement('div');
  container.id = 'main-map';

  var center = { lat: 45.3982, lng: 6.5657 };
  var zoom = 10;
  var mainMap = new MapWrapper(container, center, zoom);
  // main.appendChild(container);

  // search box
  var input = document.createElement('input');
  input.id = "search-input";
  input.class = "controls";
  input.type = "text";
  input.placeholder = "Search for a location";
  console.log(input);
  // create new google maps search box from input element
  mainMap.createSearchBox(input);

  // append elements
  main.appendChild(container);

  // populate map with resort markers
  resortsData.forEach(function(area){
    var region = (area.Region[0] != undefined) ? area.Region[0].name : "No region data";
    var skiArea = {
      region: region,
      name: area.SkiArea.name,
      location: {
        lat: parseFloat(area.SkiArea.geo_lat),
        lng: parseFloat(area.SkiArea.geo_lng)
      }
    }
    mainMap.addMarker(skiArea);
  });

}



var removeChildNodes = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

var app = function(){
  resortIndexRequest();
}

window.addEventListener('load', app);
