const data2 = {
    name: "윤 대통령, 방일 당시 ‘오염수 방류 국민 이해 구하겠다’ 말해", 
    x: 10,
    y: 270,
    depth: 0,
    children: [
        {
            name: "일본 오염수 올해 발생량 20% 감소…15∼19년 지나야 방류 완료", 
            x: 550,
            y: 390,
            depth: 1,
            children: [
                { name: "정부, ‘일본 가리비 한국 수출’에 일본 계획에 불과…수입 규제 계속", 
                x: 1090,
                y: 440,
                depth: 2},
                { name: "‘중국 수출길’ 막힌 가리비…일본 “한국 등으로 수출 확대", 
                x: 1090,
                y: 340,
                depth: 2}
            ]
        },
        {
            name: "일본, 내년초 4차 방류 대비 오염수 이송 시작…“누출 우려도”", 
            x: 550,
            y: 150,
            depth: 1,
            children: [
                { name: "부산 찾은 중국-일본 외교수장 회담…‘오염수 방류’ 관련 논의", 
                x: 1090,
                y: 200,
                depth: 2 },
                { name: "일본 언론 “일중 정상, 관계 안정 택해…오염수 간극은 못 좁혀”", 
                x: 1090,
                y: 100,
                depth: 2 }
            ]
        }
    ]
}

const data3 = {
    name: "이스라엘-하마스 전쟁 이틀째, 사상자 급증…‘피의 보복’ 예고", 
    x: 10,
    y: 270,
    depth: 0,
    children: [
        {
            name: "팔 무장단체, 인질영상 또 공개…“전쟁 멈춰달라” 호소", 
            x: 550,
            y: 390,
            depth: 1,
            children: [
                { name: "헤즈볼라 지휘관 사망에 ‘전면전’ 가나…커지는 확전 우려", 
                x: 1090,
                y: 440,
                depth: 2 },
                { name: "가자지구 사망자 2만3천명…개전 3개월 만에 전체 인구 1% 넘어", 
                x: 1090,
                y: 340,
                depth: 2 }
            ]
        },
        {
            name: "헤즈볼라 지휘관 사망에 양측 “전면전도 가능”…커지는 확전 우려", 
            x: 550,
            y: 150,
            depth: 1,
            children: [
                { name: "유엔 “가자지구 사람 살 수 없는 곳 됐다”…누적 사망자 2만2천600명", 
                x: 1090,
                y: 200,
                depth: 2 },
                { name: "이스라엘군에 헤즈볼라 지휘관 사망…“폭발적 상황 변화", 
                x: 1090,
                y: 100,
                depth: 2 }
            ]
        }
    ]
}

function swap_data() {
    var temp = document.getElementById('tree_vis')
    var d1_title = '이스라엘-하마스 전쟁 이틀째, 사상자 급증…‘피의 보복’ 예고';
    if (temp.querySelectorAll('svg g g g text')[0].getAttribute('data-name') == d1_title) {
        temp.innerHTML = ''
        temp = document.getElementById('trajectory')
        temp.innerHTML = ''
        draw_structure(data2)
        draw_tra(data2)
        handleClick('윤 대통령, 방일 당시 ‘오염수 방류 국민 이해 구하겠다’ 말해')
    } else {
        temp.innerHTML = ''
        temp = document.getElementById('trajectory')
        temp.innerHTML = ''
        draw_structure(data3)
        draw_tra(data3)
        handleClick(d1_title)
    }
}

