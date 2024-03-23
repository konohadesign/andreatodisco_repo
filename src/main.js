import './styles/style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/Flip'

//import { WorkItem } from './sliderContent'

gsap.registerPlugin(ScrollTrigger, Flip)

//let isAnimating = false

/**
 *Lenis scroll
 */

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

requestAnimationFrame(raf)

/**
 *Gsap slider animations
 */
const items = document.querySelectorAll('.works-cl-item')
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
      trigger: '.slider-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true,
    },
  })
})

// // Function to show the detail content associated with the given detailId
// function showContent(detailId) {
//   const detailContent = document.getElementById(detailId)
//   // Fade out the slider and fade in the detail content
//   gsap.to('.slider_component', {
//     autoAlpha: 0,
//     duration: 0.5,
//     onComplete: () => {
//       gsap.to(`#${detailId}`, { autoAlpha: 1, duration: 0.5 })
//       isAnimating = false
//     },
//   })
//   lenis.stop() // Stop Lenis scrolling
// }

// // Function to hide the detail content and show the slider component again
// function hideContent() {
//   gsap.to('.details-cl-item', {
//     autoAlpha: 0,
//     duration: 0.5,
//     onComplete: () => {
//       gsap.to('.slider_component', { autoAlpha: 1, duration: 0.5 })
//       isAnimating = false
//       lenis.start() // Resume Lenis scrolling
//     },
//   })
// }

// // Initialization code for work items
// // Assuming each .works-cl-item has an associated detail content identified by a unique detailId
// document.addEventListener('DOMContentLoaded', () => {
//   const items = document.querySelectorAll('.works-cl-item')
//   items.forEach((item, index) => {
//     // Create a new WorkItem instance for each item
//     // The WorkItem constructor should handle setting up the click event listener
//     // and invoking showContent with the correct detailId
//     new WorkItem(item, index) // Ensure this matches the constructor signature in ./sliderContent
//   })
// })

// // Back button event listener setup
// document.querySelector('.action--back').addEventListener('click', () => {
//   if (isAnimating) return
//   isAnimating = true
//   hideContent() // Hide the currently shown detail content and show the slider component
// })
