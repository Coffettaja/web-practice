const $canvas = $('#draw')
const container = $('.container')[0]
const canvas = $('#draw')[0]
const $colors = $('#colors div')
const context = canvas.getContext('2d') // context is where all the drawing is done
canvas.width = 2000//$(container).innerWidth()
canvas.height = $(container).innerHeight()
console.log($(container).innerHeight())

context.strokeStyle = 'hsl(0, 85%, 50%)' // starting color
//context.lineJoin = 'round' // when line meets another line
context.lineCap = 'round' // when line ends 
context.lineWidth = 50

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = true 
let maxWidth = 55
let minWidth = 20

function draw(event) {
	if (!isDrawing) {
		return
	}
	const e = event.originalEvent
	// context.strokeStyle = `hsl(${hue}, 80%, 55%)`
	context.beginPath()
	// start from
	context.moveTo(lastX, lastY)
	// go to
	context.lineTo(e.offsetX, e.offsetY)
	context.stroke()

	;[lastX, lastY] = [e.offsetX, e.offsetY]
	hue++
	if (hue > 360) {
		hue = 0
	}

	if (context.lineWidth >= maxWidth || context.lineWidth <= minWidth) {
		direction = !direction
	}

	if (direction) {
		context.lineWidth++
	} else {
		context.lineWidth--
	}
}

// change the drawing color to the color clicked
function changeColor(e) {
	context.strokeStyle = $(this).css('background-color')
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
