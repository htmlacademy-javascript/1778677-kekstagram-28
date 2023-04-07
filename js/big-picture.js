const COUNT_COMMENT_BLOCK = 5;
const bigPictureContainerElement = document.querySelector('.big-picture');
const bigPictureElement = bigPictureContainerElement.querySelector('.big-picture__img');
const bigPictureImageElement = bigPictureElement.querySelector('img');
const likesCountElement = bigPictureContainerElement.querySelector('.likes-count');
const commentsCountElement = bigPictureContainerElement.querySelector('.comments-count');
const commentsListElement = bigPictureContainerElement.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPictureContainerElement.querySelector('.social__caption');
const commentTemplateElement = document.querySelector('#social__comments').content.querySelector('.social__comment');
const commentLoaderButtonElement = document.querySelector('.comments-loader');
const commentCountElement = document.querySelector('.social__comment-count');
let commentLoaded = 0;
let commentsArray = [];


const createComment = ({avatar, name, message}) =>{
  const commentElement = commentTemplateElement.cloneNode(true);
  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComment = (comments) =>{
  commentsListElement.innerHTML = '';
  commentLoaded += COUNT_COMMENT_BLOCK;
  if(comments.length <= commentLoaded){
    commentLoaded = comments.length;
  }

  const commentFragment = document.createDocumentFragment();
  for(let i = 0; i < commentLoaded; i++) {
    commentFragment.appendChild(createComment(comments[i]));
  }
  commentsListElement.appendChild(commentFragment);
  commentCountElement.innerHTML = `${commentLoaded} из <span class="comments-count">${comments.length} комментариев</span>`;
  if(commentLoaded === comments.length){
    commentLoaderButtonElement.classList.add('hidden');
  }

};


const renderBigPicture = ({url, likes, comments, description}) =>{
  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  bigPictureDescriptionElement.textContent = description;
  commentsArray = comments;
  commentLoaded = 0;
  commentLoaderButtonElement.classList.remove('hidden');
  renderComment(comments);

};

const onCommentLoaderButtonClick = () => {
  renderComment(commentsArray);
};

commentLoaderButtonElement.addEventListener('click', onCommentLoaderButtonClick);

export {renderBigPicture, onCommentLoaderButtonClick};

