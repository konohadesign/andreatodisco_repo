// WorksItem.js
class WorksItem {
  constructor(element) {
    this.title = element.querySelector('.works-title')
    this.image = element.querySelector('.front-image')
    this.detailsLink = element.querySelector('.details-link')
  }
}

// DetailsItem.js
class DetailsItem {
  constructor(element) {
    this.title = element.querySelector('.details-title')
    this.image = element.querySelector('.details-front-image')
    this.infoParagraph = element.querySelector('.details-paragraph')
    this.backButton = element.querySelector('.details-back')
    this.galleryImages = Array.from(
      element.querySelectorAll('.image-gallery-img')
    )
  }
}

// Export both classes
export { WorksItem, DetailsItem }
