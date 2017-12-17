'use strict';



// 1. Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалеку

// немного исходных данных
var dataForSimularAds = {
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
};

// для генерации случайных целых чисел, включая мин и макс
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSimularAds(data, quantity) {
  var offerTitleCopy = data.offerTitle.slice(0); // чтобы можно было удалять вытащенное, не травмируя исходные данные

  var ads = [];

  for (var i = 0; i < quantity; i++) {
    var ad = {};
    ad.author = {avatar: `img/avatars/user0${i + 1}.png`};

    ad.location = {};

    ad.location.x = getRandomIntInclusive(300, 900) - document.querySelector('.map__pin').offsetWidth / 2;
    ad.location.y = getRandomIntInclusive(150, 500) - document.querySelector('.map__pin').offsetHeight;

    ad.offer = {};

    ad.offer.title = offerTitleCopy.splice(i, 1).toString();
    ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
    ad.offer.price = getRandomIntInclusive(1000, 1000000);
    ad.offer.type = data.offerType[Math.floor(Math.random()*data.offerType.length)];
    ad.offer.rooms = getRandomIntInclusive(1, 5);
    ad.offer.guests = getRandomIntInclusive(1, 50);
    ad.offer.checkin = data.offerCheck[Math.floor(Math.random()*data.offerCheck.length)];
    ad.offer.checkout = data.offerCheck[Math.floor(Math.random()*data.offerCheck.length)];
    ad.offer.features = data.offerFeatures.sort( function() { return 0.5 - Math.random() } ).slice(0, getRandomIntInclusive(1, data.offerFeatures.length));
    ad.offer.description = '';
    ad.offer.photos = [];

    ads.push(ad);
  }

  return ads;
}

var simularAds = createSimularAds(dataForSimularAds, 8);

// document.querySelector('section.map').classList.remove('map--faded');

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива

var fragment = document.createDocumentFragment();

function createMapPins(array){
  for (var i = 0; i < array.length; i++) {
     var newMapPin = document.createElement('button');
     newMapPin.setAttribute('data', `${i}`);
     newMapPin.setAttribute('tabindex', '0');
     newMapPin.className = 'map__pin';
     newMapPin.setAttribute('style', `left: ${array[i].location.x}px; top: ${array[i].location.y}px`);

     var newMapPinImage = document.createElement('img');
     newMapPinImage.setAttribute('src', `${array[i].author.avatar}`);
     newMapPinImage.setAttribute('width', '40');
     newMapPinImage.setAttribute('height', '40');
     newMapPinImage.draggable = 'true';

     newMapPin.appendChild(newMapPinImage);
     fragment.appendChild(newMapPin);
  }
}

// createMapPins(simularAds);

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment

// document.querySelector('.map__pins').appendChild(fragment);


// 5. создать DOM-элемент объявления на основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card

var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

var offerTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
}

function createMapCard(adInfo){ // принимает элемент массива simularAds
  var newMapCard = mapCardTemplate.cloneNode(true);

  newMapCard.querySelector('h3').textContent = adInfo.offer.title;
  newMapCard.querySelector('.popup__price').textContent = `${adInfo.offer.price}&#x20bd;/ночь`;

  var offerTypeElement =  newMapCard.querySelector('h4');

  offerTypeElement.textContent = offerTypes[adInfo.offer.type];

  newMapCard.querySelector('p:nth-of-type(3)').textContent = `${adInfo.offer.rooms} комнаты для ${adInfo.offer.guests} гостей`;
  newMapCard.querySelector('p:nth-of-type(4)').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;

  var popupFeatures = newMapCard.querySelector('.popup__features');
  var popupFeaturesList = newMapCard.querySelectorAll('.feature');
  var popupFeaturesFragment = document.createDocumentFragment();

  popupFeatures.innerHTML = '';

  for (var i = 0; i < adInfo.offer.features.length; i++) {
    var feature = adInfo.offer.features[i];
    var featureElement = document.createElement('li');
    featureElement.classList.add('feature', `feature--${feature}`);
    popupFeatures.appendChild(featureElement);
  }

  newMapCard.querySelector('p:last-of-type').innerContent = adInfo.offer.description;
  newMapCard.querySelector('img').setAttribute('src', `${adInfo.author.avatar}`);

  return newMapCard;
}

