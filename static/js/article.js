function write_text(title) {
    const maint = document.getElementById('main_text');
    const summaryt = document.getElementById('Summary');
    const news = document.getElementById('news_title');
    
    // 뉴스 제목에 <b> 태그와 줄바꿈 추가

    const newsTitle = document.createElement('b');
    newsTitle.innerHTML = 'Title';
    news.appendChild(newsTitle)
    news.appendChild(document.createElement('br')); // 줄바꿈 추가
    news.innerHTML += '전 해병대 수사단장 박정훈 대령 기소 관련 변호인단·군인권센터 기자회견';
    
    // 메인 텍스트에 <b> 태그와 줄바꿈 추가
    const mainText = document.createElement('b');
    mainText.innerHTML = 'Main Text';
    maint.appendChild(mainText);
    maint.appendChild(document.createElement('br')); // 줄바꿈 추가
    maint.innerHTML += '군 검찰이 박정훈 전 해병대 수사단장을 불구속 기소한 가운데 변호인단과 군인권센터가 오늘(10일) 오전 이와 관련한 기자회견을 엽니다. 국방부 검찰단은 지난 6일 박 전 단장을 항명과 상관 명예훼손 혐의로 불구속 기소했습니다. 박 전 단장은 7월 31일 김계환 해병대 사령관으로부터 장관 귀국 시까지 채 상병 관련 조사 기록을 경찰에 넘기지 말라는 지시를 받았음에도 이를 따르지 않고 경찰에 이첩한 혐의를 받고 있습니다.또 이종섭 국방부 장관이 보고받는 자리에서 혐의자에 사단장을 포함해야 하는지 질문하지 않았지만 이를 사실처럼 언론에 밝혀 상관인 장관의 명예훼손을 한 혐의도 받고 있습니다.군 검찰단은 ""수사 초기부터 이번 기소에 이르기까지 다수의 관계자와 관련 자료 조사, 압수수색, 휴대전화 포렌식 등을 통해 혐의에 대한 면밀한 수사를 실시했다""고 설명했습니다.앞서 군 검찰은 지난 8월 박 전 단장에 대해 구속영장을 청구했지만 군사 법원은 기각했습니다. 이후 박 전 단장은 지난달 두 차례 군 검찰에 출석해 조사를 받았습니다.';
    
    // 요약문에 <b> 태그와 줄바꿈 추가
    const summaryText = document.createElement('b');
    summaryText.innerHTML = 'Summary';
    summaryt.appendChild(summaryText);
    summaryt.appendChild(document.createElement('br')); // 줄바꿈 추가
    summaryt.innerHTML += '박정훈 전 해병대 수사단장이 항명과 상관 명예훼손 혐의로 불구속 기소되었습니다. 이와 관련해 변호인단과 군인권센터가 기자회견을 개최합니다.';
}

write_text(1);