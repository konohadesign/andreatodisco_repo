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

const lenis = new Lenis()
console.log('Lenis Initialized')

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

lenis.on('scroll', () => {
  ScrollTrigger.update()
})

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

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
    markers: true,
  },
})

items.forEach((item) => {
  gsap.to(item.querySelector('.front-image'), {
    xPercent: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: item,
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

// Initial visibility for works items is set via CSS, so they should be visible by default

// GSAP Timeline for fading out the entire slider
const sliderFadeOutTimeline = gsap
  .timeline({ paused: true })
  .to('.slider_component', { autoAlpha: 0, duration: 0.5 })

function disableScroll() {
  document.body.style.overflow = 'hidden'
}

function enableScroll() {
  document.body.style.overflow = ''
}

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
