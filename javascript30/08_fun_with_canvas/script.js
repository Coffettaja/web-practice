const $canvas = $('#draw')
const container = $('.container')[0]
const canvas = $('#draw')[0]
const $options = $('.options')
const $colors = $('#colors div')
let $selectedColor = $('.color-1')
let $selectedThickness = $('.thickness-4')
const $toggle = $('.toggle')
const $thickness = $('#thickness div')
const context = canvas.getContext('2d') // context is where all the drawing is done

canvas.width = 2000//$(container).innerWidth()
canvas.height = 1000 //$(container).innerHeight()

const startingColor = $selectedColor.css('background-color') 
$selectedColor.toggleClass('is-selected')
$selectedThickness.toggleClass('is-selected')
context.strokeStyle = startingColor // starting color
$thickness.css('background-color', startingColor)
//context.lineJoin = 'round' // when line meets another line
context.lineCap = 'round' // when line ends 
context.lineWidth = parseInt($selectedThickness.css('height'))

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

// change the drawing color to the color clicked
function changeColor(e) {
	if ($selectedColor.is($(this))) {
		return
	}
	const color = $(this).css('background-color')
	context.strokeStyle = color
	$thickness.css('background-color', color)
	$selectedColor.removeClass('is-selected')
	$(this).addClass('is-selected')
	$selectedColor = $(this)
}

function changeThickness(e) {
	if ($selectedThickness.is($(this))) {
		return
	}
	// width and height usually same, but width might change when resizing the window
	const width = $(this).css('height') 
	context.lineWidth = parseInt(width)
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

// TODO
// Fix drag and drop
// Nicer looking background
// Changing background for canvas?
