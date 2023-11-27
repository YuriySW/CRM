// tasksHard_1

const income = +prompt('Введите ваш доход:');

if (isNaN(income)) {
  console.log('Введите сумму в цифрах');
} else if (income <= 15000) {
  console.log(`Сумма вашего налога ${income * 0.13}`);
} else if (income > 15000 && income <= 50000) {
  console.log(`Сумма вашего налога ${income * 0.2}`);
} else if (income > 50000) {
  console.log(`Сумма вашего налога ${income * 0.3}`);
}

// tasksHard_2

{
  const income = +prompt('Введите ваш доход:');

  if (isNaN(income)) {
    console.log('Введите сумму в цифрах');
  } else if (income <= 15000) {
    console.log(`Сумма вашего налога ${income * 0.13}`);
  } else if (income > 15000 && income <= 50000) {
    console.log(`Сумма вашего налога ${(income - 15000) * 0.2}`);
  } else if (income > 50000) {
    console.log(`Сумма вашего налога ${(income - 50000) * 0.3}`);
  }
}
