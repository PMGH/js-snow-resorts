var PieChart = function(container, title, series){
  // Highcharts.Chart is like a factory for charts
  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: container,
      margin: [0, 0, 0, 0],
      spacing: [10, 0, 0, 0],
      width: 700
    },
    title: {
      text: title
    },
    series: series
  });
};
