window.onload = function ()
{
  "use strict";

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

  var background;
  var player;
  //var playerSpeed;
  var cursors;

  var heart;
  var lung;
  var brain;

  var itemCounter = 0;

  function preload()
  {
    game.load.image('background', "assets/background.png");
    game.load.image('player', "assets/player.png");
    game.load.image('heart', "assets/heart.png");
    game.load.image('lung', "assets/lung.png");
    game.load.image('brain', "assets/brain.png");
  }

  function create()
  {
    background = game.add.tileSprite(0, 0, 1600, 600, 'background');
    game.world.setBounds(0, 0, 1600, 600);
    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
  }

  function update()
  {
    //Player stuff
    player.body.setZeroVelocity();
    if (cursors.up.isDown)
    {
      player.body.velocity.y = -300;
    }
    else if (cursors.down.isDown)
    {
      player.body.velocity.y = 300;
    }
    if (cursors.left.isDown)
    {
      player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity.x = 300;
    }
    if(itemCounter < 10)
    {
      createItem();
    }
    game.physics.arcade.overlap(player, [heart, lung, brain], itemCollection, null, this);
 }

 function createItem()
 {
   var randomItem;
   randomItem = getRandomInt(-1, 3);
   if(randomItem == 0)
   {
     heart = game.add.sprite(game.world.randomX, game.world.randomY, 'heart');
     //game.physics.p2.enable(heart);
     itemCounter = itemCounter + 1;
   }
   if(randomItem == 1)
   {
     lung = game.add.sprite(game.world.randomX, game.world.randomY, 'lung');
     //game.physics.p2.enable(lung);
     itemCounter = itemCounter + 1;
   }
   if(randomItem == 2)
   {
     brain = game.add.sprite(game.world.randomX, game.world.randomY, 'brain');
     //game.physics.p2.enable(brain);
     itemCounter = itemCounter + 1;
   }
 }

 function getRandomInt(min, max)
 {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 function itemCollection(player, [heart, lung, brain])
 {
     [heart, lung, brain].kill();
 }

};
