$(document).ready(function () {
    easySlider();
    testimonialsSlider();
    mediaQueries();
    lazyScroll($('.socials'), 700);
    lazyScrollFade($('.btn-up'), 500);
    fadeMenu();
    lazyScrollSection($('.header__link'), 500);
    lazyScrollSection($('.header__mob-link'), 500);
    lazyScrollSection($('.footer__link'), 500);
    new WOW().init();

    var formSend = {
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function (form, e) {
            e.preventDefault();
            $.ajax({
                type: $(form).attr('method'),
                url: $(form).attr('action'),
                data: $(form).serialize(),
                cache: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
                success: function (data) {
                    $('.congrats').find('.congrats__text').remove();
                    if (data.result === 'success') {
                        $('.congrats__img').after(('<p class="congrats__text">Congrats! <br> You are now on the Wait List!</p>'));
                        $('form').find('input').val('');
                    } else {
                        data.msg = data.msg.replace('here', '<span style="color:red; pointer-events: none;"> <u style="pointer-events: none;"> here </u> </span>');
                        $('.congrats__img').after(('<p class="congrats__text">' + data.msg + '</p>'));
                    }
                    $.fancybox.open($('.congrats'));
                    $('form').find('input').val('');
                },
                error: function () {
                    alert('Yops')
                }
            });
        }
    };

    validation($('#header-form'), formSend);
    validation($('#easy-form'), formSend);
    validation($('#laptop-form'), formSend);


    $('#congrats-close').on('click', function () {
        $.fancybox.close($('.congrats'));
    });

    jQuery('#aboutLink').on('click', function scrollToAnchor(e) {
        const anchor = jQuery(this);
        const href = anchor.attr('href');
        jQuery('html, body').stop().animate({
            scrollTop: jQuery(href).offset().top - 150,
        }, 500);

        e.preventDefault();
    });
    jQuery('#aboutLinkMob').on('click', function scrollToAnchor(e) {
        const anchor = jQuery(this);
        const href = anchor.attr('href');
        jQuery('html, body').stop().animate({
            scrollTop: jQuery(href).offset().top - 150,
        }, 500);

        e.preventDefault();
    });
});

$('.socials__link').on('click', function (e) {
    window.open($(this).attr('href'), '_blank');
});

// functions -------------------------------------------

function easySlider() {
    var easyProps = {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    var slider = $('.easy-money__item-outer');
    if ($(window).width() < 1025) {
        if (slider.hasClass('slick-slider')) {
            slider.slick('unslick');
        }
        initSlick(slider, easyProps);
    } else {
        if (slider.hasClass('slick-slider')) {
            slider.slick('unslick');
        }
    }
}
function testimonialsSlider() {
    var testimonialsProps = {
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg class="arow" width="29" height="50" viewBox="0 0 29 50" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M28.8136 46.1335L7.68012 25L28.8136 3.86653L25 0L4.00543e-05 25L25 50L28.8136 46.1335Z" fill="#29C5D4"/>\n' +
            '</svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg class="arow" width="29" height="50" viewBox="0 0 29 50" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M0 46.1335L21.1335 25L0 3.86653L3.81356 0L28.8136 25L3.81356 50L0 46.1335Z" fill="#29C5D4"/>\n' +
            '</svg></button>'
    };

    var slider = $('.testimonials__items');
    if ($(window).width() > 0) {
        if (slider.hasClass('slick-slider')) {
            slider.slick('unslick');
        }
        initSlick(slider, testimonialsProps);
    } else {
        if (slider.hasClass('slick-slider')) {
            slider.slick('unslick');
        }
    }
}

function initSlick(slider, props) {
    slider.slick(props);
}

function mediaQueries() {
    easySlider();
    $(window).resize(function () {
        easySlider();
        testimonialsSlider();
    });
}


function lazyScrollFade(anchor, speed) {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 950) {
            anchor.fadeIn();
        } else {
            anchor.fadeOut();
        }
    });
    anchor.on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(href).offset().top }, speed);
    });
}
function lazyScroll(anchor, speed) {
    anchor.on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(href).offset().top }, speed);
    });
}
function fadeMenu() {
    $('.header__menu').on('click', function () {
        $('.header__wrapper-mob').fadeIn();
    });
    $('.header-mob__link_close').on('click', function () {
        $('.header__wrapper-mob').fadeOut();
    });
}
function validation(form, props) {
    form.validate(props);
}
function lazyScrollSection(anchor, speed) {
    anchor.on('click', function (e) {
        var href = $(this).attr("href");
        // privacy policy should open in new tab
        if (href !== 'privacy-policy.html' && href !== 'terms-conditions.html') {
            e.preventDefault();
            $("html, body").animate({scrollTop: $(href).offset().top}, speed);
        }
    });
}



