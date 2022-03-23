'use strict'
const listMenu = document.querySelectorAll('.links-item'),
      buttonSelectionPizza = document.querySelector('.main-contant__button');
// const buttonSelectionPizza = document.querySelector('.main-contant__button')
let hash;

function scrollToTargetAdjusted(e){
  const element = document.querySelector(e);
  const headerOffset = 150;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

listMenu.forEach((e) => {
  e.addEventListener( "click" , (e) => {
    hash = '#' + e.target.dataset.hash
    scrollToTargetAdjusted(hash);
  });
})

buttonSelectionPizza.addEventListener( "click" , (e) => {
  hash = '#' + e.target.dataset.hash
  scrollToTargetAdjusted(hash);
});

// Всплывашка с выбором пиццы
const pizzaPreview = document.querySelectorAll('.item__preview'),
      modal = document.querySelector('.modal'),
      modalImg = document.querySelector('#modal-img');

pizzaPreview.forEach((e) => {
  e.addEventListener( "click" , (e) => {
    console.log(e.target.currentSrc)
    modal.style.display = 'flex'
    modalImg.src = e.target.currentSrc
    document.body.style.overflow = 'hidden';
  });
})

const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener( "click" , () => {
  modal.style.display = 'none'
  document.body.style.overflow = 'inherit';
});

const burgerToggle = document.querySelector('#burger__menu'),
      mobileMenu = document.querySelector('#mobile-menu');

burgerToggle.addEventListener( "click" , () => {
  burgerToggle.classList.toggle('open')
  mobileMenu.classList.toggle('menu__mobile_open')
});
