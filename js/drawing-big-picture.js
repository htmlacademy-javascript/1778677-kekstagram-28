import {isEscapeKey} from './util.js';
import {renderBigPicture, onCommentLoaderButtonClick} from './big-picture.js';
import {renderThumbnails} from './drawing-thumbnails.js';

const bigPictureElement = document.querySelector('.big-picture');

const thumbnailContainerElement = document.querySelector('.pictures');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

let newPictures = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureElement();
  }
};

const openThumbnailElement = (picture) => {
  bigPictureElement.classList.remove('hidden');
  renderBigPicture(picture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onThumbnailContainerElementClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if(!thumbnail){
    return;
  }
  evt.preventDefault();
  const picture = newPictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  openThumbnailElement(picture);

};


const renderGallery = (pictures) =>{
  newPictures = pictures;
  renderThumbnails(pictures, thumbnailContainerElement);
  thumbnailContainerElement.addEventListener('click', onThumbnailContainerElementClick);

};

function closeBigPictureElement(){
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onCommentLoaderButtonClick);

}

bigPictureCloseElement.addEventListener('click', () =>{
  closeBigPictureElement();
});

export { renderGallery };
