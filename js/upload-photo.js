const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileElement = document.querySelector('.img-upload__input');
const previewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const uploadPhoto = () =>{
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((effect) => (effect.style.backgroundImage = `url(${previewElement.src})`));
  }


};

export { uploadPhoto };
