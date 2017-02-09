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
    var asteriodBullets;
    var asteriodFireButton;
    var asteriodUpButton;
    var asteriodDownButton;
    var asteriodLeftButton;
    var asteriodRightButton;

    var bulletTime = 0;

    var winTextCowboy;
    var winTextAsteriod;
 

    function preload()
    {
        game.load.image('cowboy', "assets/cowboy.png");
        game.load.image('background', "assets/background.png");
        game.load.image('cowboyBullet', "assets/cowboyBullet.png");
        game.load.image('asteriodBullet', "assets/asteriodBullet.png");
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

        cowboyBullets = game.add.group();
        cowboyBullets.enableBody = true;
        cowboyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        cowboyBullets.createMultiple(100, 'cowboyBullet');
        cowboyBullets.setAll('anchor.x', 1);
        cowboyBullets.setAll('anchor.y', 0.5);
        cowboyBullets.setAll('outofBoundsKill', true);
        cowboyBullets.setAll('checkWorldBounds', true);

        asteriod = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'asteriod');
        game.physics.enable(asteriod, Phaser.Physics.ARCADE);
        asteriod.enableBody = true;
        asteriod.body.colliderWorldBounds = true;

        asteriodUpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        asteriodDownButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        asteriodLeftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        asteriodRightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        asteriodFireButton = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);

        asteriodBullets = game.add.group();
        asteriodBullets.enableBody = true;
        asteriodBullets.physicsBodyType = Phaser.Physics.ARCADE;
        asteriodBullets.createMultiple(100, 'asteriodBullet');
        asteriodBullets.setAll('anchor.x', 1);
        asteriodBullets.setAll('anchor.y', 0.5);
        asteriodBullets.setAll('outofBoundsKill', true);
        asteriodBullets.setAll('checkWorldBounds', true);

        //cursors = game.input.keyboard.createCursorKeys();

        winTextCowboy = game.add.text(game.world.centerX-100, game.world.centerY, "Cowboy Win!", { font: '32px Arial', fill: '#fff' });
        winTextCowboy.visible = false;
        winTextAsteriod = game.add.text(game.world.centerX-100, game.world.centerY, "Asteriod Win!", { font: '32px Arial', fill: '#fff' });
        winTextAsteriod.visible = false;

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

        asteriod.body.velocity.x = 0;
        asteriod.body.velocity.y = 0;

        if (asteriodLeftButton.isDown) {
            asteriod.body.velocity.x = -350;
        }
        if (asteriodRightButton.isDown) {
            asteriod.body.velocity.x = 350;
        }
        if (asteriodUpButton.isDown) {
            asteriod.body.velocity.y = -300
        }
        if (asteriodDownButton.isDown) {
            asteriod.body.velocity.y = 300;
        }
        if (asteriodFireButton.isDown) {
            FireBulletAsteriod();
        }

        game.physics.arcade.overlap(cowboyBullets, asteriod, collisionHandler, null, this);
        game.physics.arcade.overlap(asteriodBullets, cowboy, collisionHandler, null, this);

    }

    function FireBulletCowboy()
    {
        if(game.time.now > bulletTime)
        {
            var bullet = cowboyBullets.getFirstExists(false);
            if(bullet)
            {
                bullet.reset(cowboy.x + 42, cowboy.y + 14);
                bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
            }
        }
    }

    function FireBulletAsteriod()
    {
        if (game.time.now > bulletTime)
        {
            var bullet = asteriodBullets.getFirstExists(false);
            if (bullet)
            {
                bullet.reset(asteriod.x, asteriod.y + 14);
                bullet.body.velocity.x = -400;
                bulletTime = game.time.now + 200;
            }
        }
    }

    function collisionHandler(cowboyBullets, asteriod)
    {
        cowboyBullets.kill();
        asteriod.kill();
        winTextCowboy.visible = true;
        asteriodFireButton = game.input.keyboard.removeKey(Phaser.Keyboard.ZERO);
    }

    function collisionHandler(asteriodBullets, cowboy)
    {
        asteriodBullets.kill();
        cowboy.kill();
        winTextAsteriod.visible = true;
        cowboyFireButton = game.input.keyboard.removeKey(Phaser.Keyboard.ZERO);
    }

 

   
};
