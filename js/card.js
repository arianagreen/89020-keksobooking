'use strict';

// модуль для отрисовки элемента на карточке

// 5. создать DOM-элемент объявления на основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card

(function () {



  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

  window.cardOptions = {
    createCard: function (adInfo) { // принимает элемент массива simularAds
      var newCard = cardTemplate.cloneNode(true);

      newCard.querySelector('h3').textContent = adInfo.offer.title;
      newCard.querySelector('.popup__price').textContent = `${adInfo.offer.price}&#x20bd;/ночь`;

      var offerTypeElement =  newCard.querySelector('h4');

      offerTypeElement.textContent = window.data.offerTypes[adInfo.offer.type];

      newCard.querySelector('p:nth-of-type(3)').textContent = `${adInfo.offer.rooms} комнаты для ${adInfo.offer.guests} гостей`;
      newCard.querySelector('p:nth-of-type(4)').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;

      var popupFeatures = newCard.querySelector('.popup__features');
      var popupFeaturesList = newCard.querySelectorAll('.feature');
      var popupFeaturesFragment = document.createDocumentFragment();

      popupFeatures.innerHTML = '';

      for (var i = 0; i < adInfo.offer.features.length; i++) {
        var feature = adInfo.offer.features[i];
        var featureElement = document.createElement('li');
        featureElement.classList.add('feature', `feature--${feature}`);
        popupFeatures.appendChild(featureElement);
      }

      newCard.querySelector('p:last-of-type').innerContent = adInfo.offer.description;
      newCard.querySelector('img').setAttribute('src', `${adInfo.author.avatar}`);

      return newCard;
    },

    removeCard: function(card, pin, map) {
      card = document.querySelector('.map__card');
      document.elements.map.removeChild(card);
      card = null;
      pin = document.querySelector('.map__pin--active');
      if (pin) {
        pin.classList.remove('map__pin--active');
      }

      document.removeEventListener('keydown', window.cardOptions.onCardEscPress);
    },

    showCard: function(pin, simularAds, map) {
      var index = pin.getAttribute('data');
      if (index !== null) {
        var card = this.createCard(simularAds[index]);
        document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);
        document.addEventListener('keydown', this.onCardEscPress);
        var popupCloseButton = card.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', this.removeCard);
        return card;
      }
    },

    onCardEscPress: function(evt){
      window.util.isEscEvent(evt, window.cardOptions.removeCard);
    }
  };
})();



// function createMapCard(adInfo){ // принимает элемент массива simularAds
//   var newMapCard = mapCardTemplate.cloneNode(true);
//
//   newMapCard.querySelector('h3').textContent = adInfo.offer.title;
//   newMapCard.querySelector('.popup__price').textContent = `${adInfo.offer.price}&#x20bd;/ночь`;
//
//   var offerTypeElement =  newMapCard.querySelector('h4');
//
//   offerTypeElement.textContent = window.data.offerTypes[adInfo.offer.type];
//
//   newMapCard.querySelector('p:nth-of-type(3)').textContent = `${adInfo.offer.rooms} комнаты для ${adInfo.offer.guests} гостей`;
//   newMapCard.querySelector('p:nth-of-type(4)').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;
//
//   var popupFeatures = newMapCard.querySelector('.popup__features');
//   var popupFeaturesList = newMapCard.querySelectorAll('.feature');
//   var popupFeaturesFragment = document.createDocumentFragment();
//
//   popupFeatures.innerHTML = '';
//
//   for (var i = 0; i < adInfo.offer.features.length; i++) {
//     var feature = adInfo.offer.features[i];
//     var featureElement = document.createElement('li');
//     featureElement.classList.add('feature', `feature--${feature}`);
//     popupFeatures.appendChild(featureElement);
//   }
//
//   newMapCard.querySelector('p:last-of-type').innerContent = adInfo.offer.description;
//   newMapCard.querySelector('img').setAttribute('src', `${adInfo.author.avatar}`);
//
//   return newMapCard;
// }
