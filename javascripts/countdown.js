var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016,6,13,18,47,52);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC000C"];
window.onload = function () {
	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurShowTimeSeconds();
	
	setInterval(
		function () {
		render(context);		
		update();
		}
		,
		50
		);
}


function getCurShowTimeSeconds () {
	var currentTime = new Date();
	var ret = endTime.getTime() - currentTime.getTime();
	ret = Math.round(ret/1000);
	return ret >= 0 ? ret : 0;
}

function update () {
	
	var nextShowTimeSeconds = getCurShowTimeSeconds();

	
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;
	
	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
	if (nextSeconds != seconds) {

		if (parseInt(hours/10) != parseInt(nextHours/10)) {
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(hours/10));
		}
		if (parseInt(hours%10) != parseInt(nextHours%10)) {
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10));
		}

		if (parseInt(minutes/10) != parseInt(nextMinutes/10)) {
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if (parseInt(minutes%10) != parseInt(nextMinutes%10)) {
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10));
		}

		if (parseInt(seconds/10) != parseInt(nextSeconds/10)) {
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
		}
		if (parseInt(seconds%10) != parseInt(nextSeconds%10)) {
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10));
		}


		curShowTimeSeconds = nextShowTimeSeconds
	}
	updateBalls();
}

function updateBalls () {
	
	for (var i = 0; i < balls.length; i++) {
		var ball = balls[i];
		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.vy += ball.g;

		if (ball.y >= WINDOW_HEIGHT-RADIUS) {
			ball.y = WINDOW_HEIGHT-RADIUS;
			ball.vy = - ball.vy*0.8;
		}
		if (ball.x >= WINDOW_WIDTH-RADIUS) {
			ball.x = WINDOW_WIDTH-RADIUS;
			ball.vx = -ball.vx*0.8;
		}
		if (ball.x <= RADIUS) {
			ball.x = RADIUS;
			ball.vx = -ball.vx*0.8;
		};
	}
}


function addBalls (x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
				if (digit[num][i][j] == 1) {
					var aBall = {
						x:x+j*2*(RADIUS+1)+(RADIUS+1),
						y:y+i*2*(RADIUS+1)+(RADIUS+1),
						g:1.5+Math.random(),
						vx:Math.pow(-1,Math.ceil(Math.random()*1000))*(Math.round(Math.random()*10)),
						vy:-1*Math.round(Math.random()*10),
						color:colors[Math.floor(Math.random()*10)]
					}

					balls.push(aBall);
				}
			}
	}
}


function render (cxt) {
	
	// 清除矩形内部之前绘制的内容，防止重叠
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for (var i = 0; i < balls.length; i++) {
		var ball = balls[i];
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(ball.x,ball.y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}

}
function renderDigit (x,y,num,cxt) {
	cxt.fillStyle = "rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++) {
		
		for (var j = 0; j < digit[num][i].length; j++) {

			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}

	}
}