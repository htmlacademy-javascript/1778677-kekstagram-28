import {showAlert, debounce} from './util.js';
import {getData} from './api.js';
import {init, getFilterPictures} from './filter.js';
import './drawing_thumbnails.js';
import {renderGallery} from './drawing_big_picture.js';
import {setUserFormSubmit, closeEditForm} from './user_form.js';
import './scale.js';
import './effect.js';

const debounceRenderGallery = debounce(renderGallery);
getData()
  .then((pictures) => {
    init(pictures, debounceRenderGallery);
    renderGallery(getFilterPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeEditForm);
