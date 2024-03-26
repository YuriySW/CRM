'use strict';

const titleModal = document.querySelector('.popup__title');
const formModal = document.querySelector('.form');
const checkboxDiscount = document.querySelector('.form__checkbox');
const discount = document.querySelector('.discount');
const totalAmount = document.querySelector('.amount-money');
const theadCrmIitem = document.querySelector('.thead-crm__item');
const theadCrmItemCentr = document.querySelector('.thead-crm__item_centr');
const theadCrmItemPieces = document.querySelector('.thead-crm__item_pieces');
const thead = document.querySelector('.thead-crm');
const trTitleCrm = document.querySelector('.tr-title-crm');
const tableCrm = document.querySelector('.table-crm');
const buttonsCms = document.querySelectorAll('.set-buttons-wrap')[1];

const product = [
  {
    id: 253842678,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    category: 'mobile-phone',
    units: 'шт',
    count: 3,
    price: '$27000',
    total: '$500',
  },
  {
    id: 296378448,
    title: 'Радиоуправляемый автомобиль Cheetan',
    category: 'toys',
    units: 'шт',
    price: '$4000',
    count: 1,
    total: '$500',
  },
  {
    id: 215796548,
    title: 'ТВ приставка MECOOL KI',
    category: 'tv-box',
    units: 'шт',
    count: 4,
    price: '12400',
    total: '$500',
  },
  {
    id: 246258248,
    title: 'Витая пара PROConnect 01-0043-3-25',
    category: 'cables',
    units: 'v',
    price: '$22',
    count: 420,
    total: '$500',
  },
];

const createRow = (obj) => {
  const trElement = document.createElement('tr');
  let index = 0;
  for (const key in obj) {
    const tdElement = document.createElement('td');
    tdElement.classList.add('thead-crm__item');
    tdElement.textContent = obj[key];
    trElement.append(tdElement);

    if (index >= 3) {
      tdElement.classList.add('thead-crm__item_centr');
    }
    if (index === 3) {
      tdElement.classList.add('thead-crm__item_pieces');
    }
    index++;
  }

  const buttonsCmsClone = buttonsCms.cloneNode(true);

  const tdButtons = document.createElement('td');
  tdButtons.classList.add('thead-crm__item', 'thead-crm__item_centr');
  tdButtons.appendChild(buttonsCmsClone);
  trElement.append(tdButtons);

  return trElement;
};

const renderGoods = (arr) => {
  const rows = arr.map(createRow);
  rows.map((trElement) => thead.append(trElement));

  return tableCrm;
};

console.log(renderGoods(product));
