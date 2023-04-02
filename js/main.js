import {showAlert} from './util.js';
import {getData} from './api.js';
import './drawing_thumbnails.js';
import {renderGallery} from './drawing_big_picture.js';
import {setUserFormSubmit, closeEditForm} from './user_form.js';
import './scale.js';
import './effect.js';

getData()
  .then((pictures) => renderGallery(pictures)
  ).
  catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeEditForm);
