let rankChartRendered = 0;
let rchart;

function draw_rank(title) {
    if (rankChartRendered == 1) {
        rchart.destroy();
    }

    var options = {
        series: [{
        name: 'topic rank',
        data: [3, 2, 4, 5, 1]
      }],
        chart: {
        height: 380,
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
        labels: {
            show: false,
        },
        categories: [
          ['Isreal'],
          ['Hamas'],
          ['The Gaza Strip'],
          ['Hostage Situation'],
          ['Conflict in the Middle East'], 
        ],
      }
    };

      rchart = new ApexCharts(document.querySelector("#rank_chart"), options);
      rankChartRendered = 1
      rchart.render();
}

draw_rank(1);