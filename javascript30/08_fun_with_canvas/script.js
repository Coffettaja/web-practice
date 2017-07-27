const canvas = $('#draw')[0]
const context = canvas.getContext('2d') // context is where all the drawing is done
canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.strokeStyle = '#ca3334' // starting color
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
	context.strokeStyle = `hsl(${hue}, 80%, 55%)`
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

$(canvas).on('mousemove', draw)
$(canvas).on('mousedown', (e) => { 
	isDrawing = true
	;[lastX, lastY] = [e.offsetX, e.offsetY]
	draw(e)
})
$(canvas).on('mouseup', () => isDrawing = false)
$(canvas).on('mouseout', () => isDrawing = false)