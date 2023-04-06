const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadPhoto = () =>{
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${preview.src})`));
  }


};

export { uploadPhoto };
