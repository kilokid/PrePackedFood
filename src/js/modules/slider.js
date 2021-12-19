function slider() {
    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const prevBtn = document.querySelector('.offer__slider-prev');
    const nextBtn = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // slider #1
    // slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;

    // const showSlide = (i) => {
    //     if (i > slides.length) {
    //         slideIndex = 1;
    //     } else if (i < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((slide) => slide.classList.add('hide'));

    //     slides[slideIndex - 1].classList.add('show');
    //     slides[slideIndex - 1].classList.remove('hide');

    //     slideIndex < 10 ? current.textContent = `0${slideIndex}` : current.textContent = slideIndex;
    // };

    // showSlide(slideIndex);

    // const plusSlides = (i) => {
    //     showSlide(slideIndex += i);
    // }

    // prevBtn.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // nextBtn.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // slider #2
    const addZeroCurrent = () => {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };

    const changeActiveDot = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    const deleteNotDigits = (str) => {
        return +str.replace(/\D/g, '');
    };

    slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;
    slideIndex < 10 ? current.textContent = `0${slideIndex}` : current.textContent = slideIndex;

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    nextBtn.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        }  else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZeroCurrent();

        changeActiveDot();
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        }  else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZeroCurrent();

        changeActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const target = event.target;
            const slideTo = target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroCurrent();

            changeActiveDot();
        });
    });
}

export default slider;