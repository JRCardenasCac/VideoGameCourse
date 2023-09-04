var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");

var grd = ctx.createLinearGradient(0,0,0,500);
grd.addColorStop(0,'blue');
grd.addColorStop(1,'white');

ctx.fillStyle=grd;
ctx.fillRect(0,0,1000,600);

var grd2 = ctx.createLinearGradient(0,400,0,500);
grd2.addColorStop(0,"rgba(0,180,255,0.5)");
grd2.addColorStop(1,'white');
ctx.fillStyle=grd2;
ctx.fillRect(0,400,1000,100);

//Cerros
ctx.beginPath();
ctx.fillStyle="rgba(98,0,248,1)";
ctx.moveTo(0,400);
ctx.lineTo(200,100);
ctx.lineTo(400,400);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(67,0,248,1)";
ctx.moveTo(200,400);
ctx.lineTo(400,100);
ctx.lineTo(600,400);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(98,0,248,1)";
ctx.moveTo(400,400);
ctx.lineTo(600,100);
ctx.lineTo(800,400);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(67,0,248,1)";
ctx.moveTo(600,400);
ctx.lineTo(800,100);
ctx.lineTo(1000,400);
ctx.fill();

//NIEVE
ctx.beginPath();
ctx.fillStyle="rgba(255,255,255,1)";
ctx.moveTo(133,200);
ctx.lineTo(200,100);
ctx.lineTo(200,300);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(212,207,252,1)";
ctx.moveTo(200,300);
ctx.lineTo(200,100);
ctx.lineTo(267,200);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(255,255,255,1)";
ctx.moveTo(333,200);
ctx.lineTo(400,100);
ctx.lineTo(400,300);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(212,207,252,1)";
ctx.moveTo(400,300);
ctx.lineTo(400,100);
ctx.lineTo(467,200);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(255,255,255,1)";
ctx.moveTo(600,300);
ctx.lineTo(600,100);
ctx.lineTo(533,200);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(212,207,252,1)";
ctx.moveTo(600,300);
ctx.lineTo(600,100);
ctx.lineTo(667,200);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(255,255,255,1)";
ctx.moveTo(800,300);
ctx.lineTo(800,100);
ctx.lineTo(733,200);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(212,207,252,1)";
ctx.moveTo(800,300);
ctx.lineTo(800,100);
ctx.lineTo(867,200);
ctx.fill();

//Cerro negro
ctx.beginPath();
ctx.fillStyle="rgba(29,0,145,1)";
ctx.moveTo(0,400);
ctx.lineTo(200,300);
ctx.lineTo(200,500);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(29,0,145,1)";
ctx.moveTo(200,300);
ctx.lineTo(400,400);
ctx.lineTo(200,500);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(29,0,145,1)";
ctx.moveTo(600,400);
ctx.lineTo(800,300);
ctx.lineTo(800,500);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="rgba(29,0,145,1)";
ctx.moveTo(800,300);
ctx.lineTo(1000,400);
ctx.lineTo(800,500);
ctx.fill();


//Arbol
ctx.fillStyle="#540617";
ctx.fillRect(100, 248, 20, 42);

ctx.beginPath();
//arc(x, y, radio, startAngle, endAngle, antihorario);
ctx.arc(80, 200, 20, 0, 2 * Math.PI);
ctx.fillStyle="#3a6f22";
ctx.fill();

ctx.beginPath();
ctx.arc(130, 190, 30, 0, 2 * Math.PI);
ctx.fillStyle="#4c8e28";
ctx.fill();

ctx.beginPath();
ctx.arc(110, 210, 40, 0, 2 * Math.PI);
ctx.fillStyle="#29501d";
ctx.fill();

ctx.beginPath();
ctx.arc(116, 240, 20, 0, 2 * Math.PI);
ctx.fillStyle="#173219";
ctx.fill();

ctx.fillStyle="#530616";
ctx.fillRect(900, 300, 20, 50);

ctx.beginPath();
ctx.fillStyle="#18331a";
ctx.moveTo(850,300);
ctx.lineTo(910,200);
ctx.lineTo(970,300);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="#29511e";
ctx.moveTo(850,250);
ctx.lineTo(910,150);
ctx.lineTo(970,250);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="#3b7023";
ctx.moveTo(850,200);
ctx.lineTo(910,100);
ctx.lineTo(970,200);
ctx.fill();

//Cerro verde
ctx.beginPath();
ctx.arc(0, 500, 250, 0, 2 * Math.PI);
ctx.fillStyle="rgba(99,182,43,1)";
ctx.fill();

ctx.beginPath();
ctx.arc(900, 600, 250, 0, 2 * Math.PI);
ctx.fillStyle="green";
ctx.fill();

//Mini Cerros
ctx.beginPath();
ctx.arc(25, 500, 25, 0, 2 * Math.PI);
ctx.fillStyle="#346517";
ctx.fill();

ctx.beginPath();
ctx.arc(75, 500, 25, 0, 2 * Math.PI);
ctx.fillStyle="#346517";
ctx.fill();

ctx.beginPath();
ctx.arc(125, 500, 25, 0, 2 * Math.PI);
ctx.fillStyle="#346517";
ctx.fill();

ctx.beginPath();
ctx.arc(175, 500, 25, 0, 2 * Math.PI);
ctx.fillStyle="#346517";
ctx.fill();

ctx.beginPath();
ctx.arc(225, 500, 25, 0, 2 * Math.PI);
ctx.fillStyle="#346517";
ctx.fill();


