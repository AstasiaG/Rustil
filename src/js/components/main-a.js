'use strict';
import Swiper from 'swiper/bundle';
import selectize from '@selectize/selectize';


var $ = require('jquery');
const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return (100 / 375) * (0.05 * window.innerWidth) * rem;
  }
}

$(function () {
  if ($('.form__select')) {
    $('.form__select[name="type"]').selectize({
      placeholder: 'Тип',
    });
    $('.form__select[name="color"]').selectize({
      placeholder: 'Цвет',
    });
  }
})

//dropdown
let timer;
$(function () {
  if ($(window).width() > 768) {
    $(".dropdown").find('.header__dropdown').hide();
    $(".dropdown").on("mouseenter",
      function () {
        clearTimeout(timer);
        $(".dropdown").find('.header__dropdown').hide();
        $(".dropdown").removeClass('active');
        $(this).addClass('active');
        $(this).find(".header__dropdown").show();
      })

    $(".dropdown").on("mouseleave", function () {
      const drop = $(this).find(".header__dropdown");
      timer = setTimeout(function () {
        drop.hide();
        $(".dropdown").removeClass('active');
      }, 200);
      $(this).find(".header__dropdown").on("mouseenter",
        function () {
          clearTimeout(timer);
        })
      $(this).find(".header__dropdown").on("mouseleave",
        function () {
          drop.hide();
          $(".dropdown").removeClass('active');
        })
    }
    );
  }
  if ($(window).width() < 769) { 
    $('.header__top-nav').hide();
    $('.header__search').hide();
    $('.header__top-burger').on('click', function () {
      $(this).toggleClass('active');
      if ($('.dropdown').hasClass('active')) {
        $(".dropdown").removeClass('active');
        $('.header__dropdown').slideUp();
        $('.header__top-nav').slideUp();
        closeModal();
      } else {
        $('.header__top-nav').slideToggle();
        openModal();
      }
      if ($(this).hasClass('active')) {
        $('.header__search').show(400);
        $('.header__search-clear').hide();
        $('.header__search-button').show();
        openModal();
      } 
      if(!$(this).hasClass('active')) {
        $('.header__search').hide(50);
        closeModal();
      }
    })

    $(".dropdown").on("click",
      function () {
        $(".dropdown").find('.header__dropdown').hide();
        $(".dropdown").removeClass('active');
        $(this).addClass('active');
        $(this).find(".header__dropdown").slideDown();
        $('.header__top-burger').addClass('active');
        $('.header__top-nav').slideUp();
        openModal();
      })
  }
})

if ($('.catalog__list-sort')) {
  $('.catalog__dropdown').hide()
  $('.catalog__list-sort span').on('click', function () {
    if ($('.catalog__list-sort').hasClass('active')) {
      $('.catalog__list-sort').removeClass('active');
    } else if (!$('.catalog__list-sort').hasClass('active')) {
      $('.catalog__list-sort').addClass('active');
    }
    $('.catalog__dropdown').slideToggle();
  })
}

$(function () {
  if ($(window).width() < 769) {
    $('.filters-modal').hide();
    $('.catalog__list-filter-icon').on('click', function () {
      $('.filters-modal').show();
      modalFiltersCalc();
      openModal();
    })

    $('.catalog__filters-close').on('click', function () {
      $('.filters-modal').hide();
      closeModal();
    })
  }
})

function modalFiltersCalc() {
  if ($('.catalog__filters-active .catalog__filter-active').length > 0) {
    $('.filters-modal .catalog__filters').css('height', `calc(100% - 43rem)`);
  } else {
    $('.filters-modal .catalog__filters').css('height', `calc(100% - 30rem)`);
  }
}

//catalog//

$(function () {
  $('.catalog__sort').hide()
  if ($('.catalog__categories .payment__item').hasClass('active')) {
    const data = $('.catalog__categories .payment__item').attr('data-tab');
    $(`.catalog__sort[data-tab="${data}"]`).show();
  }
  $('.catalog__categories .payment__item').on('click', function () {
    $('.catalog__categories .payment__item').removeClass('active');
    $(this).addClass('active');
    $('.catalog__sort').hide();
    $('.catalog__sort').removeClass('active');
    $(`.catalog__sort[data-tab="${$(this).attr('data-tab')}"]`).show();
    $(`.catalog__sort[data-tab="${$(this).attr('data-tab')}"]`).addClass('active');
    calculateSort();
  })

  calculateSort();
})

