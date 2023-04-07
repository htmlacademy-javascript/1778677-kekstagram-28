const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const editFormElement = document.querySelector('#upload-select-image');
const sliderElement = editFormElement.querySelector('.effect-level__slider');
const sliderContainerElement = editFormElement.querySelector('.img-upload__effect-level');
const previewImgElement = editFormElement.querySelector('.img-upload__preview img');
const effectElement = editFormElement.querySelector('.effects');
const effectLevelElement = editFormElement.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if(isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectElementChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  previewImgElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

effectElement.addEventListener('change', onEffectElementChange);

const onSliderElementUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  previewImgElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

hideSlider();

effectElement.addEventListener('change', onEffectElementChange);
sliderElement.noUiSlider.on('update', onSliderElementUpdate);

export {resetEffects};
