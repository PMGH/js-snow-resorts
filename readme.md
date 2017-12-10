# **Global Snow Resorts**    

![Image](/screenshots/global_snow_resorts_home.jpeg)
![Image](/screenshots/global_snow_resorts_rhone-alps-sav.jpeg)

## Project:    

Global snow area data was retrieved from the Ski Map API (https://skimap.org/SkiAreas/index.json) using an XMLHttpRequest, event listeners and callbacks. A Highchart Pie Chart was created using JavaScript then populated from the  Ski Map data using the Highchart API (http://code.highcharts.com/highcharts.js). The Google Maps API (https://maps.googleapis.com/maps/api/js) was used to plot a marker with an associated clickable InfoWindow for each ski area. Info Windows were populated with associated region, ski area name and location data (latitude and longitude).

A select on the main page allows the user to select a region which triggers an onChange event to repopulate the page with the ski areas from that region. 2-day weather data is then retrieved using the World Weather Online API for each location and populated next to the details of the relevant ski area.

UPDATE:  Unfortunately at the time of writing, the Ski Map website was down so further progress on applying the weather data to the ski area was halted.  


## Built With:  
* JavaScipt   
* Ski Map API (https://skimap.org/SkiAreas/index.json)  
* Highcharts API (http://code.highcharts.com/highcharts.js)  
* Google Maps API (https://maps.googleapis.com/maps/api/js)  
* World Weather Online API (https://developer.worldweatheronline.com/api/)


## Authors  
* Peter McCready - Initial work    
