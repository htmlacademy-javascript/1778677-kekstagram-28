
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureElement = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImage = bigPictureElement.querySelector('img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const commentTemplate = document.querySelector('#social__comments').content.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const COUNT_COMMENT_BLOCK = 5;
let commentLoaded = 0;
let commentsArray = [];


const createComment = ({avatar, name, message}) =>{
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComment = (comments) =>{
  commentsList.innerHTML = '';
  commentLoaded += COUNT_COMMENT_BLOCK;
  if(comments.length <= commentLoaded){
    commentLoaded = comments.length;
  }

  const commentFragment = document.createDocumentFragment();
  for(let i = 0; i < commentLoaded; i++) {
    commentFragment.appendChild(createComment(comments[i]));
  }
  commentsList.appendChild(commentFragment);
  commentCount.innerHTML = `${commentLoaded} из <span class="comments-count">${comments.length} комментариев</span>`;
  if(commentLoaded === comments.length){
    commentsLoaderButton.classList.add('hidden');
  }
};


const renderBigPicture = (picture) =>{
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  commentsArray = picture.comments;
  commentLoaded = 0;
  renderComment(picture.comments);
  commentsLoaderButton.classList.remove('hidden');

};

const onCommentLoad = () => {
  renderComment(commentsArray);
};

commentsLoaderButton.addEventListener('click', onCommentLoad);

export {renderBigPicture, onCommentLoad};

