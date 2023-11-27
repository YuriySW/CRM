'use strict';

const nameOfProduct = prompt('Введите наименование товара:');
const quantityOfGoods = +prompt('Введите количество товара:');
const productCategory = prompt('Введите категорию товара:');
const priceOfProduct = +prompt('Введите цену товара:');

console.log(nameOfProduct, typeof nameOfProduct);
console.log(quantityOfGoods, typeof quantityOfGoods);
console.log(productCategory, typeof productCategory);
console.log(priceOfProduct, typeof priceOfProduct);

if (isNaN(quantityOfGoods) || isNaN(priceOfProduct)) {
  console.log('Вы ввели некорректные данные');
} else {
  console.log(`На складе ${quantityOfGoods} единицы товара "${nameOfProduct}" на сумму ${priceOfProduct} деревянных`);
}
