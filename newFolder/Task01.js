const convertToRub = (euro) => {
  if (Number.isNaN(parseFloat(euro)) || euro < 0) {
    return console.log(`Некорректный ввод`);
  }
  let toEuro = euro;
  const toDollar = toEuro * 1.2;
  const toRub = toDollar * 73;

  return console.log(`Сумма в рублях ${toRub}`);
};

convertToRub(50);
convertToRub(100);
convertToRub(200);
convertToRub(-100);
convertToRub('кэ');
