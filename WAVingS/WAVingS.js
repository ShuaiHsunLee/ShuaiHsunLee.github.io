console.log("WAVingS");

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

block_size = 80;
w = 8;
h = 6;
width = block_size * w;
height = block_size * h;
canvas.width = width;
canvas.height = height;

speed = 5;
offset = 0;
player_radius = 30;
keys = {};
degrade_lst = [];
degrade_dic = {};
degrade_time = 2000;

map = [];
for (var i=0; i<w+1; i++) {
    var lst = []
    for (var j=0; j<h; j++) {
        lst.push('ice');
    }
    map.push(lst);
}

player_pos = [width/2, height/2];

init();

function init() {
    loadImage();
    var e_lst = ['keydown', 'keyup'];
    for (var i=0; i<e_lst.length; i++)
        window.addEventListener(e_lst[i], move, false);
    setInterval(addNewDegrade, degrade_time);
    setInterval(degrade, degrade_time);
    setInterval(loadImage, degrade_time);
}

function move(e) {
    // control character
    keys[e.keyCode] = e.type == 'keydown';
    var dy = 0;
    var dx = 0;
    // up
    if (keys[38] == true || keys[87] == true || keys[75] == true)
        dy -= 1
    // down
    if (keys[40] == true || keys[83] == true || keys[74] == true)
        dy += 1
    // left
    if (keys[37] == true || keys[72] == true || keys[65] == true)
        dx -= 1
    // right
    if (keys[39] == true || keys[76] == true || keys[68] == true)
        dx += 1

    var v = speed / Math.sqrt(dx*dx + dy*dy);

    // move left
    if (dx < 0) {
        if (player_pos[0] <= player_radius)
            player_pos[0] = player_radius;
        else
            player_pos[0] -= v;
    }
    // move right
    if (dx > 0) {
        if (player_pos[0] < width/2) {
            player_pos[0] += v;
            if (player_pos[0] > width)
                player_pos[0] = (width-block_size)/2;
        }
        else
            offset += v;
    }
    // move down
    if (dy > 0) {
        if (player_pos[1] >= height-player_radius)
            player_pos[1] = height-player_radius;
        else
            player_pos[1] += v;
    }
    // move up
    if (dy < 0) {
        if (player_pos[1] <= player_radius)
            player_pos[1] = player_radius;
        else
            player_pos[1] -= v;
    }

    loadImage();
}

function loadImage() {
    water = img('water');
    half = img('half');
    ice = img('ice');
    rock = img('rock');
}

function img(name) {
    var s = new Image();
    s.onload = draw;
    s.src = "img/" + name + ".png";
    return s;
}

function draw() {
    offset = updateMap();

    for (i=0; i<w+1; i++) {
        for (j=0; j<h; j++) {
            var lst = [];
            // background
            switch (map[i][j]) {
                case 'water':
                    lst.push(water); break;
                case 'half':
                    lst.push(half); break;
                case 'ice':
                    lst.push(ice); break;
                case 'rock':
                    lst.push(rock); break;
            }

            /* extension for more items in pic */

            // drawing background and items
            for (var k = 0; k < lst.length; k++) {
                context.drawImage(lst[k], i*block_size-offset, j*block_size);
            }
        }
    }
    circle(player_pos[0], player_pos[1], player_radius);
}

// random map generator
function updateMap() {
    if (offset >= block_size) {
        var lst = [];
        for (i=0; i<h; i++) {
            lst.push(possibility());
        }
        map.push(lst);
        map.splice(0, 1);
        return offset - block_size;
    }
    return offset;
}

function possibility() {
    p = Math.random() * 100;
    if (0 <= p & p < 80)
        return 'ice';
    else if (80 <= p & p < 90)
        return 'water';
    else
        return 'rock';
}

function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
}

function isGG() {
    var i = Math.round(player_pos[0]/block_size);
    var j = Math.round((player_pos[1]/block_size)-0.5);
    return map[i][j] == 'water';
}

function iceDegrade(s) {
    if (s == 'ice')
        return 'half';
    else if (s == 'half')
        return 'water';
    return s;
}

function addNewDegrade() {
    var _w = Math.round(Math.random() * w);
    var _h = Math.round(Math.random() * h);
    if (!([_w, _h] in degrade_dic)) {
        degrade_lst.push([_w, _h]);
        degrade_dic[[_w, _h]] = true;
    }
}

function degrade() {
    for (var i=0; i<degrade_lst.length; i++) {
        map[degrade_lst[i][0]][degrade_lst[i][1]] = iceDegrade(map[degrade_lst[i][0]][degrade_lst[i][1]]);
    }
}
