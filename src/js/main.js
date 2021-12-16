window.addEventListener('DOMContentLoaded', () => {

    // tabs
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsWrapper = document.querySelector('.tabheader__items');

    const showTabContent = (i = 0) => {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };
    
    
    const hideTabContent = () => {
        tabContent.forEach(tab => tab.classList.add('hide'));
        tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
    };

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // timer
    const deadline = '2022-01-01';

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

    setLock('.timer', deadline);
    updateDate('.promotion__end', deadline);

    // modal window
    const modalBtn = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    const showModal = () => {
        document.body.style.overflow = 'hidden';
        modal.classList.add('show');
        modal.classList.remove('hide');
        // clearInterval(modalTimerId);
    };

    const closeModal = () => {
        document.body.style.overflow = 'visible';
        modal.classList.remove('show');
        modal.classList.add('hide');
    };

    modalBtn.forEach(btn => btn.addEventListener('click', showModal));

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('modal__close') || !target.closest('.modal__dialog')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(showModal, 3000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    // menu card class
    class Menucard {
        constructor(src, alt, title, text, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const card = `
                <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            const cardWrapper = document.querySelector('.menu__field .container');
            cardWrapper.insertAdjacentHTML('beforeend', card);
        }
    }

    const getResourse = async (url) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
        
    };
    getResourse('http://localhost:3000/menu')
        .then(data => {
           data.forEach(({img, altimg, title, descr, price}) => {
                new Menucard(img, altimg, title, descr, price).render();
           });
        });

    // forms (XMLHTTPREQUEST)
    const forms = document.querySelectorAll('form');

    const message = {
        load: 'img/request/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => bindPostData(form));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(() => {
                showThanksModal(message.success);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});