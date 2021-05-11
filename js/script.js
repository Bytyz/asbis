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
                spaceBetween: 40
            }
        }

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
    document.querySelector('.swiper-slide-active').dataset.filter
    if ((document.querySelector('.swiper-slide-active').dataset.filter=="she" && document.querySelector('.swiper-slide-next').dataset.filter=="he") || (document.querySelector('.swiper-slide-active').dataset.filter=="he" && document.querySelector('.swiper-slide-next').dataset.filter=="she")) {
        
        let buttons = document.getElementsByClassName('slider__sort');
        for (i=0; i<buttons.length; i++) {
            buttons[i].classList.remove('current');
        }
        buttons[0].classList.add('current');
    }
    else {
        let buttons = document.getElementsByClassName('slider__sort');
        buttons[0].classList.remove('current');
        buttons[1].classList.add('current');
        buttons[2].classList.add('current');
    }
    
}
swiper.on('slideChange', function () {
    onlyTwoSlides();
  });

