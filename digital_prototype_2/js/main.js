window.onload = function ()
{
  "use strict";

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

  var background;
  var player;
  //var playerSpeed;
  var cursors;

  var zombie;

  var heart;
  var lung;
  var brain;

  var itemCounter = 0;
  var scoreCounter = 0;
  var zombieCounter = 0;

  var text;

  function preload()
  {
    game.load.image('background', "assets/background.png");
    game.load.image('player', "assets/player.png");
    game.load.image('heart', "assets/heart.png");
    game.load.image('lung', "assets/lung.png");
    game.load.image('brain', "assets/brain.png");
    game.load.image('zombie', "assets/zombie.png")
  }

  function create()
  {
    background = game.add.tileSprite(0, 0, 1600, 600, 'background');
    game.world.setBounds(0, 0, 1600, 600);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);
    player.body.setRectangle(75,100,0,0);
    player.body.setZeroDamping();
    player.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

    game.physics.p2.setImpactEvents(true);


    text = game.add.text(game.world.centerX-650, game.world.centerY-250, "You collected 0 organs!",{
      font: "20px Arial",
      fill: "#ff0044",
      align: "center"
    });
    text.anchor.setTo(0.5, 0.5);
    text.fixedToCamera = true;

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
    while(itemCounter <= 3)
    {
      createOrgan();
      if(itemCounter > 3)
      {
        break;
      }
    }
    zombieCounter = itemCounter%10;
    while(zombieCounter == 0)
    {
      createEnemy();
      if(zombieCounter != 0)
      {
        break;
      }
    }
 }

 function createOrgan()
 {
   var randomItem;
   randomItem = getRandomInt(-1, 3);
   if(randomItem == 0)
   {
     heart = game.add.sprite(game.world.randomX, game.world.randomY, 'heart');
     game.physics.p2.enable(heart);
     heart.body.setRectangle(50,50,0,0)
     heart.body.setZeroVelocity();
     player.body.createBodyCallback(heart, collectOrgan, this);
     itemCounter = itemCounter + 1;
   }
   if(randomItem == 1)
   {
     lung = game.add.sprite(game.world.randomX, game.world.randomY, 'lung');
     game.physics.p2.enable(lung);
     lung.body.setRectangle(50,50,0,0)
     lung.body.setZeroVelocity();
     player.body.createBodyCallback(lung, collectOrgan, this);
     itemCounter = itemCounter + 1;
   }
   if(randomItem == 2)
   {
     brain = game.add.sprite(game.world.randomX, game.world.randomY, 'brain');
     game.physics.p2.enable(brain);
     brain.body.setRectangle(50,50,0,0)
     brain.body.setZeroVelocity();
     player.body.createBodyCallback(brain, collectOrgan, this);
     itemCounter = itemCounter + 1;
   }
 }

 function getRandomInt(min, max)
 {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 function collectOrgan(body1, body2)
 {
    body2.sprite.kill();
    itemCounter = itemCounter - 1;
    scoreCounter = scoreCounter + 1;
    text.setText("You collected " + scoreCounter + " organs!");
 }

 function createEnemy()
 {
   zombie = game.add.sprite(game.world.randomX, game.world.randomY, 'zombie');
   game.physics.p2.enable(zombie);
   heart.body.setRectangle(100,100,0,0)
   heart.body.setZeroVelocity();
 }




};
