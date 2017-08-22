"use strict"
// caching dom elements
const $checkboxes = $('.item input[type="checkbox"]')

// 
let $lastChecked

$checkboxes.click(selectBoxes)


function selectBoxes(e) {
	let inBetween = false // Are we in between the two selected checkboxes?
	if (e.shiftKey && this.checked) {
		$checkboxes.each((i, cb) => {
			if ($(cb).is($(this)) || $(cb).is($lastChecked)) {		
				inBetween = !inBetween
			}

			// is the current checkbox in between the selections, and there been at least two selections?
			if (inBetween && $lastChecked) {
				cb.checked = true
			}
		})
	}

	$lastChecked = $(this)
}