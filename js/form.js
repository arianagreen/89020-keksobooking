'use strict';

// модуль, который работает с формой объявления

(function () {
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

  typeInput.addEventListener('input', function(evt){
    var target = evt.target;
    priceInput.setAttribute('min', `${window.data.typesAndPrices[target.value]}`);
  })

  var capacityOptions = capacityInput.querySelectorAll('option');

  roomNumberInput.addEventListener('input', function(evt){
    var target = evt.target;

    var guests = window.data.roomsAndCapacities[target.value];

    capacityOptions.forEach(function(option) {
      option.removeAttribute('disabled');
      option.removeAttribute('selected');
      if ( guests.indexOf(+option.value) < 0 ) {
        option.disabled = true;
      }
      option.selected = guests.indexOf(+option.value) === 0;
    });
  })

  inputs.forEach(function(input) {

    input.addEventListener('input', function() {

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
        input.setAttribute('style', 'border-color: green');
      }
    })
  })

  submitButton.addEventListener('click', function(evt) {
    if (addressInput.value.length === 0) {
      evt.preventDefault();
    }
  })
})();
