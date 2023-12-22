const mapDelivery = () => {

      function init() {
        let map = new ymaps.Map("map", {
          center:[55.84956882425105,37.677268005525036],
          zoom: 17,
        });

        const isWideScreen = window.innerWidth > 768;

        // Выбираем соответствующий путь к изображению
        const iconImageHref = isWideScreen
            ? './assets/images/baloon1.webp'
            : './assets/images/baloon.webp';

        let placemark = new ymaps.Placemark( [55.84956882425105,37.677268005525036], {
          balloonContent: `
          <div class="baloon">
          <div class="baloon__img-box">
            <img src="${iconImageHref}" alt="" />
          </div>
          <div class="baloon__info-box">
            <p class="baloon__info-title text-sm">Адрес</p>
            <p class="baloon__info-desk">
              г. Москва ул. Красная сосна, 2, корп. 1, стр. 1, оф. 555,
              МОСТРАНССКЛАД
            </p>
          </div>
        </div>

          
          `
        }, {
            iconLayout: 'default#image',
            iconImageHref: './assets/images/place-mark.svg',
            iconImageSize: [90, 90],
            iconImageOffset: [-45, -65],
        })

    map.controls.remove("geolocationControl"); // удаляем геолокацию
      map.controls.remove("searchControl"); // удаляем поиск
      map.controls.remove("trafficControl"); // удаляем контроль трафика
      map.controls.remove("typeSelector"); // удаляем тип
      map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
      map.controls.remove("zoomControl"); // удаляем контрол зуммирования
      map.controls.remove("rulerControl"); // удаляем контрол правил
    //   map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)


    map.geoObjects.add(placemark)
    
      }
      ymaps.ready(init);

}

export default mapDelivery