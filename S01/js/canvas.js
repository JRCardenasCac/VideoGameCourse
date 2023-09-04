var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");


ctx.fillStyle="cyan";
ctx.fillRect(10, 10, 100, 100);
ctx.lineWidth=5;
ctx.strokeStyle="rgba(255,0,255,1)";
ctx.rect(10,10, 100,100);
ctx.stroke();

ctx.beginPath();
x1=300;
y1=300;
r=80;
startAngle=0
endAngle=2*Math.PI;
ctx.arc(x1,y1,r,startAngle,endAngle);
ctx.fillStyle="green";
ctx.fill();
ctx.lineWidth=5;
ctx.strokeStyle="purple";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(200,200);
ctx.strokeStyle="yellow";
ctx.lineWidth=10;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(200,200);
ctx.lineTo(400,200);
ctx.lineTo(600,400);
ctx.lineTo(800,200);
ctx.lineTo(1000,200);
ctx.lineTo(1000,0);
ctx.strokeStyle="purple";
ctx.lineWidth=5;
ctx.stroke();
ctx.fillStyle="rgba(0,0,255,0.6)";
ctx.fill();

ctx.beginPath();
ctx.moveTo(0,500);
ctx.bezierCurveTo(200,300,400,400,500,500);
ctx.lineWidth=5;
ctx.stroke();
ctx.fillStyle="rgba(0,0,255,0.6)";
ctx.fill();
