// GLOBALS

var reader = new FileReader();
const title = document.querySelector('.title');
const caption = document.querySelector('.caption');
const choosePhoto = document.querySelector('.choose-file');
const addPhotos = document.querySelector('.add-button');
const photoGallery = document.querySelector('.display-photos')
let allImages = JSON.parse(localStorage.getItem('imagesLocalStorage')) || [];

// EVENT LISTENERS

window.addEventListener('load', displayPhotos);
addPhotos.addEventListener('click', selectPhotos);
photoGallery.addEventListener('click', managePost)

function displayPhotos() {
  allImages.forEach((photo) => {
    populatePhoto(photo.title, photo.caption, photo.file, photo.id, photo.favorite)
  })
  allImages.forEach((image) => {
    return new Photo(image.title, image.caption, image.favorite, image.id, image.favorite)
  })
}

function selectPhotos(e) {
  e.preventDefault();
  if(choosePhoto.files[0]){
    reader.readAsDataURL(choosePhoto.files[0]); 
    reader.onload = addNewPhoto;
  }
}

function addNewPhoto(e) {
  e.preventDefault();
  const newPhoto = new Photo(title.value, caption.value, e.target.result, Date.now())
  populatePhoto(newPhoto.title, newPhoto.caption, newPhoto.file, newPhoto.id)
  allImages.push(newPhoto);
  newPhoto.saveToStorage(allImages)
}

function populatePhoto(title, caption, file, id, favorite) {
  if (favorite === true) {
    var favoriteSVG = `"assets/favorite-active.svg"`;
  } else {
    var favoriteSVG = `"assets/favorite.svg"`;
  }
  photoGallery.innerHTML +=
   `
   <section class="unique-post" data-id="${id}">
    <p contenteditable="true" class="post-title post-text" type="text" value="${title}"></p>
    <section class="post-image-container">
      <img class="post-image" src=${file} />
    </section>
    <p contenteditable="true" class="post-caption post-text" type="text" value="${caption}"></p>
    <section class="photo-interactive-container">
      <img class="trash-button" src="assets/delete.svg">
      <img class="heart-button" src=${favoriteSVG}>
    </section>
  </section>
  `
}

function managePost(e) {
  if(e.target.classList.contains('heart-button')) {
    makeFavorite(e)
  }
  if(e.target.classList.contains('trash-button')) {
    deletePost(e)
  }
}

function makeFavorite(e) {
  const button = e.target
  const chosenPhoto = e.target.closest('.unique-post')
  const chosenPhotoId = parseInt(chosenPhoto.dataset.id)
  const chosenPhotoIndex = allImages.findIndex((image) => {
    return image.id === chosenPhotoId
  })
  const selected = allImages[chosenPhotoIndex];
  selected.favorite = !selected.favorite
  selected.saveToStorage();
  if(selected.favorite) {
    button.setAttribute("src", "assets/favorite-active.svg");
  } else {
    button.setAttribute("src", "assets/favorite.svg");
  }
}

function deletePost(e) {
  const chosenPhoto = e.target.closest('.unique-post')
  const chosenPhotoId = parseInt(chosenPhoto.dataset.id)
  const chosenPhotoIndex = allImages.findIndex((image) => {
    return image.id === chosenPhotoId
  })
  allImages[chosenPhotoIndex].deleteFromStorage(e)
  chosenPhoto.remove();
}
