import './styles/style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/Flip'

import { WorksCollection, DetailItem } from './constructors'

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

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed')
  const worksCollection = new WorksCollection()
  console.log('WorksCollection instance created')

  let activeDetailItem = null // This will hold the currently active DetailItem instance

  document.querySelectorAll('.details-link').forEach((link) => {
    link.addEventListener('click', function (e) {
      console.log('Details link clicked', this)
      e.preventDefault()
      const detailId = this.getAttribute('href')
      console.log('Detail ID:', detailId)
      const detailItemEl = document.querySelector(detailId)
      if (detailItemEl) {
        console.log('Detail item element found:', detailItemEl)
        worksCollection.hide()
        setTimeout(() => {
          const detailItem = new DetailItem(detailItemEl, worksCollection)
          detailItem.show()
          activeDetailItem = detailItem // Store the active DetailItem reference
          console.log('DetailItem instance created and shown')
        }, 500) // Adjust timing as necessary
      }
    })
  })

  document.querySelectorAll('.details-back').forEach((button) => {
    button.addEventListener('click', function (e) {
      console.log('Back button clicked')
      e.preventDefault()
      if (activeDetailItem) {
        console.log('Hiding active detail item')
        activeDetailItem.hide()
        setTimeout(() => {
          worksCollection.show()
          console.log('Showing works collection')
        }, 500)
      }
    })
  })
})
