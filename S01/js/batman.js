var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "img/batman.png";
ctx.drawImage(img, 0, 0);
img.onload = function(){
    ctx.drawImage(img, 100, 25);
}

/*
// Draw the ellipse
ctx.beginPath();
ctx.ellipse(500, 250, 200, 400, Math.PI / 2, 0, 2 * Math.PI);
ctx.fillStyle="#ffdb00";
ctx.fill();
ctx.lineWidth=20;
ctx.strokeStyle="black";
ctx.stroke();

 // Ejemplo de curvas cúbicas
 //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
 //ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
 ctx.beginPath();
 //ctx.moveTo(start.x, start.y);
 ctx.moveTo(75, 40);
 ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
 ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
 ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
 ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
 ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
 ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);

 
ctx.beginPath();
ctx.moveTo(500, 250);
ctx.bezierCurveTo(900, 400, 500, 400, 600, 400);


ctx.fillStyle="black";
ctx.fill();*/