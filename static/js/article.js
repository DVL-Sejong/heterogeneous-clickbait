function write_text(title, Main_text, Summary, items) {
    const maint = document.getElementById('mainText');
    const summaryt = document.getElementById('summaryText');
    const news = document.getElementById('titleText');
    const colors = ['#008FFB', '#00CA7D', '#FEB019', '#FF4560', '#775DD0'];

    var item = []

    if (items.length < 5) {
        for (var i = 0; i < items.length; i++) {
            item.push(items[i][0])
        }
    } else {
        for (var i = 0; i < 5; i++) {
            item.push(items[i][0])
        }
    }

    function applyColor(text, item, colors) {
        item.forEach((it, index) => {
            // 정규 표현식을 사용해 해당 단어를 찾고 색상을 적용
            const regex = new RegExp(it, 'gi');
            const color = colors[index % colors.length]; // 색상 배열을 순환
            text = text.replace(regex, `<span style="color: ${color}">${it}</span>`);
        });
        return text;
    }

    maint.innerHTML = '';
    summaryt.innerHTML = '';
    news.innerHTML = '';

    news.innerHTML = applyColor(title, item, colors);
    maint.innerHTML = applyColor(Main_text, item, colors);
    summaryt.innerHTML = applyColor(Summary, item, colors);
}

