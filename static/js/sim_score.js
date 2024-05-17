let rendered = 0;
let tchart;
let schart;
let lchart;

function draw_score(a, b, c) {
    if (rendered == 1) {
        tchart.destroy();
        schart.destroy();
        lchart.destroy();
        rendered = 0;
    }

    var toptions = {
      series: [a],
      chart: {
        height: 190,
        type: 'radialBar',
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
              offsetY: 7,
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#000', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [], // 중앙에 표시할 텍스트를 비웁니다.
      colors: ['#f17827'],
    };
  
  tchart = new ApexCharts(document.querySelector("#thumbnail_t"), toptions);
  rendered = 1;
  tchart.render();

    var soptions = {
        series: [b],
        chart: {
        height: 190,
        type: 'radialBar',
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
              offsetY: 7,
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#000', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [],
      colors: ['#b0bfd0'],
      };

    schart = new ApexCharts(document.querySelector("#summary_t"), soptions);
    schart.render();


    var loptions = {
        series: [c],
        chart: {
            height: 180,
            type: 'radialBar',
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
              offsetY: 7,
              formatter: function (val) {
                return val + '%'; // 값 뒤에 '%'를 붙입니다.
              },
              color: '#000', // 여기서 글자 색상을 조정할 수 있습니다.
              fontSize: '16px', // 글자 크기 조정
              show: true,
            }
          }
        },
      },
      labels: [],
      colors: ['#aea0dd'],
      };

    lchart = new ApexCharts(document.querySelector("#summary_th"), loptions);
    lchart.render();
}