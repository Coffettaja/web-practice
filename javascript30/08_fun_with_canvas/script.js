'use strict';

const $canvas = $('#draw')
const container = $('.container')[0]
const canvas = $('#draw')[0]
const $options = $('.options')
const $colors = $('#colors div')
const $toggle = $('.toggle')
const $thickness = $('#thickness div')

let $selectedColor = $('.color-1') // currently selected color
let selectedColorNum = $selectedColor.text() // The text that should be in the color div
$selectedColor.text('✓')
let $selectedThickness = $('.thickness-4')
const startingColor = $selectedColor.css('background-color') 

const context = canvas.getContext('2d') // context is where all the drawing is done

canvas.width = 2000
canvas.height = 1000 

// Setting the options to the initial state
$selectedColor.toggleClass('is-selected')
$selectedThickness.toggleClass('is-selected')
$thickness.css('background-color', startingColor)

context.strokeStyle = startingColor
context.lineJoin = 'round' // when line meets another line
context.lineCap = 'round' // when line ends 
context.lineWidth = parseInt($selectedThickness.css('height'), 10)

let isDrawing = false
let lastX = 0
let lastY = 0


function draw(event) {
	if (!isDrawing) {
		return
	}
	const e = event.originalEvent

	context.beginPath()

	// start from
	context.moveTo(lastX, lastY)
	// go to
	context.lineTo(e.offsetX, e.offsetY)
	context.stroke()

	;[lastX, lastY] = [e.offsetX, e.offsetY]
}

// change the drawing color to the color clicked, or with keypress
function changeColor(e) {
	let key
	let $newColor = $(this)

	// Checking for keypress
	if (!e.target.hasAttribute("data-key")) {
		key = $('#colors').find(`[data-key='${e.keyCode}']`)[0]
		$newColor = $(key)
		if (!key) {
			return // Pointless keypress
		}
	}
	if ($selectedColor.is($newColor)) {
		return // No need to do anything if the same color is selected again
	}
	const color = $newColor.css('background-color')
	context.strokeStyle = color
	$thickness.css('background-color', color)
	$selectedColor.removeClass('is-selected')
	$selectedColor.text(selectedColorNum)
	selectedColorNum = $newColor.text() // Save the number for color
	$newColor.addClass('is-selected')
	$newColor.text('✓')
	$selectedColor = $newColor
}

function changeThickness(e) {
	if ($selectedThickness.is($(this))) {
		return // No need to change thickness if the same selected again
	}

	// width and height usually same, but width might change when resizing the window?
	const width = $(this).css('height') 
	context.lineWidth = parseInt(width, 10)
	$selectedThickness.removeClass('is-selected')
	$(this).addClass('is-selected')
	$selectedThickness = $(this)
}

function toggleOptions(e) {
	$options.toggleClass('hidden')
}

$canvas.on('mousemove', draw)
$canvas.on('mousedown', (e) => { 
	isDrawing = true
	;[lastX, lastY] = [e.offsetX, e.offsetY]
	draw(e)
})
$canvas.on('mouseup', () => isDrawing = false)
$canvas.on('mouseout', () => isDrawing = false)

$colors.on('click', changeColor)
$thickness.on('click', changeThickness)

$toggle.on('click', toggleOptions)

$(window).on('keypress', changeColor)

// TODO
// Fix drag and drop
// Nicer looking background
// Changing background for canvas?
// Selecting thickness with keyboard, toggling options as well
// ctrl + z