function draw_structure (data3) {
    const width = 680;
    const height = 350;

    // 여백 추가
    const margin = { top: 10, left: 10, right: 10, bottom: 10 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('#tree_vis')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "scale(-1, 1)");
    
    const zoomLevel = 0.4353;
    const svgZoom = svg.append('g').attr('transform', `scale(${zoomLevel+ 0.05})`);
    const zoomG = svgZoom.append('g');

    const g = zoomG
        .append('g')
        .attr('transform', `translate(${margin.left - 20},${margin.top})`);

    // tree()로 x, y 값을 설정
    const treeLayout = d3.tree().size([innerHeight, innerWidth]);
    // 줌 기능 추가
    svg.call(
        d3.zoom().on('zoom', (event) => {
            zoomG.attr('transform', event.transform);
        })
    );

    svg.append('defs').append('marker')
                .attr('id', 'arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 10)
                .attr('refY', 0)
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('orient', 'auto')
            .append('path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', '#000');

    const root = d3.hierarchy(data3);
    const links = treeLayout(root).links();
    const padding = 5;
    const rectHeight = 80;
    const rectWidth = 290;
    const nodes = root.descendants();
    nodes.forEach(node => {
        if (node.parent) { // 부모가 있는 경우에만 선을 그립니다
            drawLine(g, node.parent.data, node.data);
        }
    });
    g.selectAll('rect.node')
        .data(root.descendants())
        .enter()
        .append('rect')
        .classed('node', true) // 클래스 추가로 구분
        .attr('x', d => d.data.x)
        .attr('y', d => d.data.y)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('rx', 3.2)
        .attr('ry', 3.2)
        .attr('data-name', d => d.data.name)
        .attr('fill', '#D6DBDF')
        .attr('stroke', 'black')
        .attr('stroke-width', '2')
        .on('click', function(d) {
            sessionStorage.removeItem('title');
            sessionStorage.setItem('title', d3.select(this).attr('data-name'))
            handleClick(d3.select(this).attr('data-name'));
            onClickHighlighting(d3.select(this).attr('data-name'));
        });

    // text 요소에 대한 선택 및 추가
    g.selectAll('text.node')
        .data(root.descendants())
        .enter()
        .append('text')
        .classed('node', true) // 클래스 추가로 구분
        .attr('x', d => d.data.x + rectWidth / 2)
        .attr('y', d => d.data.y + rectHeight / 2)
        .attr('dy', '0.2em')
        .attr('text-anchor', 'middle')
        .attr('data-name', d => d.data.name)
        .text(d => d.data.name)
        .each(function(d) {
            d.bbox = this.getBBox()
        })
        .style('font-weight', 'bold')
        .attr('fill', 'black')
        .call(wrap, rectWidth - 10)
        .attr('transform', d => `translate(${d.data.x * 2 + rectWidth}, 0) scale(-1, 1)`)
        .on('click', function(d) {
            sessionStorage.removeItem('title');
            sessionStorage.setItem('title', d3.select(this).attr('data-name'))
            handleClick(d3.select(this).attr('data-name'));
            onClickHighlighting(d3.select(this).attr('data-name'));
        });

    svg.attr('transform', d => `translate(${0},${0}) scale(-1, 1)`);
}

function wrap(text, width) {
    text.each(function() {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineHeight = 1.1, // 라인 높이 조절
            y = parseFloat(text.attr("y")) - 5, // 현재 텍스트의 y 위치
            x = parseFloat(text.attr("x")), // 현재 텍스트의 x 위치
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        let numLines = 1; // 최소한 한 줄은 있어야 하므로 1로 초기화

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width || numLines >= 3) {
                line.pop(); // 현재 단어를 제거하고 줄바꿈
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", (numLines * lineHeight + dy) + "em").text(word);
                numLines++; // 라인 수 증가
            }
        }
    });
}

function drawLine(g, source, target) {
    g.append('line')
        .attr('x2', source.x + 290)
        .attr('y2', source.y + 80 / 2)
        .attr('x1', target.x)
        .attr('y1', target.y + 80 / 2)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)');
}

function onClickHighlighting(name) {
    var matchingRect = document.querySelectorAll('#trajectory svg rect');
    var matchingRect2 = document.querySelectorAll('#tree_vis svg rect');

    for (var i = 0; i < matchingRect.length; i++) {
        if (matchingRect[i].getAttribute('data-name') == name) {
            matchingRect[i].setAttribute('stroke-width', '10');
            matchingRect2[i].setAttribute('stroke-width', '10');
        } else {
            matchingRect[i].setAttribute('stroke-width', '2');
            matchingRect2[i].setAttribute('stroke-width', '2');
        }
    }
}

draw_structure(data3)
