let score = '';

function draw_human_click_bait(title, items, link) {
    var image_URL = link;

    var thumbnailDiv = document.getElementById('img_box');
    thumbnailDiv.innerHTML = ''
    var img = document.createElement('img');
    img.src = image_URL;
    img.width = "332";
    img.height = "240";
    thumbnailDiv.appendChild(img);

    const topic = document.getElementById('topic_box');
    topic.innerHTML = ''
    var ulelem = document.createElement('ul');
    for (var i = 0; i < items.length; i++) {
        var temp = document.createElement('li')
        temp.innerText = items[i][0]
        ulelem.appendChild(temp)
    }
    topic.appendChild(ulelem)

    const news = document.getElementById('title_box');
    news.innerHTML = ""
    news.innerHTML += title
}

const radioButtons = document.querySelectorAll('.radio-container input[type="radio"]');

radioButtons.forEach(radio => {
    radio.addEventListener('click', function() {
        // 클릭된 라디오 버튼의 value로 score 업데이트
        score = parseFloat(this.value);
        if (score_rendered == 1) {
            var temp = document.getElementsByClassName('s5');
            for (var i = 0; i < temp.length; i++) {
                temp[i].innerText = score;
            }
            temp = document.getElementsByClassName('s6');
            temp[0].innerText = ((parseFloat(totalScore) + score) / 2).toFixed(3);
            
            temp = document.getElementsByClassName('s7');

            var title = sessionStorage.getItem('title')
            var matchingRect = document.querySelector('#trajectory svg rect[data-name="' + title + '"]');
            var matchingText = document.querySelector('#trajectory svg text[data-name="' + title + '"]');
            var matchingLine = document.querySelector('#trajectory svg line[data-name="' + title + '"]');
            if ((parseFloat(totalScore) + score) / 2 >= 0.5) {
                temp[0].innerText = 'Result: Clickbait'
                matchingRect.setAttribute('fill', '#fc838a');
                matchingLine.setAttribute('stroke', '#fc838a');
                matchingLine.setAttribute('marker-end', 'url(#arrow2)')
            } else {

                temp[0].innerText = 'Result: Not Clickbait'
                matchingRect.setAttribute('fill', '#008FFB');
                matchingText.setAttribute('fill', '#FFFFFF');
                matchingLine.setAttribute('stroke', '#008FFB')
                matchingLine.setAttribute('marker-end', 'url(#arrow3)')
            }

            var temp = document.querySelectorAll('#trajectory svg rect')
            for (var i = 3; i < temp.length; i++) {
                if (checkSorce(i)) {
                    drawSourceArrow(temp[i].getAttribute('x'), temp[i].getAttribute('y'), i)
                }
            }
        }
    });
});

function checkSorce(i) {
    var temp = document.querySelectorAll('#trajectory svg rect')
    if (i == 6 || i == 5) {
        if (temp[i].getAttribute('fill') == '#fc838a') {
            if (temp[2].getAttribute('fill') == '#fc838a') {
                if (temp[0].getAttribute('fill') == '#fc838a') {
                    return true
                }
            }
        }
    } else if (i == 4 || i == 3) {
        if (temp[i].getAttribute('fill') == '#fc838a') {
            if (temp[1].getAttribute('fill') == '#fc838a') {
                if (temp[0].getAttribute('fill') == '#fc838a') {
                    return true
                }
            }
        }
    }
    return false
}

function drawSourceArrow(x, y, i) {
    var svg = d3.select('#trajectory svg')
    var g = d3.select('#trajectory svg g g g')
    svg.append('defs').append('marker')
        .attr('id', 'arrow4')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 0)
        .attr('refY', 0)
        .attr('markerWidth', 2)
        .attr('markerHeight', 2)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');

    if (i == 6 || i == 4) {
        g.append('line')
            .attr('x1', parseInt(x) - 175)
            .attr('y1', parseInt(y) - 10)
            .attr('x2', parseInt(x) - 40)
            .attr('y2', parseInt(y) + 10)
            .attr('stroke', 'black')
            .attr('stroke-width', 20)
            .attr('data-name', 'pp')
            .attr('marker-end', 'url(#arrow4)');
        g.append('text')
            .attr('x', parseInt(x) - 1940)
            .attr('y', parseInt(y) - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .attr('font-size', '40px')
            .attr('transform', `translate(0,0) scale(-1, 1)`)
            .text('Source');
    } else {
        g.append('line')
            .attr('x2', parseInt(x) - 40)
            .attr('y2', parseInt(y) + 75)
            .attr('x1', parseInt(x) - 175)
            .attr('y1', parseInt(y) + 115)
            .attr('stroke', 'black')
            .attr('stroke-width', 20)
            .attr('data-name', 'pp')
            .attr('marker-end', 'url(#arrow4)');
        g.append('text')
            .attr('x', parseInt(x) - 1930)
            .attr('y', parseInt(y) + 140)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .attr('font-size', '40px')
            .attr('transform', `translate(0,0) scale(-1, 1)`)
            .text('Source');
    }
    
}