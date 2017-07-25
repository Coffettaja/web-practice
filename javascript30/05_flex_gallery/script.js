$(function() {
	let $lastClicked = $('.panels')
	let $nowClicked = $('.panels')
	let $panels = $('.panels')
	let clicked = false // hack to avoid problems caused by transitionend event happening twice in a row

  // Toggles the 'open' class for the panels and sets the $nowClicked to the panel clicked
	function toggleOpen(e) {
		$(this).toggleClass('open')
		if (!$(this).is($lastClicked)) {
			$lastClicked.removeClass('open')
		}

		// in case the user tries to interact with multiple panels very quickly
		if (!$nowClicked.is($(this))) {
			$nowClicked.removeClass('open')
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

	// This still breaks when click spamming panels....
	// Giving up for now
	// The smart way (or just not dumb way) would be to just set timer when panel clicked
	// TODO fix later
	$('.panel').on('click', toggleOpen)
	$nowClicked.on('transitionend webkitTransitionEnd oTransitionEnd', toggleActive)
})