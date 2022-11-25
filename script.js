const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


function drawCircle(ctx, x, y, radius, fill, alpha=1) {

    ctx.globalAlpha = alpha
    let stroke = fill
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = 1
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}



function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function distance (x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2)
}

function getTransparency (delta) {
    if (delta > 30) return .2
    if (delta > 15) return 0.5
    return 1
}

function render (e) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const {x,y} = getMousePos(canvas, e)
    points.forEach(p=>{
        const delta = distance(x,y,p.x, p.y)
        const fill = p.fill
        const a = getTransparency(delta)
        drawCircle(ctx, p.x, p.y, 4, fill, a)
    })
}


canvas.addEventListener('mousemove', e=>{
    render(e)
})

