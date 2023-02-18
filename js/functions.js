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


