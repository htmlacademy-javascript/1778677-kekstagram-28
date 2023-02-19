//Функция для проверки длины строки
function checkLengthString(str, len){
  return (String(str).length <= len) ? 'true - строка проходит по длине' : 'false — строка не проходит';
}

function isPalindrome(str){
  for(let i = 0; i < str.length / 2; i++){
    if(str[i].toLowerCase() !== str[str.length - 1 - i].toLowerCase()){
      return 'false - это не палиндром';
    }
  }
  for(let i = 0; i < str.length / 2; i++){
    if(str[i] !== str[str.length - 1 - i]){
      return 'true - несмотря на разный регистр, тоже палиндром';
    }
  }
  return 'true - строка является палиндромом';


}

function extractNumber(string){
  let newString = '';

  for(let i = 0; i < string.length; i++){
    if(Number.isInteger(parseInt(string[i], 10))){
      newString = newString + string[i];
    }

  }
  return (newString.toString() !== '') ? `Результат: число ${newString}` : 'Результат: NaN';
}

function changeString(string, minLength, addedCharacters){
  while(string.length < minLength){
    if(addedCharacters.length > minLength){
      addedCharacters = addedCharacters.slice(0, minLength - 1);
      string = addedCharacters + string;
    } else {
      string = ((addedCharacters + string).length <= minLength) ? addedCharacters + string : addedCharacters.slice(0, (addedCharacters + string).length - minLength) + string;
    }
  }
  return `Результат: строка '${string}'`;
}

checkLengthString('проверяемая строка', 20);
isPalindrome('Довод');
extractNumber('2023 год');
changeString('q', 4, 'we');

