var fondoJuego;
var nave;
var cursores;
var balas;
var tiempoBala = 0;
var botonDisparo;
var enemigos;
var sonidoDisparo;
var explosion;
var puntaje = 0;
var textoPuntaje;
var textoVidas;

var juego = new Phaser.Game(370, 550, Phaser.CANVAS, "bloque_juego");

var estadoPrincipal = {
  preload: function () {
    juego.load.image("fondo", "img/fondoalien.png");
    juego.load.image("personaje", "img/ovni.png");
    juego.load.image("laser", "img/laser.png");
    juego.load.image("enemigo", "img/alien.png");
    juego.load.audio("disparo", "sonidos/disparo.mp3");
    juego.load.audio("explosion", "audio/explosion.mp3");
  },
  create: function () {
    fondoJuego = juego.add.tileSprite(0, 0, 370, 550, "fondo");
    nave = juego.add.sprite(juego.width / 2, 500, "personaje");
    explosion = juego.add.audio("explosion");
    explosion.volume = 0.4;
    textoPuntaje = juego.add.text(16, 16, "Puntaje: 0", {
      fontSize: "14px",
      fill: "#fff",
    });
    nave.anchor.setTo(0.5);
    textoVidas = juego.add.text(200, 16, "Vidas: 3", {
      fontSize: "14px",
      fill: "red",
    });
    cursores = juego.input.keyboard.createCursorKeys();
    botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    balas = juego.add.group();
    balas.enableBody = true;
    balas.physicsBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(20, "laser");
    balas.setAll("anchor.x", 0.5);
    balas.setAll("anchor.y", 0.5);
    balas.setAll("outOfBoundsKill", true);
    balas.setAll("checkWorldBounds", true);

    enemigos = juego.add.group();
    enemigos.enableBody = true;
    enemigos.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 6; y++) {
      for (var x = 0; x < 7; x++) {
        var enemigo = enemigos.create(x * 40, y * 20, "enemigo");
        enemigo.anchor.setTo(0.5);
      }
    }
    enemigos.x = 50;
    enemigos.y = 60;
    var animacion = juego.add
      .tween(enemigos)
      .to(100, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    sonidoDisparo = juego.add.audio("disparo");
  },
  update: function () {
    fondoJuego.tilePosition.y += 3;
    if (cursores.right.isDown) {
      nave.position.x += 3;
    } else if (cursores.left.isDown) {
      nave.position.x -= 3;
    }
    var bala;
    if (botonDisparo.isDown) {
      if (juego.time.now > tiempoBala) {
        bala = balas.getFirstExists(false);
      }
      if (bala) {
        bala.reset(nave.x, nave.y);
        bala.body.velocity.y = -300;
        tiempoBala = juego.time.now + 100;
        sonidoDisparo.play();
      }
    }
    juego.physics.arcade.overlap(balas, enemigos, colision, null, this);
  },
};

function colision(bala, enemigo) {
  bala.kill();
  enemigo.kill();
  explosion.play();
  puntaje += 10;
  textoPuntaje.text = "Puntaje: " + puntaje;
}

juego.state.add("principal", estadoPrincipal);
juego.state.start("principal");
