document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabContent.forEach((element) => {
            element.classList.add("hide");
            element.classList.remove("show", "fade");
        });
        tabs.forEach((element) => {
            element.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = "2020-08-11";

    function gettimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor(((t / 1000) * 60 * 60) % 24);
        const min = Math.floor((t / 1000 / 60) % 60);
        const sec = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            min: min,
            sec: sec,
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
        const days = document.querySelector("#days");
        const hours = document.querySelector("#hours");
        const min = document.querySelector("#minutes");
        const sec = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = gettimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            min.innerHTML = getZero(t.min);
            sec.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //Modal

    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    // const modalCloseBtn = document.querySelector("[data-close]");

    function modalShow() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // clearInterval(modalTimerid);
    }

    modalTrigger.forEach((bnt) => {
        bnt.addEventListener("click", modalShow);
    });

    function modalClose() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    // modalCloseBtn.addEventListener("click", modalClose);

    modal.addEventListener("click", (event) => {
        if (
            event.target === modal ||
            event.target.getAttribute("data-close") == ""
        ) {
            modalClose();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            modalClose();
        }
    });

    // const modalTimerid = setTimeout(modalShow, 5000);

    function modalShowByScroll() {
        // console.log('1');
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            modalShow();
            window.removeEventListener("scroll", modalShowByScroll);
        }
    }

    window.addEventListener("scroll", modalShowByScroll);

    //классы для меню
    class MenuItem {
        constructor(src, atl, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.atl = atl;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 71;
            this.parent = document.querySelector(parentSelector);
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.atl} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            
        `;
            this.parent.append(element);
        }
    }

    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item",
        "big"
    ).render();
    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();
    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    //Forms

    const forms = document.querySelectorAll("form");

    const massage = {
        loading: "./img/spinner.svg",
        succsess: "good",
        failure: "error",
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMassage = document.createElement("img");
            statusMassage.src=massage.loading;
            statusMassage.style.cssText=`
                display:block;
                margin:auto;
            `;
            // form.append(statusMassage);
            form.insertAdjacentElement('afterend',statusMassage);

            const request = new XMLHttpRequest();
            request.open("POST", "./server.php");

            request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);

            const obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            request.send(json);
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(massage.succsess);
                    form.reset();
                    statusMassage.remove();
                } else {
                    showThanksModal(massage.succsess);
                }
            });
        });
    }

    function showThanksModal(massage) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        modalShow();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div data-close="" class="modal__close">×</div>
                <div class='modal__title'>${massage}</div>
            </div>    
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            modalClose();
        }, 3000);
    }
});
