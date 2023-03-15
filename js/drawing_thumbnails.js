import {getFotoDescriptionObjects} from './data.js';

const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = getFotoDescriptionObjects();
const thumbnailFragment = document.createDocumentFragment();

thumbnails.forEach(({comments, description, likes, url}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailContainer.appendChild(thumbnailElement);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
});

thumbnailContainer.appendChild(thumbnailFragment);


