
const $images = $(".slide-in")


// Throttle function taken from underscore (with references to underscore removed).
function throttle(func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}


function checkSlide(e) {
  console.count('haha')
  $images.each((i, elem) => {
    // SlideInAt is the halfway point of the image
    const slideInAt = (window.scrollY + window.innerHeight) - elem.height / 2
    const imageBottom = elem.offsetTop + elem.height // How far the bottom of the image is from the top of the actual window, in pixels
    const isHalfShown = slideInAt > elem.offsetTop
    
    if (isHalfShown) {
      $(elem).addClass('active')
    } else {
      $(elem).removeClass('active')
    }
  }) 
}

// The tutorial used debounce but it isn't guaranteed that the function will be run, especially when using non-standard scrolling methods, such as middle button of the mouse. This caused weird behavior with the slide in so throttle is used instead.
$(window).on('scroll', throttle(checkSlide, 20))
