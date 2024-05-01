import {deleteTr} from './control.js';

export const formModal = document.querySelector('.popup__form');

export const checkboxDiscount = document.querySelector('.form__checkbox');
checkboxDiscount.removeAttribute('required');

export const discount = document.querySelector('.discount');
discount.removeAttribute('required');
export const totalAmount = document.querySelector('.amount-money');
export const thead = document.querySelector('.thead-crm');
thead.addEventListener('click', deleteTr);
export const tableCrm = document.querySelector('.table-crm');
export const addProductBtn = document.querySelector('.form__submit_cms');
addProductBtn.addEventListener('click', () => {
  overlayShow.style.display = 'block';
});
export const overlay = document.querySelector('.overlay');
export const overlayShow = document.querySelector('.overlay_show');
export const overlayCloseBtn = document.querySelector('.popup__close');
export const popup = document.querySelector('.popup');
export const iconBasket = document.querySelector('.button-basket');
export const productAddTable = document.querySelector('.form__submit_add-from');
export let amountMoneyAddFrom = document.querySelector('.amount-money_add-from');
export let amountMoneyCms = document.querySelector('.amount-money_cms');
export const trElements = document.querySelectorAll('tr');
trElements.forEach((tr) => {
  tr.classList.add('product-tr');
});
