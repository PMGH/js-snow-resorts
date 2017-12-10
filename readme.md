# **Global Snow Resorts**    

![Image](/screenshots/global_snow_resorts_home.jpeg)
![Image](/screenshots/global_snow_resorts_rhone-alps-sav.jpeg)

## Project Specification:

* Fetch information from an API.
* Display/Analyse the information in the browser using DOM manipulation/Charts/Maps/Canvas etc.  

## Project:    

The project was used to gain practice in requesting data from an API and displaying that information on a map or chart.  

Initially global snow area data is retrieved from the Ski Map API (https://skimap.org/SkiAreas/index.json) using an XMLHttpRequest, event listeners and callbacks. A Highchart Pie Chart is created using JavaScript then populated from the  Ski Map data using the Highchart API (http://code.highcharts.com/highcharts.js). The Google Maps API (https://maps.googleapis.com/maps/api/js) was used to create a Map Wrapper object centered on Meribel, France (my favourite resort). Markers with an associated clickable InfoWindow were then created for each ski area present in the Ski Map API data. Info Windows were populated with associated region, ski area name and location data (latitude and longitude).

The Select on the main page allows the user to choose a region (populated from the Ski Map API data) which triggers an onChange event to repopulate the page with the ski areas from the chosen region. 2-day weather data is then retrieved using the World Weather Online API for each ski area and populated next to the details of the relevant ski area.

UPDATE:  Unfortunately at the time of writing this, the Ski Map website was down so further progress on applying the weather data to the ski area was halted.  


## Built With:  
* JavaScipt   
* Ski Map API (https://skimap.org/SkiAreas/index.json)  
* Highcharts API (http://code.highcharts.com/highcharts.js)  
* Google Maps API (https://maps.googleapis.com/maps/api/js)  
* World Weather Online API (https://developer.worldweatheronline.com/api/)


## Authors  
* Peter McCready - Initial work    
