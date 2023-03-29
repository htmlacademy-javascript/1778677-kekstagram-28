import {isEscapeKey} from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_HASHTAG_COUNT = 5;
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const editForm = document.querySelector('#upload-select-image');
const inputHashtag = document.querySelector('.text__hashtags');
const textarea = editForm.querySelector('.text__description');
const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
const textareaError = 'не более 140 символов';
const hashtagErrors = {
  errorHashtag : 'Хэш-тег не соответствует требованиям: хэш-тег начинается с символа # (решётка), хэш-теги должны состоять только из букв и чисел, хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку',
  errorCount : 'нельзя указать больше пяти хэш-тегов',
  errorUnique: 'хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом, один и тот же хэш-тег не может быть использован дважды',
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditForm();
  }
};

const onTextKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

function closeEditForm() {
  uploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  editForm.reset();
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

pristine.addValidator(textarea, validateTextarea, textareaError);

pristine.addValidator(inputHashtag, validateTemplate, hashtagErrors.errorHashtag);
pristine.addValidator(inputHashtag, validateCount, hashtagErrors.errorCount);
pristine.addValidator(inputHashtag, validateUnique, hashtagErrors.errorUnique);


editForm.addEventListener('submit', (evt) =>{
  if(!pristine.validate()){
    evt.preventDefault();
  }

});

textarea.addEventListener('keydown', onTextKeydown);
inputHashtag.addEventListener('keydown', onTextKeydown);

uploadFile.addEventListener('change', () =>{
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});

uploadCancelButton.addEventListener('click', () => {
  closeEditForm();
});
