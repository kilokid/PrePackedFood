function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const tabContent = document.querySelectorAll(tabsContentSelector);
    const tabsWrapper = document.querySelector(tabsParentSelector);

    const showTabContent = (i = 0) => {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    };
    
    
    const hideTabContent = () => {
        tabContent.forEach(tab => tab.classList.add('hide'));
        tabs.forEach(tab => tab.classList.remove(activeClass));
    };

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;