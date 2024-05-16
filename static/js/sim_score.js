let rendered = 0;
let tchart;
let schart;
let lchart;

function draw_score(title) {
    if (rendered == 1) {
        tchart.destroy();
        schart.destroy();
        lchart.destroy();
        rendered = 0;
    }

    var toptions = {
      series: [70],
      chart: {
        height: 190,
        type: 'radialBar',
      },
      title: {
        text: 'Thumbnail / Title',
        align: 'left'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            show: true,
            name: {
              show: false, // 'series-1'와 같은 라벨을 숨깁니다.
            },
            value: {
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#333', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [], // 중앙에 표시할 텍스트를 비웁니다.
  };
  
  tchart = new ApexCharts(document.querySelector("#thumbnail_title"), toptions);
  rendered = 1;
  tchart.render();

    var soptions = {
        series: [83],
        chart: {
        height: 190,
        type: 'radialBar',
      },
      title: {
        text: 'Summary / Title',
        align: 'left'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            show: true,
            name: {
              show: false, // 'series-1'와 같은 라벨을 숨깁니다.
            },
            value: {
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#333', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [],
      };

    schart = new ApexCharts(document.querySelector("#summary_title"), soptions);
    schart.render();


    var loptions = {
        series: [47],
        chart: {
            height: 190,
            type: 'radialBar',
      },
      title: {
        text: 'Summary / Thumbnail',
        align: 'left'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            show: true,
            name: {
              show: false, // 'series-1'와 같은 라벨을 숨깁니다.
            },
            value: {
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#333', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [],
      };

    lchart = new ApexCharts(document.querySelector("#summary_thumbnail"), loptions);
    lchart.render();
}

draw_score(1);