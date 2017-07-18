"use strict";

$(function() {

	const $keys = $('.key')

	function playSound(e) {
		// Select the corresponding audio and div elements when a key is pressed.
		const audio = $(`audio[data-key='${e.keyCode}']`)[0]
		const key = $(`.key[data-key='${e.keyCode}']`)[0]

		if (!audio) return

		// playing the audio 
		audio.volume = 0.15
		audio.currentTime = 0 // allows playing the same sound instantly again
		audio.play()

		$(key).addClass('playing')
	}

	function removeTransition(e) {
		if (e.propertyName !== 'transform') return
		$(this).removeClass('playing')
	}

	// Remove 'playing' class from each key when the transition ends
	$keys.each((i, key) => {
			key.addEventListener('transitionend', removeTransition)
		})

	window.addEventListener('keydown', playSound)
})
