// 'use strict';

// Вторая задача:

const rain = Math.round(Math.random() * 1);

rain === 1 ? console.log('Пошёл дождь. Возьмите зонт!') : console.log('Дождя нет!');

// Третья задача:

const mathScores = +prompt('Введите кол-во баллов по математике:');
const russianScores = +prompt('Введите кол-во баллов по русскому языку:');
const informaticsScores = +prompt('Введите кол-во баллов по информатике:');
const scores = mathScores + russianScores + informaticsScores;

if (isNaN(scores)) {
  console.log('Введите число!');
} else if (scores >= 256) {
  console.log('Поздравляю, вы поступили на бюджет!');
} else {
  console.log('Вы не поступили!');
}

// Четвёртая задача:

const howMuchMOney = +prompt('Сколько денег вы хотите снять?');

if (isNaN(howMuchMOney)) {
  console.log('Ошибка');
} else if (howMuchMOney < 100) {
  console.log('Минимальная купюра в банкомает 100руб!');
} else if (howMuchMOney % 100 !== 0) {
  console.log('В банкомате имеются только купюры номиналом: 100, 1000, 5000');
} else if (howMuchMOney >= 100) {
  console.log(`Банкомат может выдать сумму: ${howMuchMOney}`);
}
