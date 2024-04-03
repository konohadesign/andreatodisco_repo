import { gsap } from 'gsap'

// WorksCollection class definition
export class WorksCollection {
  constructor() {
    this.worksItems = document.querySelectorAll('.works-cl-item')
    console.log(
      'WorksCollection constructed, items found:',
      this.worksItems.length
    )
    this.init()
  }

  init() {
    this.worksItems.forEach((item, index) => {
      console.log(`Initializing item ${index + 1}`)
      item.addEventListener('click', (e) => {
        console.log('Item clicked:', item)
        e.preventDefault()
        const detailLinkId = item
          .querySelector('.details-link')
          .getAttribute('href')
          .replace('#', '')
        console.log('Detail link ID:', detailLinkId)
        const detailItemEl = document.querySelector(`#${detailLinkId}`)
        const imageEl = item.querySelector('.front-image')
        if (detailItemEl) {
          console.log('Detail item found:', detailItemEl)
          this.animateImageToDetail(imageEl, detailItemEl)
        } else {
          console.log('Detail item NOT found for ID:', detailLinkId)
        }
      })
    })
  }

  animateImageToDetail(imageEl, detailItemEl) {
    console.log('Animating image to detail view')
    gsap.to(imageEl, {
      scale: 0.6,
      duration: 0.5,
      onComplete: () => {
        this.hide()
        setTimeout(() => {
          const detailItem = new DetailItem(detailItemEl, this)
          detailItem.show()
        }, 300)
      },
    })
  }

  show() {
    console.log('Showing WorksCollection')
    gsap.to('.slider_component', { autoAlpha: 1, duration: 0.5 })
  }

  hide() {
    console.log('Hiding WorksCollection')
    gsap.to('.slider_component', { autoAlpha: 0, duration: 0.5 })
  }
}

export class DetailItem {
  constructor(el, worksCollection) {
    console.log('DetailItem constructed for element:', el)
    this.DOM = {
      el: el,
      backCtrl: el.querySelector('.details-back'),
      imgWrap: el.querySelector('.details-image-wrapper'),
      image: el.querySelector('.details-front-image'),
      title: el.querySelector('.details-title'),
      content: el.querySelector('.details-info-wrapper'),
    }
    this.worksCollection = worksCollection // Store the reference
    this.initBackControl()
  }

  initBackControl() {
    console.log('Initializing back control for DetailItem')
    this.DOM.backCtrl.addEventListener('click', (e) => {
      console.log('Back control clicked')
      e.preventDefault()
      this.hide()
      setTimeout(() => {
        // Use the stored worksCollection reference here
        console.log('Showing WorksCollection from DetailItem')
        this.worksCollection.show()
      }, 300)
    })
  }

  show() {
    console.log('Showing DetailItem')
    gsap.fromTo(this.DOM.el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
    gsap.fromTo(this.DOM.imgWrap, { x: '-100%' }, { x: '0%', duration: 0.5 })
  }

  hide() {
    console.log('Hiding DetailItem')
    gsap.to(this.DOM.el, { autoAlpha: 0, duration: 0.5 })
  }
}
