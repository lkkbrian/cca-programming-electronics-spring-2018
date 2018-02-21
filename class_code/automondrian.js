// 2 splits, 1 hsplit, 1 vsplit, otherwise no splits
probslimits = [.4, .6, .9];

colors = [];
linethickss = 2;
minarea = 200;

function setup() {
	createCanvas(400, 400);
	colorMode(RGB, 1, 1, 1);
	colors[0] = color(1, 1, 1);
	colors[1] = color(1, 1, 1);
	colors[2] = color(1, 0, 0);
	colors[3] = color(0, 0, 1);
	colors[4] = color(1, 1, 0);
	colors[5] = color(1, 1, 1);
	colors[6] = color(1, 1, 1);
	
}

function draw() {
	background(colors[0]);
	strokeWeight(linethickss);
	mondrian(linethickss / 2, linethickss / 2, width - linethickss, height - linethickss, true);
	noLoop();
}


function mondrian(x, y, w, h, ft) {
	var splitw;
	var splith;
	if (ft) {
		stroke(color(0, 0, 0));
		rect(x, y, w, h);
		splitw = round(random(.3 * w, .7 * w));
		splith = round(random(.3 * h, .7 * h));
		mondrian(x, y, splitw, splith,false);
		mondrian(x + splitw, y, w - splitw, splith,false);
		mondrian(x, y + splith, splitw, h - splith,false);
		mondrian(x + splitw, y + splith, w - splitw, h - splith,false);
	} else {
		var r = random(0, 1);
		var rectarea = w * h;
		if (rectarea < minarea || r > probslimits[2]) { // color
			fill(random(colors));
			rect(x, y, w, h);
		} else if (r < probslimits[0]) { // 2 splits 
			splitw = round(random(.3 * w, .7 * w));
			splith = round(random(.3 * h, .7 * h));
			mondrian(x, y, splitw, splith,false);
			mondrian(x + splitw, y, w - splitw, splith,false);
			mondrian(x, y + splith, splitw, h - splith,false);
			mondrian(x + splitw, y + splith, 
							 w - splitw, h - splith,false);
			} else if (r < probslimits[1]) { // 1 H split 
			splitw = round(random(.2 * w, .8 * w));
			mondrian(x, y, splitw, h,false);
			mondrian(x + splitw, y, w - splitw, h,false);
		} else if (r < probslimits[2]) { // 1 V split
			splith = round(random(.2 * h, .8 * h));
			mondrian(x, y, w, splith,false);
			mondrian(x, y + splith, w, h - splith,false);
		}
	}

}
