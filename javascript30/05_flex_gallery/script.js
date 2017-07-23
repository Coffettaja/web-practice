$(function() {
	let $lastClicked = $('.panel1')
	let $lastClickedTemp = $('.panel1')
	let $nowClicked = $('.panel1')

	function toggleOpen(e) {
		// console.log(e)
		$nowClicked = $(this)
		let theClass = e.data.theClass
		if (!!$lastClicked.is($(this))) {
			$lastClicked.removeClass(theClass)
			// console.log(`${theClass} removed from `)
			// console.log($lastClicked)
		}
			$lastClicked.toggleClass(theClass)

		// $(this).toggleClass('open open-active')
		console.log($(this))
		$(this).addClass(theClass)
		$lastClickedTemp = $(this)
	}

	function toggleActive(e) {
		if (e.originalEvent.propertyName.includes('flex')) {
			toggleOpen.apply($nowClicked, [e])
		}
		$lastClicked = $lastClickedTemp
	}

	$('.panel').on('click', {theClass: 'open'}, toggleOpen)
	$('.panel').on('transitionend webkitTransitionEnd oTransitionEnd', {theClass: 'open-active'}, toggleActive)
})