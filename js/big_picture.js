const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureElement = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImage = bigPictureElement.querySelector('img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');


const renderBigPicture = (picture) =>{
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;

};


export {renderBigPicture};

