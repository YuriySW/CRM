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

if (isNaN(howMuchMOney) || howMuchMOney < 0) {
  console.log('Некорректный ввод');
} else if (howMuchMOney % 100 !== 0) {
  console.log('В банкомате имеются только купюры номиналом: 100, 1000, 5000');
}

// tasksHard_1
{
  const income = +prompt('Введите ваш доход:');

  if (income <= 15000) {
    console.log(`Сумма вашего налога ${income * 0.13}`);
  } else if (income <= 50000) {
    console.log(`Сумма вашего налога ${income * 0.2}`);
  } else {
    console.log(`Сумма вашего налога ${income * 0.3}`);
  }

  //   if (income > 0 && income <= 15000) {
  //     console.log(`Сумма вашего налога ${income * 0.13} рублей`);
  //   }

  //   if (income > 15000 && income <= 50000) {
  //     console.log(`Сумма вашего налога ${income * 0.2} рублей`);
  //   }

  //   if (income > 50000) {
  //     console.log(`Сумма вашего налога ${income * 0.3} рублей`);
  //   }
}

// tasksHard_2

let income = +prompt('Введите ваш доход:');
let rest = income;
let tax = 0;

if (income > 50000) {
  rest = income - 50000;
  tax += rest * 0.3;
  income = income - rest;
}

if (income > 15000) {
  rest = income - 15000;
  tax += rest * 0.2;
  income = income - rest;
}

if (income > 0) {
  tax += income * 0.13;
  console.log(`Сумма вашего налога ${tax} рублей`);
}
