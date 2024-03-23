import { DetailContentItem } from './details'

/**
 * Class representing an individual Work Item within the hero section.
 */
export class WorkItem {
  // DOM elements
  DOM = {
    // Main work item element
    el: null,
    // Image element within the work item
    image: null,
    // Title of the work item
    title: null,
  }

  /**
   * Constructor.
   * @param {Element} DOM_el - Main work item element (.works-cl-item)
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el
    this.DOM.image = this.DOM.el.querySelector('.front-image')
    this.DOM.title = this.DOM.el.querySelector('.works-title')
    // Initialize animations or any interactive elements here
    // For example:
    // this.animation = new SomeAnimationUtility(this.DOM.title);
  }

  // Additional methods for interactions or animations can be added here
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const workItems = document.querySelectorAll('.works-cl-item')
  workItems.forEach((item) => {
    new WorkItem(item)
  })
})