function calculateSort() {
  $('.catalog__sort').each(function () { 
    if ($(this).hasClass('active')) {
      if ($(window).width() > 768) {
        const labels = $(this).find('.catalog__sort-btn');
        const showMoreBtn = $(this).find('.btn--red');
        const c = $(this);
        const labelsToShow = calculateLabelsToShow(c);
      
        if (labels.length <= labelsToShow) {
          showMoreBtn.hide();
        }
        labels.slice(labelsToShow).hide();

        showMoreBtn.on('click', function () {
          console.log('fffff',$(this).text(), $(this).text() === 'Показать ещё')
          if ($(this).text() === 'Показать ещё') {
            labels.show();
            $(this).text('Скрыть');
          } else if($(this).text() === 'Скрыть'){
            labels.slice(labelsToShow).hide();
            $(this).text('Показать ещё');
          }
        })
      }
      if ($(window).width() < 769) {
        $(this).find('.btn--red').hide();
      }
    }
  })
}
function calculateLabelsToShow(container) {
  const btnWidth = container.find('.btn--red').width();
  const containerWidth = container.width() - btnWidth;
  const labelWidth = container.find('.catalog__sort-btn:first').outerWidth();
  const labelsPerRow = Math.floor(containerWidth / labelWidth);
  return labelsPerRow;
}

$('.catalog__list-filter').on('click', function () {
  $('.catalog__list-filter').removeClass('active');
  $(this).addClass('active')
  if($('.catalog__filter-active').length < 2) {
    $('.button-clear').hide();
  }
})

//chexbox
$(function () {
  const container = $('.catalog__filters-active');
  $('.button-clear').hide();
  $('.catalog__filter:nth-child(n + 8)').hide();

  $('.catalog__filter-more').on('click', function () {
    $('.catalog__filter:nth-child(n + 8)').slideToggle();
    if ($(this).text() === 'показать все') {
      $(this).text("скрыть")
    } else if ($(this).text() === 'скрыть') {
      $(this).text("показать все")
    }
  })
  
  $('.catalog__filter').on('click', function () {
    const inp = $(this).find('input');
    const val = $(this).text();
    const newElem = $(`<div class="catalog__filter-active btn--grey">${val}<div class="icon-close"><img src="./assets/images/cross-small.svg" alt=""></div></div>`);
    if (inp.prop('checked')) {
      newElem.insertBefore($('.button-clear'))
    } else {
      container.find('.catalog__filter-active:contains("' + val + '")').remove();
    }
    if ($('.catalog__filter-active').length > 2) {
      $('.button-clear').show();
    }
    if ($('.catalog__filter-active').length < 2) {
      $('.button-clear').hide();
    }
    if (window.innerWidth < 769) {
      modalFiltersCalc();
    }
  })

  $('.catalog__sort-btn').on('click', function () {
    const inp = $(this).find('input');
    if (inp.prop('checked')) { 
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  })

  $('.catalog__filters-active').on('click', '.catalog__filter-active', function () {
    const value = $(this).text();
    $('.catalog__filter').each(function () {
      if ($(this).text() === value) {
        const input = $(this).find('input');
        input.prop('checked', false);
        container.find('.catalog__filter-active:contains("' + value + '")').remove();
      }
    });
    if($('.catalog__filter-active').length < 2) {
      $('.button-clear').hide();
    }
    if (window.innerWidth < 769) {
      modalFiltersCalc();
    }
  })

  $('.button-clear').on('click', function () {
    container.find('.catalog__filter-active').remove();
    $('.catalog__filter').each(function () { 
      const input = $(this).find('input');
      input.prop('checked', false);
    })
    $(this).hide();
    if (window.innerWidth < 769) {
      modalFiltersCalc();
    }
  })
  $('.btn-clear').on('click', function () {
    container.find('.catalog__filter-active').remove();
    $('.catalog__filter').each(function () { 
      const input = $(this).find('input');
      input.prop('checked', false);
    })
    $('.button-clear').hide();
    if (window.innerWidth < 769) {
      modalFiltersCalc();
    }
  })

})

//pagination

$('.page-navigation__item').on('click', function () {
  $('.page-navigation__item').removeClass('active');
  $(this).addClass('active');
})

$('.page-navigation__arrow_next').on('click', function () {
  let active = $('.page-navigation__item.active');
  $('.page-navigation__item').removeClass('active');
  let next = active.next('.page-navigation__item');
  if (next.length > 0) {
    active.next('.page-navigation__item').addClass('active');
  } else {
    active.addClass('active');
  }
})

$('.page-navigation__arrow_prev').on('click', function () {
  let active = $('.page-navigation__item.active');
  $('.page-navigation__item').removeClass('active');
  if (active.prev('.page-navigation__item').length > 0) {
    active.prev('.page-navigation__item').addClass('active');
  } else {
    active.addClass('active');
  }
})


//product card//

$('.product__summary-size').on('click', function () {
  const input = $(this).find('input');
  $('.product__summary-size').removeClass('active');
  if (input.prop('checked')) { 
    $(this).addClass('active');
  }
})

$('.product__summary-color').on('click', function () {
  const color = $(this).css('background-color');
  if(!$(this).hasClass('active')) {
    $('.product__summary-color').removeClass('active');
    $(this).addClass('active');
    $(this).css('border-color', color);
  }
})

$('.product__summary-color-btn').on('click', function () {
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    $('.product__summary-color-list').slideDown('fast', function(){
      $(this).css('display', 'flex');
    })
  } else {
    $('.product__summary-color-list').slideUp();
  }
})

