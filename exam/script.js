window.addEventListener('load', () => {
    const noticeDiv = document.querySelector('#notice-div');
    const info = document.querySelector('#notice-info');
    const score = document.querySelector('#notice-score');
    const name = document.querySelector('#name');
    const answers = [
        {id: 'ans1', correct: 11},
        {id: 'ans2', correct: 5},
        {id: 'ans3', correct: 42},
        {id: 'ans4', correct: 5},
        {id: 'ans5', correct: 11}
    ];

    const btn = document.querySelector('button');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const spanElement = document.createElement('span');
        spanElement.id = 'mySpanId';
        spanElement.textContent = `${(5 - getWrongAnsCount()) * 20}점`;
        score.innerHTML = `최종 점수는 `;
        score.appendChild(spanElement);
        score.innerHTML += ` 입니다.`;
        info.innerHTML = `${name.value}님의 ${getCurrentDate()} 계산 퀴즈 결과 <br/> 총 5문제 중 ${getWrongAnsCount()}문제를 틀렸습니다.`;
        noticeDiv.style.visibility = "visible";
    })

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1);
        const day = String(now.getDate());

        return `${year}. ${month}. ${day}.`;
    }

    function getWrongAnsCount() {
        let wrongCount = 0;
        answers.forEach(answer => {
            const input = document.querySelector(`#${answer.id}`);
            const userAnswer = parseFloat(input.value);
            if (userAnswer !== answer.correct) {
                wrongCount++;
                input.classList.remove('right-answer');
                input.classList.add('wrong-answer');
            } else {
                input.classList.remove('wrong-answer');
                input.classList.add('right-answer');
            }
        });
        return wrongCount;
    }
});