let sort = document.querySelectorAll(".slider .slider__sort");
let slides = document.querySelectorAll("[data-filter]");

let swiper;

function sliderInit() {
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30
            }
        }

    });
    swiper.on('slideChange', function () {
        onlyTwoSlides();
    });
}

sliderInit();

function destroySlider() {
    swiper.destroy();
    slides.forEach((slide) => {
        slide.classList.remove("swiper-slide");
    });
}
function allSlides() {
    destroySlider();
    slides.forEach((slide) => {
        slide.classList.add("swiper-slide");
    });
    sliderInit();
}


sort.forEach((el) => {
    el.addEventListener('click', () => {
        sort.forEach((btn) => btn.classList.remove('current'));
        el.classList.add('current');
        let filter = el.dataset.sort;

        if (filter == "all") {
            allSlides();
        }
        else {
            destroySlider();
            document.querySelectorAll("[data-filter='" + filter + "']").forEach((slide) => {
                slide.classList.add("swiper-slide");
            });
            sliderInit();
        }

    });

});


function onlyTwoSlides() {
    if (window.innerWidth < 1024 && window.innerWidth > 640) {
        let activeSlide = document.getElementsByClassName('swiper-slide-active')[0];
        let nextSlide = document.querySelector('.swiper-slide-active + .swiper-slide-next');

        if (!nextSlide) { return false; }

        if ((activeSlide.dataset.filter == "she" && nextSlide.dataset.filter == "he") || (activeSlide.dataset.filter == "he" && nextSlide.dataset.filter == "she")) {

            let buttons = document.getElementsByClassName('slider__sort');
            for (i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('current');
            }
            buttons[0].classList.add('current');
        }
        else if (sort[1].classList.contains('current') || sort[2].classList.contains('current')) {
            return false;
        }
        else {
            let buttons = document.getElementsByClassName('slider__sort');
            buttons[0].classList.remove('current');
            buttons[1].classList.add('current');
            buttons[2].classList.add('current');

        }

    }

}


