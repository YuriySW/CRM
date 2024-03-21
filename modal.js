'use strict';

const titleModal = document.querySelector('.popup__title');
const formModal = document.querySelector('.form');
const checkboxDiscount = document.querySelector('.form__checkbox');
const discount = document.querySelector('.discount');
const totalAmount = document.querySelector('.amount-money');

const obj = {
  id: 253842678,
  title: 'Смартфон Xiaomi 11T 8/128GB',
  price: 27000,
  description:
    'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
  category: 'mobile-phone',
  discont: false,
  count: 3,
  units: 'шт',
  images: {
    small: 'img/smrtxiaomi11t-m.jpg',
    big: 'img/smrtxiaomi11t-b.jpg',
  },
};

const createRow = (obj) => {
  const trElement = document.createElement('tr');

  for (const key in obj) {
    const tdElement = document.createElement('td');
    tdElement.textContent = obj[key];
    trElement.append(tdElement);
  }

  return trElement;
};

const renderGoods = (arr) => {
  const rows = [arr].map(createRow);
  const table = document.createElement('table');
  rows.map((trElement) => table.append(trElement));

  return table;
};

console.log(renderGoods(obj));
