window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;

    //var cursors;

    var cowboy;   
    var cowboyBullets;   
    var cowboyFireButton;
    var cowboyUpButton;
    var cowboyDownButton;
    var cowboyLeftButton;
    var cowboyRightButton;

    var asteriod;

    var bulletTime = 0;
 

    function preload()
    {
        game.load.image('cowboy', "assets/cowboy.png");
        game.load.image('background', "assets/background.png");
        game.load.image('bullet', "assets/bullet.png");
        game.load.image('bullet2', "assets/bullet2.png");
        game.load.image('asteriod', "assets/asteriod.png");
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 800, 400, 'background');

        cowboy = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'cowboy');
        game.physics.enable(cowboy, Phaser.Physics.ARCADE);
        cowboy.enableBody = true;
        cowboy.body.colliderWorldBounds = true;

        cowboyUpButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        cowboyDownButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        cowboyLeftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        cowboyRightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        cowboyFireButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        asteriod = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'asteriod');
        game.physics.enable(asteriod, Phaser.Physics.ARCADE);
        asteriod.enableBody = true;
        asteriod.body.colliderWorldBounds = true;

        //cursors = game.input.keyboard.createCursorKeys();

        cowboyBullets = game.add.group();
        cowboyBullets.enableBody = true;
        cowboyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        cowboyBullets.createMultiple(30, 'bullet');
        cowboyBullets.setAll('anchor.x', 0.5);
        cowboyBullets.setAll('anchor.y', 1);
        cowboyBullets.setAll('outofBoundsKill', true);
        cowboyBullets.setAll('checkWorldBounds', true);

    }

    function update()
    {
        background.tilePosition.x += 2;

        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = 0;
        

        if(cowboyLeftButton.isDown)
        {
            cowboy.body.velocity.x = -350;
        }
        if(cowboyRightButton.isDown)
        {
            cowboy.body.velocity.x = 350;
        }
        if (cowboyUpButton.isDown)
        {
            cowboy.body.velocity.y = -300
        }
        if (cowboyDownButton.isDown)
        {
            cowboy.body.velocity.y = 300;
        }           

        if(cowboyFireButton.isDown)
        {
            FireBulletCowboy();
        }


     
      
    }

    function FireBulletCowboy()
    {
        if(game.time.now > bulletTime)
        {
            var bullet = cowboyBullets.getFirstExists(false);
            if(bullet)
            {
                bullet.reset(cowboy.x, cowboy.y);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
            }
        }
    }

 

   
};
