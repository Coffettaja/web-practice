'use strict';
const triggers = document.querySelectorAll('.menu__link')
const highlight = document.createElement('span')

highlight.classList.add('highlight')
document.body.append(highlight)

function highlightLink() {
  // gets the smallest rectangle which contains the entire element, as a DOMRect object
  const linkCoords = this.getBoundingClientRect()
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  }
  highlight.style.width = `${coords.width}px`
  highlight.style.height = `${coords.height}px`
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))