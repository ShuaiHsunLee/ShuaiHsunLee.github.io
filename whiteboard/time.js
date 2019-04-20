var startDateTime = new Date(2019,(5-1),16,23,59,59,0); // YYYY (M-1) D H m s ms (start time and date from DB)
var startStamp = startDateTime.getTime();

var newDate = new Date();
var newStamp = newDate.getTime();

var timer; // for storing the interval (to stop or pause later if needed)

function updateClock() {
	newDate = new Date();
	newStamp = newDate.getTime();
	var diff = Math.round((startStamp-newStamp)/1000);

	var d = Math.floor(diff/(24*60*60));
	diff = diff-(d*24*60*60);
	var h = Math.floor(diff/(60*60));
	diff = diff-(h*60*60);
	var m = Math.floor(diff/(60));
	diff = diff-(m*60);
	var s = diff;
	document.getElementById("time-elapsed").innerHTML = d+" days, "+h+" hours, "+m+" minutes, "+s+" seconds";
}

timer = setInterval(updateClock, 1000);
