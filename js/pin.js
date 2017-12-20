'use strict';
// модуль для отрисовки пина и взаимодействия с ним

(function () {

  window.pinOptions = {

    createPins: function (array) { // принимает массив объявлений simularAds

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
         var newPin = document.createElement('button');
         newPin.setAttribute('data', `${i}`);
         newPin.setAttribute('tabindex', '0');
         newPin.className = 'map__pin';
         newPin.setAttribute('style', `left: ${array[i].location.x}px; top: ${array[i].location.y}px`);

         var newPinImage = document.createElement('img');
         newPinImage.setAttribute('src', `${array[i].author.avatar}`);
         newPinImage.setAttribute('width', '40');
         newPinImage.setAttribute('height', '40');
         newPinImage.draggable = 'true';

         newPin.appendChild(newPinImage);

         newPin.addEventListener('click', window.pinOptions.onPinCLick);
         newPin.addEventListener('keydown', function(evt){
           window.util.isEnterEvent(evt, window.pinOptions.onPinCLick);
         });

         fragment.appendChild(newPin);
      }

      return fragment;
    },

    onPinCLick: function(evt){

      var pinActive = document.querySelector('.map__pin--active');
      var card = document.querySelector('.map__card');

      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }

      if (card) {
        window.cardOptions.removeCard(card, pin, document.elements.map);
      }

      var pin = evt.currentTarget;
      pin.classList.add('map__pin--active');
      card = window.cardOptions.showCard(pin, window.data.simularAds, document.elements.map);

    }

  };

})();