//tabs//

$(`.product__tab-content[data-tab="1"]`).show();
$('.product__tab').on('click', function () {
  const tabIndex = $(this).attr("data-tab");
  if (!$(this).hasClass('active')) {
    $('.product__tab').removeClass('active');
    $(this).addClass('active');
    $('.product__tab-content').animate({
      opacity: 0
    }, 100, function () {
      $(this).hide();
      $(`.product__tab-content[data-tab="${tabIndex}"]`).show();
    });
    $(`.product__tab-content[data-tab="${tabIndex}"]`).animate({
      opacity: 1
    }, 100);
  }
});


//header search//

let scrollY = 0;

function openModal() {
  scrollY = window.scrollY;
  const body = document.body;
  body.style.height = "100vh";
  body.style.overflowY = "hidden";
  if (window.innerWidth > 768) {
    body.style.paddingRight = "15px";
  }
}

function closeModal() {
  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.height = "";
  body.style.overflowY = "";
  body.style.paddingRight = "";
  window.history.replaceState(
    null,
    null,
    window.location.pathname + window.location.search,
  );
  window.scrollTo(0, scrollY);
}
export default openModal;

$('.header__search-dropdown').hide();

function showSearch() {
  if (window.innerWidth > 768) {
    $('.header__top-nav').hide();
    $('.header__top').css('justify-content', 'space-between');
    $('.header__search-button span').show();
    $('.header__search-button').addClass('button');
    $('.header__search').addClass('active').one('transitionend', function () {
      $('.header__search-dropdown').slideDown();
    });
    $('.header').addClass('modal-search');
  }
  if (window.innerWidth < 769) {
    $('.header__burger').hide();
    $('.header__top-image').hide();
    $('.header').addClass('before-hidden');
    $('.header__search-back').show();
    $('.header__contacts-wrap').hide();
    $('.header__search').addClass('active');
    $('.header__search-dropdown').slideDown();
    $('.header__search-clear').hide();
  }
}

function hideSearch() {
  if (window.innerWidth > 768) {
    $('.header__search-button span').hide();
    $('.header__search-button').removeClass('button');
    $('.header__top-nav').show();
    $('.header__search-hint').hide();
    $('.header__search-dropdown').slideUp();
    setTimeout(function () {
      $('.header__search').removeClass('active');
      $('.header').removeClass('modal-search');
    }, 300);
  }
  if (window.innerWidth < 769) { 
    $('.header__burger').show();
    $('.header__logo').show();
    $('.header').removeClass('before-hidden')
    $('.header__search-back').hide();
    $('.header__search-clear').hide()
    $('.header__contacts-wrap').show();
    $('.header__search-dropdown').slideUp();
    setTimeout(function () {
      $('.header__search').removeClass('active');
    }, 200);
  }
}

