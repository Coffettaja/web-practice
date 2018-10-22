'use strict';

const mainNav = document.querySelector('#main')
const topOfNav = mainNav.offsetTop

// fix nav to the top of the screen when scrolled below the main nav bottom
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = mainNav.offsetHeight + 'px'
    mainNav.classList.add('fixed-nav')
  } else {
    document.body.style.paddingTop = 0
    mainNav.classList.remove('fixed-nav')
  }
}

window.addEventListener('scroll', fixNav)