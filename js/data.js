'use strict';

//модуль, который создает данные

(function () {
  window.data = {
    dataForSimularAds: {
      offerTitle: [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'],
      offerType: ['flat', 'house', 'bungalo'],
      offerCheck: ['12:00', '13:00', '14:00'],
      offerFeatures: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
    },

    offerTypes: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    },

    typesAndPrices: {
      flat: '1000',
      bungalo: '0',
      house: '5000',
      palace: '10000'
    },

    roomsAndCapacities: {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    },

    createAds: function (quantity) {
      function getRandomIntInclusive(min, max) { // для генерации случайных целых чисел, включая мин и макс
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      var offerTitleCopy = this.dataForSimularAds.offerTitle.slice(0); // чтобы можно было удалять вытащенное, не травмируя исходные данные

      var ads = [];

      function Ad(data) {
        this.author = {
          avatar: `img/avatars/user0${i + 1}.png`,
        };
        this.location = {
          x: getRandomIntInclusive(300, 900) - document.querySelector('.map__pin').offsetWidth / 2,
          y: getRandomIntInclusive(150, 500) - document.querySelector('.map__pin').offsetHeight,
        };
        this.offer = {
          title: offerTitleCopy.splice(i, 1).toString(),
          address: `${this.location.x}, ${this.location.y}`,
          price: getRandomIntInclusive(1000, 1000000),
          type: data.offerType[Math.floor(Math.random()*data.offerType.length)],
          rooms: getRandomIntInclusive(1, 5),
          guests: getRandomIntInclusive(1, 50),
          checkin: data.offerCheck[Math.floor(Math.random()*data.offerCheck.length)],
          checkout: data.offerCheck[Math.floor(Math.random()*data.offerCheck.length)],
          features: data.offerFeatures.sort( function() { return 0.5 - Math.random() } ).slice(0, getRandomIntInclusive(1, data.offerFeatures.length)),
          description: '',
          photos: []
        };
      }

      for (var i = 0; i < quantity; i++) {
        var ad = new Ad(this.dataForSimularAds);
        ads.push(ad);
      }

      return ads;
    }

  }
})();