// document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', newMapCard);






var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var mapPins;
var mapPin = null;
var popupCloseButton = null;
var mapCard = null;

function onPopupEscPress(evt){
  if (evt.keyCode == ESC_KEYCODE){
    removeMapCard()
  }
}

function removeMapCard(){
  map.removeChild(mapCard);
  mapCard = null;
  mapPin.classList.remove('map__pin--active');
  document.removeEventListener('keydown', onPopupEscPress);
}

function showMapCard(){
  var index = mapPin.getAttribute('data');
  if (index !== null) {
    mapCard = createMapCard(simularAds[index]);
    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', mapCard);
    document.addEventListener('keydown', onPopupEscPress);
    popupCloseButton = mapCard.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', removeMapCard);
  }
}

function onMapPinCLick(evt){
  if (mapPin) {
    mapPin.classList.remove('map__pin--active');
  }

  if (mapCard) {
    removeMapCard()
  }

  mapPin = evt.currentTarget;
  mapPin.classList.add('map__pin--active');

  showMapCard();
}

function onMapPinMainMouseup(){
  map.classList.remove('map--faded');
  createMapPins(simularAds);
  document.querySelector('.map__pins').appendChild(fragment);
  noticeForm.classList.remove('notice__form--disabled');
  mapPins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPins.length; i++){
    mapPins[i].addEventListener('click', onMapPinCLick);
    mapPins[i].addEventListener('keydown', function(evt){
      if (evt.keyCode == ENTER_KEYCODE) {
        onMapPinCLick(evt);
      }
    });
  }
}

mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);



// валидация

var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var submitButton = document.querySelector('.form__submit');
var titleInput = document.querySelector('#title');
var addressInput = document.querySelector('#address');
var inputs = document.querySelectorAll('input');


addressInput.addEventListener('focusin', function() {
  addressInput.setAttribute('readonly', 'true');
})

addressInput.addEventListener('focusout', function() {
  addressInput.setAttribute('readonly', 'false');
})

timeInInput.addEventListener('input', function(evt){
  var target = evt.target;
  timeOutInput.value = target.value;
})

timeOutInput.addEventListener('input', function(evt){
  var target = evt.target;
  timeInInput.value = target.value;
})

var typesAndPrices = {
  flat: '1000',
  bungalo: '0',
  house: '5000',
  palace: '10000'
}

typeInput.addEventListener('input', function(evt){
  var target = evt.target;
  for (var key in typesAndPrices){
    if (target.value == key) {
      priceInput.setAttribute('min', `${typesAndPrices[key]}`);
    }
  }
})

var roomsAndCapacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
}

var capacityOptions = capacityInput.querySelectorAll('option');

roomNumberInput.addEventListener('input', function(evt){
  var target = evt.target;

  var guests = roomsAndCapacities[target.value];

  capacityOptions.forEach(function(option) {
    option.removeAttribute('disabled');
    option.removeAttribute('selected');
    if ( guests.indexOf(+option.value) < 0 ) {
      option.disabled = true;
    }
    if ( guests.indexOf(+option.value) === 0 ) {
      option.selected = true;
    }
  });
})

inputs.forEach(function(input) {

  input.addEventListener('invalid', function() {

    input.setAttribute('style', 'border-color: red');

    if (input.validity.tooShort) {
      var minlength = input.getAttribute('minlength');
      input.setCustomValidity('Минимально допустимое количество символов ' + minlength + '. Длина текста сейчас: ' + input.value.length);
    } else if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле');
    } else if (input.validity.rangeUnderflow) {
      var min = input.getAttribute('min');
      input.setCustomValidity('Значение должно быть больше или равно ' + min);
    } else {
      input.setCustomValidity('');
    }
  })
})

submitButton.addEventListener('click', function(evt) {
  if (addressInput.value.length === 0) {
    evt.preventDefault();
  }
})
