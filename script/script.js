import {checkboxDiscount} from './modules/identifier.js';
import {closeModal, formSubmit, clearTr, discountRebate} from './modules/control.js';
import {renderGoods, calculateTotal} from './modules/render.js';

export const product = [
  {
    id: 253842678,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    category: 'mobile-phone',
    units: 'шт',
    count: 3,
    price: 27000,
    total: '$500',
  },
  {
    id: 296378448,
    title: 'Радиоуправляемый автомобиль Cheetan',
    category: 'toys',
    units: 'шт',
    count: 1,
    price: 4000,
    total: '$500',
  },
  {
    id: 215796548,
    title: 'ТВ приставка MECOOL KI',
    category: 'tv-box',
    units: 'шт',
    count: 4,
    price: 12400,
    total: '$500',
  },
  {
    id: 246258248,
    title: 'Витая пара PROConnect 01-0043-3-25',
    category: 'cables',
    units: 'v',
    count: 420,
    price: 22,
    total: '$500',
  },
];

{
  const init = () => {
    closeModal();
    clearTr();
    renderGoods(product);
    discountRebate();
    formSubmit();
    calculateTotal();
  };

  window.crmInit = init;
}
