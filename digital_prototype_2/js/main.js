window.onload = function ()
{
  "use strict";

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

  var background;
  var player;
  var playerSpeed;

  function preload()
  {
    game.load.image('background', "assets/background.png");
    game.load.image('player', "assets/player.png");
  }

  function create()
  {
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    game.world.setBounds(0, 0, 1600, 600);
    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
  }

  function update()
  {
    if(game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      player.x -= 5;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      player.x += 5;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
      player.y -= 5;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
      player.y += 5;
    }
  }
};
