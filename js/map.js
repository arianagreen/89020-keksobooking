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

  for (i = 0; i < quantity; i++) {
    var ad = {};
    ad.author = {avatar: `img/avatars/user0${i + 1}.png`};

    ad.location = {};

    ad.location.x = getRandomIntInclusive(300, 900) - document.querySelector('.map__pin').offsetWidth / 2;
    ad.location.y = getRandomIntInclusive(100, 500) - document.querySelector('.map__pin').offsetHeight;

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

document.querySelector('section.map').classList.remove('map--faded');

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива

var fragment = document.createDocumentFragment();

function createMapPins(array){
  for (var i = 0; i < array.length; i++) {
     var newMapPin = document.createElement('button');
     newMapPin.className = 'map__pin';
     newMapPin.setAttribute('style', `left: ${array[i].location.x}, top: ${array[i].location.y}`);

     var newMapPinImage = document.createElement('img');
     newMapPinImage.setAttribute('src', `${array[i].author.avatar}`);
     newMapPinImage.setAttribute('width', '40');
     newMapPinImage.setAttribute('height', '40');
     newMapPinImage.draggable = 'true';

     newMapPin.appendChild(newMapPinImage);
     fragment.appendChild(newMapPin);
  }
}

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment

document.querySelector('.map__pins').appendChild(fragment);


// 5. создать DOM-элемент объявления на основе первого первого по порядку элемента из сгенерированного массива и шаблона template article.map__card

var mapCard = document.querySelector('template').content.querySelector('article.map__card');

var newMapCard = mapCard.cloneNode(true);

var firstAd = simularAds[0];

newMapCard.querySelector('h3').textContent = firstAd.offer.title;
newMapCard.querySelector('.popup__price').textContent = `${firstAd.offer.price}&#x20bd;/ночь`;

var offerTypeElement =  newMapCard.querySelector('h4');

if (firstAd.offer.type == 'flat') {
  offerTypeElement.textContent = 'Квартира';
} else if (firstAd.offer.type == 'bungalo') {
  offerTypeElement.textContent = 'Бунгало';
} else {
  offerTypeElement.textContent = 'Дом';
}

newMapCard.querySelector('p:nth-of-type(3)').textContent = `${firstAd.offer.rooms} комнаты для ${firstAd.offer.guests} гостей`;
newMapCard.querySelector('p:nth-of-type(4)').textContent = `Заезд после ${firstAd.offer.checkin}, выезд до ${firstAd.offer.checkout}`;

var popupFeatures = newMapCard.querySelector('.popup__features');
var popupFeaturesList = newMapCard.querySelectorAll('.feature');
var popupFeaturesFragment = document.createDocumentFragment();

for(var i = 0; i < popupFeaturesList.length; i++) {
  var classNames = popupFeaturesList[i].className;

  for(var j = 0; j < firstAd.offer.features.length; j++) {
    var feature = firstAd.offer.features[j];

    if (classNames.indexOf('feature--' + feature) >= 0){ //проверка совпадения названия класса и бонусов локации)
      var excessElement = newMapCard.querySelector('.feature--' + feature);
      popupFeaturesFragment.appendChild(excessElement);
    }
  }
}

popupFeatures.innerHTML = '';
popupFeatures.appendChild(popupFeaturesFragment);

newMapCard.querySelector('p:last-of-type').innerContent = firstAd.offer.description;
newMapCard.querySelector('img').setAttribute('src', `${firstAd.author.avatar}`);

document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', newMapCard);