let rankChartRendered = 0;
let rchart;

function draw_rank(arr) {
  var keys = []
  var values = []
  var len = 0
  if (arr.length > 5) {
    len = 5
  } else {
    len = arr.length
  }
  for (var i = 0; i < len; i++) {
    keys.push(arr[i][0])
    values.push(arr[i][1].toFixed(2))
  }
    if (rankChartRendered == 1) {
        rchart.destroy();
    }

    var options = {
        series: [{
        name: 'topic rank',
        data: values
      }],
        chart: {
        height: 360,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: keys.map(function(key) {
          return [key];
        })
      }
    };

    rchart = new ApexCharts(document.querySelector("#rank_chart"), options);
    rankChartRendered = 1
    rchart.render();
}