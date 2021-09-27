$(document).ready(function () {
  touchDevices();
  navigationMenus();
  slider();
  scrollLink();
  tabs();
  popover();
  tooltips();

  $(window).trigger('resize');
});

$(window).resize(function () {
  const headerHeight = $('.header').outerHeight();
  const mainHeight = $(window).height() - headerHeight;

  if ($(window).width() < 1200) {
    $('.drawer').css({ top: headerHeight, height: mainHeight });
  } else {
    $('.drawer').css({ top: '', height: '' });
  }

  if ($('.hero')[0]) {
    $('.hero .carousel-item').css('height', mainHeight);
  }
});

$(window).on('load', function () {
  setTimeout(function () {
    onScroll();

    $(window).on('scroll', function () {
      onScroll();
    });
  }, 300);
});

function touchDevices() {
  if (is_touch_device()) {
    $('body').addClass('isTouchDevice');
  } else {
    $('body').addClass('nonTouchDevice');
  }
}

function is_touch_device() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

function navigationMenus() {
  // open mobile site switcher
  $('.mob-website-switcher').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('body').addClass(
        'show-mob-menu show-mob-website-switcher raise-mob-menu'
      );
      $('.drawer-switcher').addClass('active');
      $(this).addClass('active');
    } else {
      $('.mob-website-switcher-close').trigger('click');
    }
    return false;
  });

  // close mobile site switcher
  $('.mob-website-switcher-close').on('click', function () {
    $('body').removeClass('show-mob-menu show-mob-website-switcher');
    $('.drawer-switcher').removeClass('active');
    $('.mob-website-switcher').removeClass('active');
    setTimeout(function () {
      $('body').removeClass('raise-mob-menu');
    }, 550);
    return false;
  });

  // open mobile menu
  $('.mob-menu-btn').on('click', function () {
    if (!$('body').hasClass('show-mob-menu')) {
      $('body').addClass('show-mob-menu show-burger-menu raise-mob-menu');
      $('.drawer-nav').addClass('active');
      $(this).addClass('active');
    } else {
      $('body').removeClass('show-mob-menu show-burger-menu');
      $('.drawer-nav').removeClass('active');
      $(this).removeClass('active');
      setTimeout(function () {
        $('body').removeClass('raise-mob-menu');
        $('.drawer-nav ul').removeClass('active');
        $('.nav-return-btn').removeClass('active');
        $('.nav-sub-menu').removeClass('active');
      }, 550);
    }
    return false;
  });

  // nav show child links
  $('.nav-parent-link').on('click', function () {
    if ($(window).width() < 1200) {
      $(this).parent().parent().addClass('active');
      $(this).next().addClass('active');
      $('.nav-return-btn').addClass('active');
      $('.header-bottom .incidents-btn').addClass('hide');
    } else {
      $(this).next().addClass('active');
      $('body').addClass('show-mob-menu raise-mob-menu');
    }
    return false;
  });

  // mobile menu back
  $('.nav-return-btn').on('click', function () {
    $('.drawer-nav ul').removeClass('active');
    $(this).removeClass('active');
    $('.header-bottom .incidents-btn').removeClass('hide');
    setTimeout(function () {
      $('.nav-sub-menu').removeClass('active');
    }, 550);
  });

  // close mobile menu
  $('.close-menu-btn').on('click', function () {
    $('.nav-sub-menu').removeClass('active');
    $('body').removeClass('show-mob-menu');
    setTimeout(function () {
      $('body').removeClass('raise-mob-menu');
    }, 550);
  });
}

function slider() {
  if ($('.glide')[0]) {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 3,
      peek: {
        before: 0,
        after: 0,
      },

      breakpoints: {
        1920: {
          perView: 3,
          peek: {
            before: 0,
            after: 160,
          },
        },
        1024: {
          perView: 2,
          peek: {
            before: 0,
            after: 160,
          },
        },
        767: {
          perView: 1,
          peek: {
            before: 0,
            after: 80,
          },
        },
      },
    });
    glide.mount();
  }
}

function scrollLink() {
  $('.scroll-down-btn').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: $('.hero + div').offset().top,
      },
      600
    );
  });
}

function tabs() {
  // custom select tab switcher on mobile
  $('.nav-tabs-select').on('change', function (e) {
    $('#myTab li a').eq($(this).val()).tab('show');
  });
}

function onScroll() {
  $('[data-show]').each(function () {
    var offset;
    const whentoShow = $(this).data('show-percentage');
    whentoShowMob = $(this).data('show-percentage-mob');

    if (whentoShowMob) {
      if ($(window).width() > 767) {
        var offset = ($(window).height() / 100) * whentoShow;
      } else {
        var offset = ($(window).height() / 100) * whentoShowMob;
      }
    } else if (whentoShow) {
      var offset = ($(window).height() / 100) * whentoShow;
    } else {
      offset = ($(window).height() / 100) * 20;
    }

    if (
      $(this).offset().top <
      $(window).scrollTop() + $(window).height() - offset
    ) {
      $(this).addClass('scroll-show');
    }
  });
}

function popover() {
  $('[data-toggle="popover"]').popover();
}

function tooltips() {
  $('[data-toggle="tooltip"]').tooltip();
}
