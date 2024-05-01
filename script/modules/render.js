import {
  formModal,
  discount,
  thead,
  tableCrm,
  amountMoneyAddFrom,
  amountMoneyCms,
} from './identifier.js';
import {createRow} from './createElement.js';

export const renderGoods = (arr) => {
  const rows = arr.map(createRow);
  rows.map((trElement) => thead.append(trElement));

  totalCoast();
  return tableCrm;
};

export const totalCoast = () => {
  const allRows = document.querySelectorAll('.thead-crm__item_centr:nth-child(7)');
  let totalSum = 0;
  allRows.forEach((row) => {
    totalSum += +row.textContent.slice(1);
  });
  return (amountMoneyCms.textContent = `$${totalSum}`);
};

export const calculateTotal = () => {
  const priceInput = formModal.querySelector('#price');
  const countProduct = formModal.querySelector('#count');
  if (priceInput.value && countProduct.value) {
    let total = priceInput.value * countProduct.value;
    if (+discount.value) {
      total -= (total / 100) * +discount.value;
    }

    amountMoneyAddFrom.textContent = `$ ${total}`;
  }
  priceInput.addEventListener('input', calculateTotal);
  countProduct.addEventListener('input', calculateTotal);
  discount.addEventListener('input', calculateTotal);
};
