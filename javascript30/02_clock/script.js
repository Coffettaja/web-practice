"use strict";

$(function () {

	const secondHand = $('.second-hand')[0]
	const minHand = $('.min-hand')[0]
	const hourHand = $('.hour-hand')[0]

	function getDegrees(value) {
		return ((value / 60) * 360) + 90 // addition to offset default rotation
	}

	function setDate() {
		const now = new Date()
		
		const seconds = now.getSeconds()
		const secondsDegrees = getDegrees(seconds)
		
		const minutes = now.getMinutes()
		const minutesDegrees = getDegrees(minutes)

		const hours = now.getHours()
		const hours12 = (hours + 24) % 12 || 12
		const hoursDegrees = ((hours12 / 12) * 360) + 90

		secondHand.style.transform = `rotate(${secondsDegrees}deg)`
		minHand.style.transform = `rotate(${minutesDegrees}deg)`
		hourHand.style.transform = `rotate(${hoursDegrees}deg)`

		console.log(`${hours}:${minutes}:${seconds}`)
		// console.log(secondHand)
	}

	setInterval(setDate, 1000)
})