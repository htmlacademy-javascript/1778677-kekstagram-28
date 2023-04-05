const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (pictures, thumbnailContainer) => {
  thumbnailContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnailFragment = document.createDocumentFragment();
  pictures.forEach(({comments, description, likes, url, id}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailContainer.appendChild(thumbnailElement);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.dataset.thumbnailId = id;
  });
  thumbnailContainer.appendChild(thumbnailFragment);

};

export {renderThumbnails};

