document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });
        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    //Timer

    const deadline = '2020-08-11';

    function gettimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / 1000 * 60 * 60) % 24);
        const min = Math.floor((t / 1000 / 60) % 60);
        const sec = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'min': min,
            'sec': sec
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const min = document.querySelector('#minutes');
        const sec = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = gettimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            min.innerHTML = getZero(t.min);
            sec.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval();
            }
        }
    }

    setClock('.timer', deadline);
});