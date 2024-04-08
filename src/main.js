import './styles/style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)
console.log(
  'GSAP Plugins Registered: ',
  gsap.plugins.ScrollTrigger,
  gsap.plugins.Flip
)

// Initialize Lenis with a base lerp value
const lenis = new Lenis({
  lerp: 0.2, // Starting point for the lerp value
})

// Custom function to dynamically adjust lerp based on velocity (conceptual)
function adjustLerpBasedOnVelocity() {
  const currentVelocity = Math.abs(lenis.velocity) // Hypothetical way to get current scroll velocity

  if (currentVelocity < 1) {
    // As the scroll velocity decreases, reduce the lerp value to make the scroll stop more quickly
    lenis.options.lerp = 0.05 // Example of dynamically adjusting lerp, adjust as necessary
  } else {
    // Reset lerp value for normal scrolling speed
    lenis.options.lerp = 0.1
  }
}

// Example of integrating dynamic lerp adjustment into the animation loop (conceptual)
function raf(time) {
  adjustLerpBasedOnVelocity() // Adjust lerp based on current velocity
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const items = document.querySelectorAll('.works-cl-item')
console.log(`Found ${items.length} works-cl-item elements`)

const height = document.querySelector('.works-cl-wrapper').offsetWidth
const width = (items.length - 1) * 100

document.querySelector('.slider-wrapper').style.height = `${height / 16}rem`

gsap.to('.works-cl-item', {
  xPercent: -width,
  ease: 'none',
  scrollTrigger: {
    trigger: '.slider-wrapper',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    markers: false,
  },
})

items.forEach((item) => {
  gsap.to(item.querySelector('.front-image'), {
    xPercent: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.slider-wrapper',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      markers: true,
    },
  })
  console.log(`Animation applied to item:`, item)
})

//init constructors

import { WorksItem, DetailsItem } from './constructors'
//import { DetailsItem } from './constructors'

// Prepare work items and keep them visible initially
const workItems = []
document.querySelectorAll('.works-cl-item').forEach((itemElement) => {
  const workItem = new WorksItem(itemElement)
  workItem.element = itemElement // Store the element for direct access
  // No need to set display to 'none' or adjust pointer-events since they should be visible
  workItems.push(workItem)
})

// Prepare details items but keep them hidden initially
const detailsItems = []
document.querySelectorAll('.details-cl-item').forEach((itemElement) => {
  const detailsItem = new DetailsItem(itemElement)
  detailsItem.element = itemElement // Store the element for direct access
  detailsItem.element.style.display = 'none' // Ensure it's hidden
  detailsItem.element.style.pointerEvents = 'none' // Make it non-interactive initially
  detailsItems.push(detailsItem)
})

// Initial visibility for works items is set via CSS, so they should be visible by default

//functions

function disableScroll() {
  document.body.style.overflow = 'hidden'
}

function enableScroll() {
  document.body.style.overflow = ''
}

let originalScrollTop = 0 // To save the scroll position

function lockScrollPosition() {
  originalScrollTop = window.scrollY // Save the current scroll position

  document.documentElement.style.overflow = 'hidden' // Hide scrollbar and disable scroll
  document.body.scrollIntoView() // Optional, aligns the document back to the top

  // Compensate for the scrollbar's space to prevent layout shift
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

function unlockScrollPosition() {
  document.documentElement.style.overflow = ''
  document.body.style.paddingRight = '' // Reset padding right

  // Restore the scroll position
  window.scrollTo(0, originalScrollTop)
}

//TRANSITION

// GSAP Timeline for fading out the entire slider
const sliderFadeOutTimeline = gsap
  .timeline({
    paused: true,
    onStart: () => lockScrollPosition(), // Lock scroll position when the timeline starts
  })
  .to('.slider_component', { autoAlpha: 0, duration: 0.5 })

// Function to handle fading in the appropriate details item
function fadeInDetailsItem(id) {
  const detailsItem = detailsItems.find((item) => item.element.id === id)
  if (!detailsItem) return

  gsap.to(detailsItem.element, {
    autoAlpha: 1,
    duration: 0.5,
    y: 0,
    onStart: () => {
      detailsItem.element.style.display = 'block'
      detailsItem.element.style.pointerEvents = 'auto' // Make it interactive as it starts to fade in
    },
  })
}

// Setup click event for each works item to trigger the transition
document.querySelectorAll('.details-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault() // Prevent default link behavior
    disableScroll() // Disable scrolling before starting the transition
    const targetId = link.getAttribute('href').slice(1) // Assuming the href is something like "#detailsId"

    // Play the fade-out timeline for the slider
    sliderFadeOutTimeline.play().then(() => {
      // Once the slider is faded out, fade in the details item with matching ID
      fadeInDetailsItem(targetId)
    })
  })
})

// This function reverses the visibility of the details item and fades the slider back in
function reverseDetailsAnimationAndShowSlider(currentDetailsId) {
  const detailsItem = detailsItems.find(
    (item) => item.element.id === currentDetailsId
  )
  if (!detailsItem) return

  gsap.to(detailsItem.element, {
    autoAlpha: 0,
    duration: 0.5,
    onComplete: () => {
      detailsItem.element.style.display = 'none'
      detailsItem.element.style.pointerEvents = 'none' // Make it non-interactive after it fades out

      // Once the details item is hidden, reverse the slider animation to show it again
      sliderFadeOutTimeline.reverse()

      // Re-enable scrolling after the reverse animation starts
      // Consideration: If the reverse animation is long, you might move this call
      // to an onReverseComplete callback set on the sliderFadeOutTimeline itself, if it doesn't interfere with other logic.
      unlockScrollPosition()
    },
  })
}

detailsItems.forEach((detailsItem) => {
  // Assuming each detailsItem.element has a unique ID and the back button is part of this element
  const backButton = detailsItem.element.querySelector('.details-back')
  if (backButton) {
    backButton.addEventListener('click', () => {
      enableScroll() // Re-enable scrolling after the details view is visible
      reverseDetailsAnimationAndShowSlider(detailsItem.element.id)
    })
  }
})
