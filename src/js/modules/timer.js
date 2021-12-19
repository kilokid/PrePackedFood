function timer(id, deadline) {
    function addZero(num) {
        return num >= 0 && num < 10 ? `0${num}`: num;
    }

    function getTimeRemaining(endtime) {
        const time = Date.parse(endtime) - Date.parse(new Date());
        const day = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor(time / (1000 * 60 * 60) % 24) - 3;
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        return {
            time,
            day,
            hours,
            minutes,
            seconds
        };
    }

    function setLock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = addZero(t.day);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.time <= 0) {
                clearInterval(timerInterval);
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
            }
        }
    }

    function updateDate(selector, endtime) {
        const endDate = document.querySelector(selector);
        const t = new Date(endtime);
        const monthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        endDate.innerHTML = `Акция закончится ${addZero(t.getDate())} 
        ${monthName[t.getUTCMonth()]} в 
        ${addZero(t.getHours()-3)}:${addZero(t.getMinutes())}`;
    }

    setLock(id, deadline);
    updateDate('.promotion__end', deadline);
}

export default timer;