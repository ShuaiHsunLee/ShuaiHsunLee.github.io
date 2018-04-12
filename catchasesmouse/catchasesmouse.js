console.log("cat chases rat")

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

init()

// list of arrow location
p_lst = [100, 100];
// velocity of p
v_lst = [2, 0]
// cursor location
c_loc = [0, 0];
// max speed
max = 2;
// accelerate
a = 0.25;

function init() {
    resize();
    window.addEventListener('mousemove', getMousePos, false);
    setInterval(draw, 25);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getMousePos(e) {
    var event = e || window.event;
    var rect = canvas.getBoundingClientRect();
    c_loc[0] = event.clientX - rect.left;
    console.log("after setting x");
    c_loc[1] = event.clientY - rect.top;
}

function draw(e) {
    // cursor location print
    var mes1 = "x: " + c_loc[0] + "/" + canvas.width;
    var mes2 = "y: " + c_loc[1] + "/" + canvas.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '10px Calibri';
    context.fillText(mes1, 5, 15);
    context.fillText(mes2, 5, 25);

    // calculate point
    ang = velo()

    // print(arrow)
    arrow(p_lst[0], p_lst[1], 10, Math.PI/6, ang);
}

function arrow(x, y, r, ang, dir){
	context.beginPath();

	context.moveTo(x, y);

	var ang1 = dir + ang/2;
	var x1 = r * Math.cos(ang1) + x;
	var y1 = r * Math.sin(ang1) + y;

	context.lineTo(x1, y1);

	var ang2 = dir - ang/2;
	var x2 = r * Math.cos(ang2) + x;
	var y2 = r * Math.sin(ang2) + y;

	context.lineTo(x2, y2);

	context.closePath();
	context.fill();
}

// vector add
function velo() {
    // find target direction
    dx = c_loc[0] - p_lst[0];
    dy = c_loc[1] - p_lst[1];
    l = Math.sqrt(dx*dx + dy*dy);

    // accelerate heading to target
    v_lst[0] += a * dx/l;
    v_lst[1] += a * dy/l;
    V = Math.sqrt(v_lst[0]*v_lst[0] + v_lst[1]*v_lst[1]);
    if (V > 5)
        v_lst[0] = max * v_lst[0]/V;
        v_lst[1] = max * v_lst[1]/V;

    // update arrow position
    p_lst[0] += v_lst[0];
    p_lst[1] += v_lst[1];

    return (dx < 0) ? Math.atan(dy/dx) : Math.atan(dy/dx)+Math.PI
}
