$(function() {
	let $lastClicked = $('.panels')
	let $nowClicked = $('.panels')
	let clicked = false // hack to avoid problems caused by transitionend event happening twice in a row

  // Toggles the 'open' class for the panels and sets the $nowClicked to the panel clicked
	function toggleOpen(e) {
		$(this).toggleClass('open')
		if (!$(this).is($lastClicked)) {
			$lastClicked.removeClass('open')
		}

		$nowClicked = $(this)
		clicked = true
	}

	// Toggles the 'open-active' class for the panels and sets 
	// the $lastClicked to the last clicked panel
	function toggleActive(e) {
		if (e.originalEvent.propertyName.includes('flex') && clicked) {
			$nowClicked.toggleClass('open-active')
			if (!$lastClicked.is($nowClicked)) {
				$lastClicked.removeClass('open-active')
				$nowClicked.addClass('open-active')
			}
			$lastClicked = $nowClicked
			clicked = false
		}
	}

	// This still breaks when opening multiple panels at the same time....
	// Giving up for now
	// TODO fix later
	$('.panel').on('click', toggleOpen)
	$nowClicked.on('transitionend webkitTransitionEnd oTransitionEnd', toggleActive)
})