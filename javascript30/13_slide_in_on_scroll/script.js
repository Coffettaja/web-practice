
// Important to debounce in case of function calls on scroll so the function
// would not be called hundreds of times.

const $images = $(".slide-in")

function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function() {
    let context = this, args = arguments
    let later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function checkSlide(e) {
  $images.each((i, elem) => {
    // SlideInAt is the halfway point of the image
    const slideInAt = (window.scrollY + window.innerHeight) - elem.height / 2
    const imageBottom = elem.offsetTop + elem.height // How far the bottom of the image is from the top of the actual window, in pixels
    const isHalfShown = slideInAt > elem.offsetTop
    const isNotScrolledPast = window.scrollY < imageBottom
    if (isHalfShown && isNotScrolledPast) {
      $(elem).addClass('active')
    } else {
      $(elem).removeClass('active')
    }
  }) 
}

$(window).on('scroll', debounce(checkSlide))
