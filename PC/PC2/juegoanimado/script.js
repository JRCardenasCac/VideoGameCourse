var juego = new Phaser.Game(800, 700, Phaser.CANVAS, "game-container");
var fondoJuego;
var personaje;
var cursors;
var enemigos;
var balas;
var tiempoBala = 0;
var botonDisparo;
var sonidoDisparo;

var puntos = 0;
var vidas = 3;
var nivel = 1;
var textoInfo;
var mensajeTexto;
var puntosRequeridos = 9;
var isWin = false;
var tiempoBalaEnemy = 0;

var estadoPrincipal = {
  preload: function () {
    juego.load.image("backgroud", "img/backgroud.png");
    juego.load.spritesheet("player", "img/PlayerSpriteSheet.png", 300, 300);
    juego.load.spritesheet("enemigo", "img/EnemySpriteSheet.png", 48, 48);
    juego.load.spritesheet("laser", "img/laser.png", 48, 48);
    juego.load.audio("disparo", "audio/disparo.mp3");

    juego.forceSingleUpdate = true;
  },
  create: function () {
    juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    fondoJuego = juego.add.tileSprite(0, 0, 800, 700, "backgroud");

    personaje = juego.add.sprite(200, 410, "player");
    personaje.animations.add("movimiento", [0, 1, 2, 3], 10, true);

    sonidoDisparo = juego.add.audio("disparo");

    balas = juego.add.group();
    balas.enableBody = true;
    balas.physicsBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(20, "laser");
    balas.setAll("anchor.x", 0.5);
    balas.setAll("anchor.y", 1);
    balas.setAll("outOfBoundsKill", true);
    balas.setAll("checkWorldBounds", true);

    // Inicializar enemigos
    this.createEnemy();

    // Configurar controles del jugador
    cursors = juego.input.keyboard.createCursorKeys();
    botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function () {
    if (!isWin) {
      fondoJuego.tilePosition.x -= 1;
      if (cursors.right.isDown) {
        personaje.x += 4;
        personaje.animations.play("movimiento");
      } else if (cursors.left.isDown) {
        personaje.x -= 4;
        personaje.animations.play("movimiento");
      }

      var bala;
      if (botonDisparo.isDown) {
        if (juego.time.now > tiempoBala) {
          bala = balas.getFirstExists(false);
        }
        if (bala) {
          bala.reset(personaje.x + 150, personaje.y + 50);
          bala.body.velocity.y = -300;
          tiempoBala = juego.time.now + 100;
          sonidoDisparo.play();
        }
      }
    }

    juego.physics.arcade.overlap(
      balas,
      enemigos,
      this.colisionToEnemy,
      null,
      this
    );
    mostrarInfoEnPantalla();
  },
  createEnemy: function () {
    enemigos = juego.add.group();
    enemigos.enableBody = true;
    enemigos.physicsBodyType = Phaser.Physics.ARCADE;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        let enemy = enemigos.create(x * 50, y * 50, "enemigo");
        enemy.anchor.setTo(0.5);
        enemy.animations.add("enemigo", [0, 1, 2, 3, 4, 5], 10, true);
        enemy.animations.play("enemigo");
      }
    }
    enemigos.x = 100;
    enemigos.y = 200;

    juego.add
      .tween(enemigos)
      .to({ x: 650 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },
  colisionToEnemy: function (bala, enemigo) {
    bala.kill();
    enemigo.kill();

    puntos += 1;

    if (puntos === puntosRequeridos) {
      this.nextLevel();
    }
  },
  nextLevel: function () {
    nivel++;
    switch (nivel) {
      case 2:
        puntosRequeridos = 18;
        this.createEnemy();
        break;
      default:
        mostrarMensaje("¡GANASTE!");
        juego.time.events.removeAll();
        isWin = true;
        break;
    }
  },
};

juego.state.add("principal", estadoPrincipal);
juego.state.start("principal");

// Elimina el texto de información anterior si existe
function mostrarInfoEnPantalla() {
  if (textoInfo) {
    textoInfo.destroy();
  }

  // Crea un nuevo objeto de texto con la información actualizada
  textoInfo = juego.add.text(
    10,
    10,
    "Puntuación: " + puntos + " | Vidas: " + vidas + " | Nivel: " + nivel,
    {
      font: "17px Arial",
      fill: "#fff",
      align: "center",
    }
  );
  textoInfo.style.backgroundColor = "black";
}

function mostrarMensaje(mensaje) {
  // Elimina el mensaje anterior si existe
  if (mensajeTexto) {
    mensajeTexto.destroy();
  }

  // Crea un nuevo objeto de texto con el mensaje
  mensajeTexto = juego.add.text(
    juego.world.centerX,
    juego.world.centerY,
    mensaje,
    {
      font: "20px Arial",
      fill: "#fff",
      align: "center",
    }
  );
  mensajeTexto.anchor.setTo(0.5);
}
