import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiperPopularCategories = () => {
    let swiperOne = null; // Объявляем переменную, чтобы хранить экземпляр Swiper

    const swiperPopularCategories = () => {
      // Функция для инициализации Swiper
      const initSwiper = () => {
        swiperOne = new Swiper(".popular-categories__swiper", {
          slidesPerView: "4",
          spaceBetween: 20,
          grabCursor: true,
          updateOnWindowResize: true,
          watchSlidesProgress: true,
          navigation: {
            nextEl: ".popular-categories__swiper-button-next",
            prevEl: ".popular-categories__swiper-button-prev",
          },
        });
      };
    
      // Функция для уничтожения Swiper
      const destroySwiper = () => {
        if (swiperOne !== null && swiperOne.destroy && swiperOne.destroyed === false) {
          swiperOne.destroy();
          swiperOne = null;
        }
      };
    
      // Проверяем ширину окна при загрузке страницы
      if (window.innerWidth > 768) {
        initSwiper();
      }
    
      // Слушаем изменения размера окна
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          // Если ширина больше 768 и Swiper не был инициализирован, инициализируем его
          if (swiperOne === null) {
            initSwiper();
          }
        } else {
          // Если ширина меньше или равна 768 и Swiper был инициализирован, уничтожаем его
          destroySwiper();
        }
      });
    };
    
    // Вызываем функцию инициализации Swiper
    swiperPopularCategories();
};

export default swiperPopularCategories;


