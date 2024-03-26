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
