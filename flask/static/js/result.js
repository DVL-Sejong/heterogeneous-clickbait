let score_rendered = 0;
let totalScore = 0

function draw_tra(data) {
    const width = 680;
    const height = 350;

    // 여백 추가
    const margin = { top: 10, left: 10, right: 10, bottom: 10 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('#trajectory')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "scale(-1, 1)");

    const zoomLevel = 0.4353;
    const svgZoom = svg.append('g').attr('transform', `scale(${zoomLevel+ 0.05})`);

    const zoomG = svgZoom.append('g');

    const g = zoomG
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // tree()로 x, y 값을 설정
    const treeLayout = d3.tree().size([innerHeight, innerWidth]);
    // 줌 기능 추가
    svg.call(
        d3.zoom().on('zoom', (event) => {
            zoomG.attr('transform', event.transform);
        })
    );

    const root = d3.hierarchy(data);
    const links = treeLayout(root).links();
    const padding = 5;
    const rectHeight = 80;
    const rectWidth = 290;

    const nodes = root.descendants();
    nodes.forEach(node => {
        if (node.parent) { // 부모가 있는 경우에만 선을 그립니다
            drawLine2(g, svg, node.parent.data, node.data);
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

function drawLine2(g, svg, source, target) {

    svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', 'auto')
            .attr('data-name', target.name)
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#000');

    svg.append('defs').append('marker')
        .attr('id', 'arrow2')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .attr('orient', 'auto')
        .attr('data-name', target.name)
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#fc838a');

    svg.append('defs').append('marker')
        .attr('id', 'arrow3')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .attr('orient', 'auto')
        .attr('data-name', target.name)
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#008FFB');

    g.append('line')
        .attr('x1', source.x + 290)
        .attr('y1', source.y + 80 / 2)
        .attr('x2', target.x)
        .attr('y2', target.y + 80 / 2)
        .attr('data-name', target.name)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)');

}

function handleClick(name) {
    // JSON 파일 읽기
    d3.json('static/data/clickbait.json').then(data => {
        // Title이 클릭된 노드의 이름과 일치하는 객체 찾기
        const matchedItem = data.find(item => item.Title === name);
        if (matchedItem) {
            score = ''
            draw_score(matchedItem.Sim_score[0].tn_ti.toFixed(2), matchedItem.Sim_score[0].s_ti.toFixed(2), matchedItem.Sim_score[0].s_tn.toFixed(2));
            var items = Object.keys(matchedItem.Topic_rank[0]).map(function(key) {
                return [key, matchedItem.Topic_rank[0][key]];
            });
            draw_rank(items)
            write_text(matchedItem.Title, matchedItem.Main_text, matchedItem.Summary, items)
            draw_human_click_bait(matchedItem.Title, items, matchedItem.Thumb_link)
            update_score(matchedItem.Title, matchedItem.Sim_score, matchedItem.Click_bait_prob, score)
        } else {
            console.log('일치하는 항목 없음');
        }
    }).catch(error => {
        console.error('데이터 로드 중 오류 발생:', error);
    });
}

function update_score(title, sim, prob, human='') {
    score_rendered = 1;
    totalScore = 0;

    const score_list = document.getElementById('seperate_score')
    score_list.innerHTML = ''
    const temp_title = document.createElement('b')
    temp_title.innerText = 'Clickbait Score'
    score_list.appendChild(temp_title)
    var ulelem = document.createElement('ul');

    var score = document.createElement('li');
    score.innerText = 'Clickbait Score : ';
    var scoreSpan = document.createElement('span');
    scoreSpan.className = 's1';
    scoreSpan.innerText = prob.toFixed(2);
    score.appendChild(scoreSpan);

    var thumb_title = document.createElement('li');
    thumb_title.innerText = 'Thumbnail / Title Similarity : ';
    var thumbTitleSpan = document.createElement('span');
    thumbTitleSpan.className = 's2';
    thumbTitleSpan.innerText = (sim[0].tn_ti / 100).toFixed(2);
    thumb_title.appendChild(thumbTitleSpan);

    var sum_title = document.createElement('li');
    sum_title.innerText = 'Summary / Title Similarity : ';
    var sumTitleSpan = document.createElement('span');
    sumTitleSpan.className = 's3';
    sumTitleSpan.innerText = (sim[0].s_ti / 100).toFixed(2);
    sum_title.appendChild(sumTitleSpan);

    var sum_thumb = document.createElement('li');
    sum_thumb.innerText = 'Summary / Thumbnail Similarity : ';
    var sumThumbSpan = document.createElement('span');
    sumThumbSpan.className = 's4';
    sumThumbSpan.innerText = (sim[0].s_tn / 100).toFixed(2);
    sum_thumb.appendChild(sumThumbSpan);

    var human_s = document.createElement('li');
    human_s.innerText = 'Human Clickbait Score : ';
    var humanSpan = document.createElement('span');
    humanSpan.className = 's5';
    humanSpan.innerText = human;
    human_s.appendChild(humanSpan);

    ulelem.appendChild(score)
    ulelem.appendChild(thumb_title)
    ulelem.appendChild(sum_title)
    ulelem.appendChild(sum_thumb)
    ulelem.appendChild(human_s)
    score_list.appendChild(ulelem)

    const total_score = document.getElementById('total_div')
    total_score.innerHTML = ''
    
    function wrapInSpan(text, classid='') {
        var span = document.createElement('span');
        span.className = classid;
        span.innerText = text;
        return span;
    }
    
    // 첫 번째 부분
    total_score.appendChild(wrapInSpan('((('))
    total_score.appendChild(wrapInSpan('(1 - ' + prob.toFixed(2) + ')', 's1'))
    total_score.appendChild(wrapInSpan(' + '))
    total_score.appendChild(wrapInSpan('(1 - ' + (sim[0].tn_ti / 100).toFixed(2) + ')', 's2'))
    total_score.appendChild(wrapInSpan(' + '))
    total_score.appendChild(wrapInSpan('(1 - ' + (sim[0].s_ti / 100).toFixed(2) + ')', 's3'))
    total_score.appendChild(wrapInSpan(' + '))
    total_score.appendChild(wrapInSpan('(1 - ' + (sim[0].s_tn / 100).toFixed(2) + ')', 's4'))
    total_score.appendChild(wrapInSpan(') / 4) + '))
    if (human == '') {
        total_score.appendChild(wrapInSpan('?', 's5'))
    } else {
        total_score.appendChild(wrapInSpan(human, 's5'))
    }
    total_score.appendChild(wrapInSpan(') / 2'))
    total_score.appendChild(document.createElement('br'))
    total_score.appendChild(wrapInSpan('= '))
    totalScore = (((1-prob.toFixed(2)) + (1-(sim[0].tn_ti / 100).toFixed(2)) + (1-(sim[0].s_ti / 100).toFixed(2)) + (1-(sim[0].s_tn / 100).toFixed(2))) / 4).toFixed(4)
    if (human == '') {
        total_score.appendChild(wrapInSpan('(' + totalScore + ' + Human Score) / 2', 's6'))
    } else {
        totalScore = ((totalScore + human) / 2).toFixed(3)
        total_score.appendChild(wrapInSpan(totalScore, 's6'))
    }
    total_score.appendChild(document.createElement('br'))
    total_score.appendChild(document.createElement('br'))
    
    if (human != '') {
        var matchingRect = document.querySelector('#trajectory svg rect[data-name="' + title + '"]');
        var matchingText = document.querySelector('#trajectory svg text[data-name="' + title + '"]');
        var matchingLine = document.querySelector('#trajectory svg line[data-name="' + title + '"]');

        if (parseFloat(totalScore) >= 0.5) {
            total_score.appendChild(wrapInSpan('Result: Proving Clickbait', 's7'))
            matchingRect.setAttribute('fill', '#fc838a');
            matchingLine.setAttribute('stroke', '#fc838a');
            matchingLine.setAttribute('marker-end', 'url(#arrow2)')
        } else {
            total_score.appendChild(wrapInSpan('Result: Not Clickbait', 's7'))
            matchingRect.setAttribute('fill', '#008FFB');
            matchingText.setAttribute('fill', '#FFFFFF');
            matchingLine.setAttribute('stroke', '#008FFB')
            matchingLine.setAttribute('marker-end', 'url(#arrow3)')
        }
    } else {
        total_score.appendChild(wrapInSpan('Evaluate Human Score', 's7'))
    }

}

draw_tra(data3)
handleClick('이스라엘-하마스 전쟁 이틀째, 사상자 급증…‘피의 보복’ 예고')