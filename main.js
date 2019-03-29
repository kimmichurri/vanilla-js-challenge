// GLOBALS

var reader = new FileReader();
const title = document.querySelector('.title');
const caption = document.querySelector('.caption');
const choosePhoto = document.querySelector('.choose-file');
const viewFavorites = document.querySelector('.view-faves-button');
const addPhotos = document.querySelector('.add-button');
const photoGallery = document.querySelector('.display-photos')
let allImages = [];

// EVENT LISTENERS

window.addEventListener('load', displayPhotos);
addPhotos.addEventListener('click', selectPhotos);

function displayPhotos() {
  console.log('display')
  allImages.forEach((photo) => {
    return populatePhoto(photo.title, photo.caption, photo.file, photo.id, photo.favorite)
  })
  allImages.forEach((image) => {
    return new Photo(image.title, image.caption, image.favorite, image.id, image.favorite)
  })
}

function selectPhotos(e) {
  console.log('select')
  e.preventDefault();
  if(choosePhoto.files[0]){
    reader.readAsDataURL(choosePhoto.files[0]); 
    reader.onload = addNewPhoto;
  }
}

function addNewPhoto(e) {
  console.log('add')
  e.preventDefault();
  const newPhoto = new Photo(title.value, caption.value, e.target.result, Date.now())
  allImages.push(newPhoto);
  populatePhoto(newPhoto.title, newPhoto.caption, newPhoto.file, newPhoto.id)
}

function populatePhoto(title, caption, file, id, favorite) {
  console.log('populate')
  photoGallery.innerHTML +=
   `
   <section class="unique-post" data-id="${id}">
    <input class="post-title post-text" type="text" value="${title}">
    <section class="post-image"><img src=${file} /></section>
    <input class="post-caption post-text" type="text" value="${caption}">
  </section>
  <section>
  </section>
  `
}