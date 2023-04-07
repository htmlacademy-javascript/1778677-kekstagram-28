const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const editFormElement = document.querySelector('#upload-select-image');
const scaleControlSmallerButtonElement = editFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerButtonElement = editFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = editFormElement.querySelector('.scale__control--value');
const previewImgElement = editFormElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  previewImgElement.style.transform = `scale(${value / 100})`;
  scaleControlValueElement.value = `${value}%`;
};

scaleControlSmallerButtonElement.addEventListener('click', () =>{
  const scaleValue = +/\d+/.exec(scaleControlValueElement.value);
  const newValue = scaleValue - SCALE_STEP;
  if(scaleValue > MIN_SCALE){
    scaleControlValueElement.value = `${newValue}%`;
    scaleImage(newValue);
  }
});

scaleControlBiggerButtonElement.addEventListener('click', () =>{
  const scaleValue = +/\d+/.exec(scaleControlValueElement.value);
  const newValue = scaleValue + SCALE_STEP;
  if(scaleValue < MAX_SCALE){
    scaleControlValueElement.value = `${newValue}%`;
    scaleImage(newValue);
  }
});

const resetScale = () => scaleImage(DEFAULT_SCALE);

export {resetScale};

