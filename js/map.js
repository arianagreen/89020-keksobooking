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

var simularAds = window.data.createAds(8);



function onPinCLick(evt){
  if (pin) {
    pin.classList.remove('map__pin--active');
  }

  if (card) {
    window.cardOptions.removeCard(card, pin, document.elements.map);
  }

  pin = evt.currentTarget;
  pin.classList.add('map__pin--active');
  card = window.cardOptions.showCard(pin, simularAds, document.elements.map);

}

function onPinMainMouseup(){
  document.elements.map.classList.remove('map--faded');

  var pinFragment = window.pinOptions.createPins(simularAds);
  document.querySelector('.map__pins').appendChild(pinFragment);
  noticeForm.classList.remove('notice__form--disabled');
  pins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < pins.length; i++){
    pins[i].addEventListener('click', onPinCLick);
    pins[i].addEventListener('keydown', function(evt){
      window.util.isEnterEvent(evt, onPinCLick);
    });
  }
}

pinMain.addEventListener('mouseup', onPinMainMouseup);

})();
