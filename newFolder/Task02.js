const modificationString = (words) => {
  let toWords = words.split(' ');
  const modWord = toWords[0][0].toUpperCase() + toWords[0].substring(1);
  const modWords = modWord.concat(' ', toWords[1].toLowerCase());
  return console.log(modWords);
};

modificationString('привет Мир');
