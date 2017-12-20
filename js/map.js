'use strict';

// модуль, который работает с картой. Использует вспомогательные модули card.js и pin.js


(function () {

  document.elements = {
    map: document.querySelector('.map'),
    // pin: null,
  }


var pinMain = document.querySelector('.map__pin--main');
// var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var pins = [];
var pin = null;
var popupCloseButton = null;
var card = null;

// var simularAds = window.data.createAds(8);




function onPinMainMouseup(){
  document.elements.map.classList.remove('map--faded');

  var pinFragment = window.pinOptions.createPins(simularAds);
  document.querySelector('.map__pins').appendChild(pinFragment);
  noticeForm.classList.remove('notice__form--disabled');
}

pinMain.addEventListener('mouseup', onPinMainMouseup);

})();
