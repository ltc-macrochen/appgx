// Growl notifications
function notify(title, message, type) {
    $.growl({
        icon: '',
        title: title,
        message: message,
        url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: false,
        placement: {
            from: 'top',
            align: 'center'
        },
        offset: {
            x: 0,
            y: 100
        },
        spacing: 10,
        z_index: 9999,
        delay: 2000,
        timer: 10000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: '',
            exit: ''
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert alert-dismissible" role="alert">' +
        '<span data-growl="icon"></span>' +
        '<p class="mb-0" data-growl="message"></p>' +
        '<button type="button" class="close" data-growl="dismiss">' +
        '<span aria-hidden="true">&times;</span>' +
        '<span class="sr-only">Close</span>' +
        '</button>' +
        '</div>'
    });
};

window.showError = function (msg) {
    notify("", msg, "danger");
};

window.showInfo = function (msg) {
    notify("", msg, "info");
};

window.showSuccess = function (msg) {
    notify("", msg, "success");
};

window.showWarning = function (msg) {
    notify("", msg, "warning");
};


window.coming = function () {
    showInfo("Coming soon!");
};

$(window).on('load resize', function () {
    // Swiper
    if ($(".swiper-js-container").length > 0) {
        $('.swiper-js-container').each(function (i, swiperContainer) {
            var $swiperContainer = $(swiperContainer);
            var $swiper = $swiperContainer.find('.swiper-container');

            var swiperEffect = $swiper.data('swiper-effect');

            var slidesPerViewXs = $swiper.data('swiper-xs-items');
            var slidesPerViewSm = $swiper.data('swiper-sm-items');
            var slidesPerViewMd = $swiper.data('swiper-md-items');
            var slidesPerViewLg = $swiper.data('swiper-items');
            var spaceBetweenSlidesXs = $swiper.data('swiper-xs-space-between');
            var spaceBetweenSlidesSm = $swiper.data('swiper-sm-space-between');
            var spaceBetweenSlidesMd = $swiper.data('swiper-md-space-between');
            var spaceBetweenSlidesLg = $swiper.data('swiper-space-between');

            // Slides per view written in data attributes for adaptive resoutions
            slidesPerViewXs = !slidesPerViewXs ? slidesPerViewLg : slidesPerViewXs;
            slidesPerViewSm = !slidesPerViewSm ? slidesPerViewLg : slidesPerViewSm;
            slidesPerViewMd = !slidesPerViewMd ? slidesPerViewLg : slidesPerViewMd;
            slidesPerViewLg = !slidesPerViewLg ? 1 : slidesPerViewLg;

            // Space between slides written in data attributes for adaptive resoutions
            spaceBetweenSlidesXs = !spaceBetweenSlidesXs ? 0 : spaceBetweenSlidesXs;
            spaceBetweenSlidesSm = !spaceBetweenSlidesSm ? 0 : spaceBetweenSlidesSm;
            spaceBetweenSlidesMd = !spaceBetweenSlidesMd ? 0 : spaceBetweenSlidesMd;
            spaceBetweenSlidesLg = !spaceBetweenSlidesLg ? 0 : spaceBetweenSlidesLg;


            var animEndEv = 'webkitAnimationEnd animationend';

            var $swiper = new Swiper($swiper, {
                pagination: $swiperContainer.find('.swiper-pagination'),
                nextButton: $swiperContainer.find('.swiper-button-next'),
                prevButton: $swiperContainer.find('.swiper-button-prev'),
                slidesPerView: slidesPerViewLg,
                spaceBetween: spaceBetweenSlidesLg,
                autoplay: $swiper.data('swiper-autoplay'),
                autoHeight: $swiper.data('swiper-autoheight'),
                effect: swiperEffect,
                speed: 800,
                paginationClickable: true,
                direction: 'horizontal',
                preventClicks: true,
                preventClicksPropagation: true,
                observer: true,
                observeParents: true,
                breakpoints: {
                    460: {
                        slidesPerView: slidesPerViewXs,
                        spaceBetweenSlides: spaceBetweenSlidesXs
                    },
                    767: {
                        slidesPerView: slidesPerViewSm,
                        spaceBetweenSlides: spaceBetweenSlidesSm
                    },
                    991: {
                        slidesPerView: slidesPerViewMd,
                        spaceBetweenSlides: spaceBetweenSlidesMd
                    },
                    1100: {
                        slidesPerView: slidesPerViewLg,
                        spaceBetweenSlides: spaceBetweenSlidesLg
                    }
                },
                onInit: function (s) {

                    var currentSlide = $(s.slides[s.activeIndex]);
                    var elems = currentSlide.find(".animated");

                    elems.each(function () {
                        var $this = $(this);

                        if (!$this.hasClass('animation-ended')) {
                            var animationInType = $this.data('animation-in');
                            var animationOutType = $this.data('animation-out');
                            var animationDelay = $this.data('animation-delay');

                            setTimeout(function () {
                                $this.addClass('animation-ended ' + animationInType, 100).on(animEndEv, function () {
                                    $this.removeClass(animationInType);
                                });
                            }, animationDelay);
                        }
                    });
                },
                onSlideChangeStart: function (s) {

                    var currentSlide = $(s.slides[s.activeIndex]);
                    var elems = currentSlide.find(".animated");

                    elems.each(function () {
                        var $this = $(this);

                        if (!$this.hasClass('animation-ended')) {
                            var animationInType = $this.data('animation-in');
                            var animationOutType = $this.data('animation-out');
                            var animationDelay = $this.data('animation-delay');

                            setTimeout(function () {
                                $this.addClass('animation-ended ' + animationInType, 100).on(animEndEv, function () {
                                    $this.removeClass(animationInType);
                                });
                            }, animationDelay);
                        }
                    });
                },
                onSlideChangeEnd: function (s) {

                    var previousSlide = $(s.slides[s.previousIndex]);
                    var elems = previousSlide.find(".animated");

                    elems.each(function () {
                        var $this = $(this);
                        var animationOneTime = $this.data('animation-onetime');

                        if (!animationOneTime || animationOneTime == false) {
                            $this.removeClass('animation-ended');
                        }
                    });
                }
            });
        });
    }
});

