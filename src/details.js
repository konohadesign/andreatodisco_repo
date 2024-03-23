import { TextLinesReveal } from './textLinesReveal'

/**
 * Class representing an individual Detail Content item within the .details-section.
 */
export class DetailContentItem {
  // DOM elements
  DOM = {
    // Main detail content item element
    el: null,
    // Title element
    title: null,
    // Image wrapper and image
    imgWrap: null,
    image: null,
    // Content text
    text: null,
  }

  /**
   * Constructor.
   * @param {Element} DOM_el - Main detail content item element (.details-cl-item)
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el
    this.DOM.title = this.DOM.el.querySelector('.details-title')
    this.DOM.imgWrap = this.DOM.el.querySelector('.details-image-wrapper')
    this.DOM.image = this.DOM.imgWrap.querySelector('.details-front-image')
    this.DOM.text = this.DOM.el.querySelector('.details-info-wrapper')
    // Initialize animations or any interactive elements here
    // For example, animating the text lines
    this.textAnimation = new TextLinesReveal(this.DOM.text)
  }

  // Additional methods to animate or interact with the item can be added here
}

// Example usage, assuming the .details-cl-item elements are dynamically generated and rendered
document.addEventListener('DOMContentLoaded', () => {
  const detailItems = document.querySelectorAll('.details-cl-item')
  detailItems.forEach((item) => {
    new DetailContentItem(item)
  })
})
