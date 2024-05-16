function draw_human_click_bait(title) {
    var image_URL = 'https://i.ytimg.com/vi/mPOFH4bju4U/hqdefault.jpg';

    var thumbnailDiv = document.getElementById('thumbnail');
    var img = document.createElement('img');
    img.src = image_URL;
    img.width = "330";
    img.height = "240";
    thumbnailDiv.appendChild(img);

    const topic = document.getElementById('topic_list');
    var ulelem = document.createElement('ul');
    var temp = document.createElement('li');
    temp.innerText = '해병대'
    ulelem.appendChild(temp)
    var temp = document.createElement('li');
    temp.innerText = '박정훈대령'
    ulelem.appendChild(temp)
    var temp = document.createElement('li');
    temp.innerText = '채상병'
    ulelem.appendChild(temp)
    var temp = document.createElement('li');
    temp.innerText = '군인권센터'
    ulelem.appendChild(temp)
    var temp = document.createElement('li');
    temp.innerText = '기자회견'
    ulelem.appendChild(temp)
    topic.appendChild(ulelem)

    /*for (var i = 0; i < 5; i++) {
        var temp = document.createElement('li');
        temp.innerText = 
    } */

    const news = document.getElementById('bait_title');
    news.innerHTML += '전 해병대 수사단장 박정훈 대령 기소 관련 변호인단·군인권센터 기자회견'
}

draw_human_click_bait(1)