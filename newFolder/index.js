'use strict';

const nameOfProduct = prompt('Введите наименование товара:');
const quantityOfGoods = Number(prompt('Введите количество товара:'));
const productCategory = prompt('Введите категорию товара:');
const priceOfProduct = Number(prompt('Введите цену товара:'));

console.log(typeof nameOfProduct);
console.log(typeof quantityOfGoods);
console.log(typeof productCategory);
console.log(typeof priceOfProduct);

console.log(`На складе ${quantityOfGoods} единицы товара "${nameOfProduct}" на сумму ${priceOfProduct} деревянных`);
