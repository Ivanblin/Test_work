// валидация формы
const inputName = document.querySelector('#form-name'),
      inputAdress = document.querySelector('#form-adress'),
      inputTel = document.querySelector('#form-tel');

inputName.addEventListener('input', (e) => {
  e.target.value = e.target.value.substr(0, 21)
  valueName = e.target.value
})

inputAdress.addEventListener('input', (e) => {
  valueAdress = e.target.value
})

inputTel.addEventListener('input', (e) => {
  valueTel = e.target.value
})


inputName.addEventListener('keydown', (e) => {
  prohibitionDigits(e)
})

function prohibitionDigits(event) {
  if ("1234567890.".indexOf(event.key) != -1)
    event.preventDefault();
}

// маска на телефон
window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});

// Делаем Ajax-запрос
const preloaderForm = document.querySelector('#preloader-form'),
      form = document.querySelector('#form'),
      submitForm = document.querySelector('#submit-form'),
      errorForm = document.querySelector('#error-form'),
      infoForm = document.querySelector('#info-form');

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(inputName.value.length)
  console.log(inputAdress.value.length)
  console.log(inputTel.value.length)

  if (inputName.value.length < 2 || inputAdress.value.length < 3 || inputTel.value.length != 17) {
    errorForm.style.display = 'block'
  } else {
    errorForm.style.display = 'none'
    form.style.display = 'none'
    preloaderForm.style.display = 'block'

    const postForm = new XMLHttpRequest();

    postForm.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

    postForm.send();

    postForm.onload = function() {
      setTimeout(() => {
        preloaderForm.style.display = 'none'
        form.style.display = 'block'
        inputName.value = ''
        inputAdress.value = ''
        inputTel.value = ''
  
      }, 2000)

      if (postForm.status != 200) {
        alert(`Ошибка ${postForm.status}: ${postForm.statusText}`); 
      } else {
        console.log(JSON.parse(postForm.response))
      }
    };
  }
})
