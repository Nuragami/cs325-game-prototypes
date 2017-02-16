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
    player.body.setZeroVelocity();

     if (cursors.up.isDown)
     {
         player.body.velocity.y = 100
     }
     else if (cursors.down.isDown)
     {
         player.body.velocity.y = -100
     }

     if (cursors.left.isDown)
     {
         player.body.velocity.x = -100;
     }
     else if (cursors.right.isDown)
     {
         player.body.velocity.x = 100;
     }
  }
};