$('.header__search input').on('input', function () {
  if ($(this).val() !== '') {
    $('.header__search-clear').show();
    $('.header__search-dropdown-list').hide();
    $('.header__search-dropdown-list.category').show();
    $('.header__search-dropdown-item').show();
    $('.header__search-hint').show();
    if (window.innerWidth > 768) {
      $('.header__search-hint').css('left', `${4 + ($(this).val().length * 0.93)}rem`)
    }
    if (window.innerWidth < 769) {
      $('.header__search-button').hide();
      $('.header__search-hint').css('left', `${15 + ($(this).val().length * 1.35)}rem`)
    }
    $('[data-search="history"]').hide();
  } else {
    $('.header__search-clear').hide();
    $('.header__search-button').show();
    $('.header__search-dropdown-list').show();
    $('.header__search-dropdown-list.category').hide();
    $('.header__search-dropdown-item').hide();
    $('.header__search-hint').hide();
    $('[data-search="history"]').show();
  }
})
$(function () {
  if (window.innerWidth > 768) {
    $(document).on('click', function (event) {
      if ($('.header__search-dropdown').is(':visible')) {
        if (!$(event.target).closest('.header__search').length) {
          hideSearch();
          $('.header__search-clear').hide();
          closeModal();
        }
      }
    });
  }
  $('.header__search input').on('click', function () {
    if ($('.header__search-dropdown').is(':visible')) {
      $('.header__search input').focus();
    } else {
      showSearch();
      openModal();
      }
    });

    $('.header__search').on('submit', function (event) {
      event.preventDefault();
      hideSearch();
      closeModal();
    })

    $('#clear').on('click', function () {
      $(this).prev().val('');
      $('.header__search-clear').hide();
      $('.header__search-dropdown-list').show();
      $('.header__search-dropdown-list.category').hide();
      $('.header__search-dropdown-item').hide();
      $('.header__search-hint').hide();
      $('[data-search="history"]').show();
    })
  
  $('.header__search-back').on('click', function () {
    hideSearch();
    $('.header__search-button').show();
  })
})

//modals//

$('#modal-bill').on('click', function () {
  $(".modal.form-bill").addClass("active");
  openModal();
})

if ($(".modal__close").length) {
  $(".modal__close").on("click", function () {
    if ($(this).closest(".modal").hasClass("active")) {
      $(this).closest(".modal").removeClass('active');
      closeModal();
    }
  });
}

$('.file__size').hide();
$('.form__button-svg-box.button__arr-svg-box.icon-close').hide();

$('.form__file').find('input').on('change', function (event) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileName = file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name;
    const fileSize = (file.size / 1024).toFixed(2) + ' kb';

    $('.form__file').removeClass('button');
    $('.form__file').addClass('btn--transparent');
    $('.form__file span.name').text(fileName);
    $('.file__size').text(fileSize);
    $('.file__size').show();
    $('.form__button-svg-box.button__arr-svg-box').hide();
    $('.form__button-svg-box.button__arr-svg-box.icon-close').show();
  }
})

$('.form__file').on('click', '.icon-close', function (e) {
  e.preventDefault();
  $('.form__file').find('input').val('');
  $('.file__size').hide();
  $('.form__button-svg-box.button__arr-svg-box.icon-close').hide();
  $('.form__file').addClass('button');
  $('.form__file').removeClass('btn--transparent');
  $('.form__file span.name').text('Прикрепить реквизиты');
  $('.form__button-svg-box.button__arr-svg-box').show();
})

document.addEventListener("click", (el) => {
  if ($(".modal.success-application").hasClass("active")) {
    const md = document.querySelector(".modal.success-application");
    const wrap = document.querySelector(".modal__wrapper");
    const notWrap = el.composedPath().includes(wrap);
    const window = el.composedPath().includes(md);
    if (window && !notWrap) {
      $(".modal.success-application").removeClass("active");
      closeModal();
    }
  }
  if ($(".modal.success-purchase").hasClass("active")) {
    const md = document.querySelector(".modal.success-purchase");
    const wrap = document.querySelector(".modal__wrapper");
    const notWrap = el.composedPath().includes(wrap);
    const window = el.composedPath().includes(md);
    if (window && !notWrap) {
      $(".modal.success-purchase").removeClass("active");
      closeModal();
    }
  }
  if ($(".modal.form-bill").hasClass("active")) {
    const md = document.querySelector(".form-bill");
    const wrap = document.querySelector(".form-bill .modal__wrapper");
    const window = el.composedPath().includes(md);
    const notWrap = el.composedPath().includes(wrap);
    if (window && !notWrap) {
      $(".modal.form-bill").removeClass("active");
      closeModal();
    }
  }
});

//swipers//
const slider = new Swiper('.product__tabs', {
  slidesPerView: 'auto',
  spaceBetween: rem(0.8),
  watchOverflow: true,
  breakpoints: {
    768: {
      slidesPerView:'auto',
      spaceBetween: rem(0.8),
    },
    210: {
      slidesPerView: 'auto',
      spaceBetween: rem(1.6),
    },
  }
});
