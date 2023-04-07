import {showAlert, debounce} from './util.js';
import {getData} from './api.js';
import {init, getFilterPictures} from './filter.js';
import {renderGallery} from './drawing-big-picture.js';
import {setUserFormSubmit, closeEditForm} from './user-form.js';
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
