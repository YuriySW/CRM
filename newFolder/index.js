'use strict';

const nameOfProduct = prompt('Введите наименование товара:');
const quantityOfGoods = Number(prompt('Введите количество товара:'));
const productCategory = prompt('Введите категорию товара:');
const priceOfProduct = Number(prompt('Введите цену товара:'));

console.log(nameOfProduct, typeof nameOfProduct);
console.log(quantityOfGoods, typeof quantityOfGoods);
console.log(productCategory, typeof productCategory);
console.log(priceOfProduct, typeof priceOfProduct);

console.log(`На складе ${quantityOfGoods} единицы товара "${nameOfProduct}" на сумму ${priceOfProduct} деревянных`);
