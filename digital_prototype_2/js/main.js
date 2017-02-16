window.onload = function ()
{
  "use strict";

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

  var background;
  var player;

  function preload()
  {
    game.load.image('background', "assets/background.png");
    game.load.image('player', "assets/player.png");
  }

  function create()
  {
    game.world.setBounds(0, 0, 1600, 600);
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    background.fixedToCamera = true;

    player = game.add.sprite(0, 0, 'player');
    player.anchor.setTo(0.5, 0.5);

    game.physics.enable(player, Phaser.Physics.ARCADE);
  }

  function update()
  {


  }
};
