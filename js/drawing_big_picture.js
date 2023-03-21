import {isEscapeKey} from './util.js';
import {renderBigPicture} from './big_picture.js';
import {thumbnails} from './drawing_thumbnails.js';

const bigPicture = document.querySelector('.big-picture');


const thumbnailContainer = document.querySelector('.pictures');
const thumbnailOpenElements = thumbnailContainer.querySelectorAll('.picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureElement();
  }
};

const openThumbnailElement = (element) => {
  bigPicture.classList.remove('hidden');
  const picture = thumbnails.find(
    (item) => Number(item.id) === Number(element.dataset.thumbnailId));
  renderBigPicture(picture);
  const commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
  const commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};


function closeBigPictureElement(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

}


thumbnailOpenElements.forEach((element) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    openThumbnailElement(element);
  });
});


bigPictureCloseElement.addEventListener('click', () =>{
  closeBigPictureElement();
});

