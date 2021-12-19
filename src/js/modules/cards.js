import {getResourse} from '../services/services';

function cards() {
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

    getResourse('http://localhost:3000/menu')
        .then(data => {
           data.forEach(({img, altimg, title, descr, price}) => {
                new Menucard(img, altimg, title, descr, price).render();
           });
        });
}

export default cards;