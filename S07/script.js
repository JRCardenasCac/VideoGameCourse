//Crea una instancia del juego
var game = new Phaser.Game(500, 500, Phaser.CANVAS, "bloque_juego");

var background, newPlayer, enemies;
/*
rightKeyboard,
leftKeyboard,
upKeyboard,
downKeyboard*/
// Define la escena del juego
var mainScene = {
  preload() {
    // Carga los recursos gráficos
    game.load.image("background", "img/background.png");
    game.load.spritesheet("player", "img/player.png", 1334, 1334);
    game.load.spritesheet("enemy1", "img/Enemy1.png", 48, 48);
  },
  create() {
    // Agrega el fondo
    background = game.add.tileSprite(0, 0, 500, 500, "background");

    // Agrega al personaje como sprite animado
    newPlayer = game.add.sprite(200, 200, "player");
    newPlayer.animations.add("animation", [0, 1, 2, 3, 4, 5], 10, true);

    //Agregar enemigos
    //enemies = game.add.sprite(100, 100, "enemy1");
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        var randEnemies = enemies.create(x * 50, y * 50, "enemy1");
        randEnemies.anchor.setTo(0.5);
      }
    }
    enemies.x = 100;
    enemies.y = 390;
    var animation = game.add
      .tween(enemies)
      .to({ x: 200 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },
  update() {
    // Controla el movimiento del personaje
    const cursors = game.input.keyboard.createCursorKeys();
    background.tilePosition.x -= 1;

    if (cursors.right.isDown) {
      newPlayer.x++;
      newPlayer.animations.play("animation");
    }
  },
};

game.state.add("mainScene", mainScene);
game.state.start("mainScene");
