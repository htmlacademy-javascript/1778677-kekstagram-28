const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const editForm = document.querySelector('#upload-select-image');
const scaleControlSmallerButton = editForm.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = editForm.querySelector('.scale__control--bigger');
const scaleControlValue = editForm.querySelector('.scale__control--value');
const previewImg = editForm.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

scaleControlSmallerButton.addEventListener('click', () =>{
  const scaleValue = +/\d+/.exec(scaleControlValue.value);
  const newValue = scaleValue - SCALE_STEP;
  if(scaleValue > MIN_SCALE){
    scaleControlValue.value = `${newValue}%`;
    scaleImage(newValue);
  }
});

scaleControlBiggerButton.addEventListener('click', () =>{
  const scaleValue = +/\d+/.exec(scaleControlValue.value);
  const newValue = scaleValue + SCALE_STEP;
  if(scaleValue < MAX_SCALE){
    scaleControlValue.value = `${newValue}%`;
    scaleImage(newValue);
  }
});

const resetScale = () => scaleImage(DEFAULT_SCALE);

export {resetScale};

