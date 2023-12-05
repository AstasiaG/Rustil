// import 'jquery';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min.js';


const fancyapps = () => {

  $(document).ready(function () {
    $("[data-fancybox]").fancybox({
      buttons: [
        "slideShow",
        "thumbs",
        "close"
      ],
      loop: true, // Позволяет слайдеру зацикливаться
      infobar: false, // Скрывает информационную панель (включает/выключает номер текущего слайда и общее количество слайдов)
      touch: {
        vertical: false, // Запретить вертикальное свайпание на мобильных устройствах
      },
      backFocus: false, // Предотвращает автоматическое фокусирование на кнопке "Назад" после закрытия
      // Пользовательские стили для фона и фильтра
      btnTpl: {
        slideShow: '',
        thumbs: '',
        close: `<button data-fancybox-close class="fancybox-button--close swiper-button-prev btn-swiper"  title="{{CLOSE}}">
        <div class="btn-swiper__svg-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4L12 12M20 20L12 12M12 12L20 4M12 12L4 20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        </button>`,
        arrowLeft:
          `<button data-fancybox-prev class=" fancybox-button--arrow_left swiper-button-prev btn-swiper"  title="{{PREV}}">
            <div class="btn-swiper__svg-box">
                      <svg
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 7L2 7M2 7L7.77778 13M2 7L7.77778 0.999999"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
            </button>`,
        arrowRight:
          `<button data-fancybox-next class="  fancybox-button--arrow_right swiper-button-prev btn-swiper" title="{{NEXT}}">
            <div class="btn-swiper__svg-box">
              <svg
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 8H18M18 8L12.2222 2M18 8L12.2222 14"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
            </button>`,
      }

    
    });

 
  });
  


}

export default fancyapps