$(document).ready(function () {
    // WOW animation
    if ($('.animate-on-scroll').length > 0) {
        wow = new WOW({
            boxClass: 'animate-on-scroll',
            animateClass: 'animated',
            offset: 100,
            mobile: false,
            live: true
        });
        wow.init();
    }

    // To top
    var offset = 300,
        // browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        // duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        // grab the "back to top" link
        $back_to_top = $('.back-to-top');

    // Hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('back-to-top-is-visible') : $back_to_top.removeClass('back-to-top-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('back-to-top-fade-out');
        }
    });

    // Smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body, html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // Bootstrap selected
    $('.selectpicker').each(function (index, element) {
        $(element).select2({});
    });

    // Datepicker
    if ($('.datepicker')[0]) {
        $('.datepicker').each(function () {
            var $this = $(this);
            $this.flatpickr({
                noCalendar: $this.data('datepicker-no-calendar') ? $this.data('datepicker-no-calendar') : false,
                enableTime: $this.data('datepicker-enable-time') ? $this.data('datepicker-enable-time') : false,
                inline: $this.data('datepicker-inline') ? $this.data('datepicker-inline') : false,
                allowInput: $this.data('datepicker-allow-input') ? $this.data('datepicker-allow-input') : true,
                mode: $this.data('datepicker-mode') ? $this.data('datepicker-mode') : 'single',
                static: true,
                inline: $this.data('datepicker-inline') ? $this.data('datepicker-inline') : false,
                nextArrow: '<i class="ion-ios-arrow-right" />',
                prevArrow: '<i class="ion-ios-arrow-left" />'
            });
        })
    }
});
