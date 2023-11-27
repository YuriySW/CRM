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
  let taxAfter = 0;
  let taxUpTo = 0;

  if (isNaN(income)) {
    console.log('Введите сумму в цифрах');
  } else if (income <= 15000) {
    console.log(`Сумма вашего налога ${income * 0.13}`);
  } else if (income > 15000 && income <= 50000) {
    taxAfter = income - 15000;
    taxUpTo = income - taxAfter;
    console.log(`Сумма вашего налога ${taxAfter * 0.2 + taxUpTo * 0.13}`);
  } else if (income > 50000) {
    taxAfter = income - 50000;
    taxUpTo = income - taxAfter;
    console.log(`Сумма вашего налога ${taxAfter * 0.3 + taxUpTo * 0.2}`);
  }
}
