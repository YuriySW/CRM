import {deleteTr} from './control.js';

export const editButton = document.querySelector('.button-edit');
export const totalAmount = document.querySelector('.amount-money');
export let amountMoneyCms = document.querySelector('.amount-money_cms');
export const trElements = document.querySelectorAll('tr');
export const popup = document.querySelector('.popup');
export const iconBasket = document.querySelector('.button-basket');
export const thead = document.querySelector('.thead-crm');
export const tableCrm = document.querySelector('.table-crm');
export const addProductBtn = document.querySelector('.form__submit_cms');

trElements.forEach((tr) => {
  tr.classList.add('product-tr');
});

export const setupDeleteTrHandler = () => {
  thead.addEventListener('click', deleteTr);
};
