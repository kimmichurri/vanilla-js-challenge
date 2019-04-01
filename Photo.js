class Photo {
  constructor(title, caption, file, id) {
    this.title = title
    this.caption = caption
    this.file = file
    this.id = id
    this.favorite = false
  }

  saveToStorage() {
    localStorage.setItem('imagesLocalStorage', JSON.stringify(allImages))
  }

  deleteFromStorage(chosenPhotoIndex) {
    allImages.splice(chosenPhotoIndex, 1)
    this.saveToStorage();
  }
}