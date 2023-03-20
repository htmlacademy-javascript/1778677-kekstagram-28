const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureElement = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImage = bigPictureElement.querySelector('img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const commentTemplate = document.querySelector('#social__comments').content.querySelector('.social__comment');


const renderComment = (item) => {
  const commentFragment = document.createDocumentFragment();

  item.comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentsList.appendChild(commentElement);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
  });

  commentsList.appendChild(commentFragment);
};


const renderBigPicture = (picture) =>{
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  commentsList.innerHTML = '';
  renderComment(picture);

};


export {renderBigPicture};

