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

function modal() {
    const modalBtn = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

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
}

export default modal;
export {showModal, closeModal};