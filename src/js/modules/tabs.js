function tabs() {
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
}

module.exports = tabs;