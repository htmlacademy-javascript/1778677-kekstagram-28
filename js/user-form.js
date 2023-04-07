import {isEscapeKey} from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import {sendData} from './api.js';
import { uploadPhoto } from './upload-photo.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_HASHTAG_COUNT = 5;
const uploadFileElement = document.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = document.querySelector('#upload-cancel');
const editFormElement = document.querySelector('#upload-select-image');
const inputHashtagElement = document.querySelector('.text__hashtags');
const textareaElement = editFormElement.querySelector('.text__description');
const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
const textareaError = 'не более 140 символов';
const HashtagError = {
  ERRORHASHTAG : 'Хэш-тег не соответствует требованиям: хэш-тег начинается с символа # (решётка), хэш-теги должны состоять только из букв и чисел, хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку',
  ERRORCOUNT : 'нельзя указать больше пяти хэш-тегов',
  ERRORUNIQUE: 'хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом, один и тот же хэш-тег не может быть использован дважды',
};
const submitButtonElement = editFormElement.querySelector('.img-upload__submit');

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

const getSuccessOrError = () => document.querySelector('.success') || document.querySelector('.error');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && getSuccessOrError() === null) {
    evt.preventDefault();
    closeEditForm();
  }
};

const onTextareaKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const pristine = new Pristine(editFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});


const closeMessage = () => {
  getSuccessOrError().remove();

  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', onOutsideElement);

};
const onButtonClose = () => {
  if(getSuccessOrError() !== null){
    closeMessage();
  }
};

function onMessageKeydown (evt){
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeMessage();
  }
}
function onOutsideElement (evt) {
  const divElement = document.querySelector('.error__inner, success__inner');
  if (evt.composedPath().includes(divElement)) {
    return;
  }
  closeMessage();
}

const showSuccessMessage = () =>{
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplateElement.cloneNode(true);
  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
  const successButtonElement = document.querySelector('.success__button');

  successButtonElement.addEventListener('click', onButtonClose);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onOutsideElement);
};

const showError = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplateElement.cloneNode(true);
  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
  const errorButtonElement = document.querySelector('.error__button');

  errorButtonElement.addEventListener('click', onButtonClose);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onOutsideElement);

};

function closeEditForm() {
  uploadFormElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  editFormElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
}


const validateTextarea = (value) => value.length <= MAX_LENGTH_COMMENT;

const getHashtag = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
};

const validateTemplate = (value) => getHashtag(value).every((item) => hashtagTemplate.test(item));
const validateCount = (value) => getHashtag(value).length <= MAX_HASHTAG_COUNT;
const validateUnique = (value) => {
  const lowerCaseTags = getHashtag(value).map((item) => item.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(textareaElement, validateTextarea, textareaError);

pristine.addValidator(inputHashtagElement, validateTemplate, HashtagError.ERRORHASHTAG);
pristine.addValidator(inputHashtagElement, validateCount, HashtagError.ERRORCOUNT);
pristine.addValidator(inputHashtagElement, validateUnique, HashtagError.ERRORUNIQUE);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};


const setUserFormSubmit = (onSuccess) => {
  editFormElement.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(showSuccessMessage)
        .then(onSuccess)
        .catch(() => {
          showError();
        })
        .finally(unblockSubmitButton);
    }
  });
};

textareaElement.addEventListener('keydown', onTextareaKeydown);
inputHashtagElement.addEventListener('keydown', onTextareaKeydown);

uploadFileElement.addEventListener('change', () =>{
  uploadFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadPhoto();
});

uploadCancelButtonElement.addEventListener('click', () => {
  closeEditForm();
});

export {setUserFormSubmit, closeEditForm};
