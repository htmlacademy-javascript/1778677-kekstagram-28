import {isEscapeKey} from './util.js';
import {renderBigPicture, onCommentLoad} from './big_picture.js';
import {renderThumbnails} from './drawing_thumbnails.js';

const bigPicture = document.querySelector('.big-picture');

const thumbnailContainer = document.querySelector('.pictures');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureElement();
  }
};

const openThumbnailElement = (picture) => {
  bigPicture.classList.remove('hidden');
  renderBigPicture(picture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderGallery = (pictures) =>{
  renderThumbnails(pictures, thumbnailContainer);
  thumbnailContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail){
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openThumbnailElement(picture);
  });
};

function closeBigPictureElement(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onCommentLoad);

}

bigPictureCloseElement.addEventListener('click', () =>{
  closeBigPictureElement();
});

export { renderGallery };
