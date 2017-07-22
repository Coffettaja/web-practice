"use strict";

$(function () {
	const $inputs = $('.controls input')

	function handleUpdate() {
		const suffix = this.dataset.sizing || ''
		$(':root').css(`--${this.name}`, this.value + suffix)
	}

	$inputs.each((i, element) => element.oninput = handleUpdate)
})