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
         fragment.appendChild(newPin);
      }

      return fragment;
    }
  };

})();
