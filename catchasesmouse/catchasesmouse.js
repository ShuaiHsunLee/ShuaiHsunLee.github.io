console.log("cat chases rat")

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

init()

var p_lst = [];
var len = 50;
for (i = 0; i < len; i++) {
    p_lst.push(new function() {
                    this.posx = Math.round(Math.random()*window.innerWidth);
                    this.posy = Math.round(Math.random()*window.innerWidth);
                    this.velx = 0;
                    this.vely = 0;
                });
}

// cursor location
c_loc = [window.innerWidth/2, window.innerHeight/2];
c_r = 10
max = 3; // max speed
a = 0.5; // accelerate

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
    c_loc[0] = event.clientX - rect.left + 8;
    c_loc[1] = event.clientY - rect.top + 8;
}

function draw(e) {
    // cursor location print
    var mes1 = "x: " + c_loc[0] + "/" + canvas.width;
    var mes2 = "y: " + c_loc[1] + "/" + canvas.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '10px Calibri';
    context.fillText(mes1, 5, 15);
    context.fillText(mes2, 5, 25);


    // calculate point, and draw
    context.fillStyle = 'blue';
    p_lst.forEach(function(p){
        ang = velo(p);
        arrow(p.posx, p.posy, 10, Math.PI/6, ang);
    });
    circle(c_loc[0], c_loc[1], 10);
}

function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
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
function velo(p) {
    // find target direction
    dx = c_loc[0] - p.posx;
    dy = c_loc[1] - p.posy;
    l = Math.sqrt(dx*dx + dy*dy);
    if (l == 0)
        return 0;

    // accelerate heading to target
    p.velx += a * dx/l;
    p.vely += a * dy/l;
    V = Math.sqrt(p.velx*p.velx + p.vely*p.vely);
    if (V > max)
        p.velx = max * p.velx/V;
        p.vely = max * p.vely/V;

    // update arrow position
    if (p.posx>8 & p.posx<canvas.width-8 & p.posy>8 & p.posy<canvas.height-8) {
        if (l > c_r) {
            p.posx += p.velx;
            p.posy += p.vely;
        }
    }
    else {
        p.posx = Math.round(Math.random()*window.innerWidth) + 8;
        p.posy = Math.round(Math.random()*window.innerHeight) + 8;
    }

    return (dx < 0) ? Math.atan(dy/dx) : Math.atan(dy/dx)+Math.PI
}
