const showModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);

    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.classList.remove('hide');

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    document.body.style.overflow = 'visible';
    modal.classList.remove('show');
    modal.classList.add('hide');
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalBtn = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalBtn.forEach(btn => btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('modal__close') || !target.closest('.modal__dialog')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal, closeModal};