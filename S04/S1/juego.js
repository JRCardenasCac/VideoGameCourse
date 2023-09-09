var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;
var colisionSound;

var puntos = 0;
var vidas = 3;
var nivel = 1;
var textoInfo;
var mensajeTexto;

var puntuacionNivelAnterior = 0;

var Juego = {
  preload: function () {
    juego.load.image("bg", "img/bg.png");
    juego.load.image("carro", "img/carro.png");
    juego.load.image("carroMalo", "img/carroMalo.png");
    juego.load.image("gasolina", "img/gas.png");
    juego.load.audio("colisionSound", "sounds/carBrakeCrash.mp3");

    juego.forceSingleUpdate = true;
  },
  create: function () {
    fondo = juego.add.tileSprite(0, 0, 290, 540, "bg");

    carro = juego.add.sprite(juego.width / 2, 496, "carro");
    juego.physics.arcade.enable(carro, true);
    carro.enableBody = true;
    carro.anchor.setTo(0.5);

    mostrarInfoEnPantalla();

    colisionSound = juego.add.audio("colisionSound");
    colisionSound.volume = 0.4;

    enemigos = juego.add.group();
    juego.physics.arcade.enable(enemigos, true);
    enemigos.enableBody = true;
    enemigos.createMultiple(20, "carroMalo");
    enemigos.setAll("anchor.x", 0.5);
    enemigos.setAll("anchor.y", 0.5);
    enemigos.setAll("outOfBoundsKill", true);
    enemigos.setAll("checkWorldBounds", true);

    gasolinas = juego.add.group();
    juego.physics.arcade.enable(gasolinas, true);
    gasolinas.enableBody = true;
    gasolinas.createMultiple(20, "gasolina");
    gasolinas.setAll("anchor.x", 0.5);
    gasolinas.setAll("anchor.y", 0.5);
    gasolinas.setAll("outOfBoundsKill", true);
    gasolinas.setAll("checkWorldBounds", true);

    timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
    timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);

    cursores = juego.input.keyboard.createCursorKeys();
  },
  update: function () {
    fondo.tilePosition.y += 3;

    if (cursores.right.isDown && carro.position.x < 245) {
      carro.position.x += 5;
    } else if (cursores.left.isDown && carro.position.x > 45) {
      carro.position.x -= 5;
    }

    // Agrega las colisiones
    juego.physics.arcade.overlap(
      carro,
      enemigos,
      this.colisionCarroEnemigo,
      null,
      this
    );
    juego.physics.arcade.overlap(
      carro,
      gasolinas,
      this.colisionCarroGasolina,
      null,
      this
    );
  },
  crearCarroMalo: function () {
    var posicion = Math.floor(Math.random() * 3) + 1;
    var enemigo = enemigos.getFirstDead();
    enemigo.physicsBodyType = Phaser.Physics.ARCADE;
    enemigo.reset(posicion * 73, 0);
    enemigo.body.velocity.y = 200;
    enemigo.anchor.setTo(0.5);
  },
  crearGasolina: function () {
    var posicion = Math.floor(Math.random() * 3) + 1;
    var gasolina = gasolinas.getFirstDead();
    gasolina.physicsBodyType = Phaser.Physics.ARCADE;
    gasolina.reset(posicion * 73, 0);
    gasolina.body.velocity.y = 200;
    gasolina.anchor.setTo(0.5);
  },
  colisionCarroEnemigo: function (carro, enemigo) {
    // Aquí puedes agregar cualquier lógica que desees al colisionar con un enemigo
    console.log("choque con carro enemigo");
    enemigo.kill(); // Elimina el enemigo al colisionar

    vidas -= 1; // Resta una vida
    mostrarInfoEnPantalla(); // Actualiza la información de vidas en pantalla
    if (vidas <= 0) {
      // Si el jugador se queda sin vidas, muestra un mensaje de "VUELVE A INTENTARLO" y reinicia el juego o vuelve a la pantalla de portada según tus necesidades
      mostrarMensaje("VUELVE A INTENTARLO");
    } else {
      // Reproduce el sonido de explosión o colisión aquí
      colisionSound.play();
    }
  },
  colisionCarroGasolina: function (carro, gasolina) {
    console.log("choque con gasolina");
    // Aquí puedes agregar cualquier lógica que desees al colisionar con gasolina
    gasolina.kill(); // Elimina la gasolina al colisionar
    // Agrega lógica para aumentar el combustible o cualquier otra acción
    puntos += 1; // Puedes ajustar la cantidad de puntos ganados
    mostrarInfoEnPantalla();
    // Calcula la puntuación requerida para el siguiente nivel
    configurarNivel();
    var puntuacionRequerida = puntuacionNivelAnterior;

    // Verifica si el jugador ha alcanzado la puntuación requerida para avanzar al siguiente nivel
    if (puntos >= puntuacionRequerida) {
      this.nivelSiguiente();
    }
  },
  nivelSiguiente: function () {
    nivel++;
    mostrarInfoEnPantalla();

    // Aumenta la puntuación requerida para pasar al siguiente nivel al doble del nivel anterior
    puntuacionNivelAnterior *= 2;

    // Detén el temporizador actual
    juego.time.events.remove(timerGasolina);

    // Configura el nuevo nivel
    configurarNivel();

    // Establece un nuevo temporizador para la gasolina
    timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);
    console.log("nextnivel");
  },
};

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

function configurarNivel() {
  // Configura los niveles según tu lógica
  switch (nivel) {
    case 1:
      enemigos.setAll("body.velocity.y", 200);
      timerGasolina.delay = 2000;
      puntuacionNivelAnterior = 5; // Puntuación requerida para pasar al nivel 2
      console.log("confnivel1");
      break;
    case 2:
      enemigos.setAll("body.velocity.y", 250);
      timerGasolina.delay = 1800;
      puntuacionNivelAnterior = 10; // Puntuación requerida para pasar al nivel 3
      console.log("confnivel2");
      break;
    case 3:
      enemigos.setAll("body.velocity.y", 300);
      timerGasolina.delay = 1600;
      puntuacionNivelAnterior = 15; // Puntuación requerida para pasar al nivel 4
      break;
    case 4:
      enemigos.setAll("body.velocity.y", 350);
      timerGasolina.delay = 1400;
      puntuacionNivelAnterior = 20; // Puntuación requerida para pasar al nivel 5
      break;
    case 5:
      enemigos.setAll("body.velocity.y", 400);
      timerGasolina.delay = 1200;
      // No es necesario configurar la puntuación requerida para el siguiente nivel (último nivel)
      mostrarMensaje("YOU WIN!!");
      break;
  }
}
