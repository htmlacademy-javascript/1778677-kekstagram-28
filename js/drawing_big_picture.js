import {isEscapeKey} from './util.js';
import {renderBigPicture} from './big_picture.js';
import { renderThumbnail } from './drawing_thumbnails.js';

const bigPicture = document.querySelector('.big-picture');


const thumbnailContainer = document.querySelector('.pictures');
const thumbnailOpenElements = thumbnailContainer.querySelectorAll('.picture');
const thumbnails = renderThumbnail();
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureElement();
  }
};

function openThumbnailElement (element){
  bigPicture.classList.remove('hidden');

  const picture = Array.from(thumbnailOpenElements).find(
    (item) => item.id === Number(element.querySelector('img').dataset.thumbnailId));

  console.log(picture);

  renderBigPicture(element);
  const commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
  const commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}


function closeBigPictureElement (){
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

