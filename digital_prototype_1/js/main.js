window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;

    var cursors;

    var cowboy;   
    var bullets1;
    var bulletTime1 = 0;
    var fireButton1;

    var asteriod;
 

    function preload()
    {
        game.load.image('cowboy', "assets/cowboy.png");
        game.load.image('background', "assets/background.png");
        game.load.image('bullet', "assets/bullet.png");
        game.load.image('asteriod', "assets/asteriod.png");
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 800, 400, 'background');

        cowboy = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'cowboy');
        game.physics.enable(cowboy, Phaser.Physics.ARCADE);
        cowboy.enableBody = true;
        cowboy.body.colliderWorldBounds = true;

        asteriod = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'asteriod');
        game.physics.enable(asteriod, Phaser.Physics.ARCADE);
        asteriod.enableBody = true;
        asteriod.body.colliderWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();

        bullets1 = game.add.group();
        bullets1.enableBody = true;
        bullets1.physicsBodyType = Phaser.Physics.ARCADE;
        bullets1.createMultiple(30, 'bullet');
        bullets1.setAll('anchor.x', 0.5);
        bullets1.setAll('anchor.y', 1);
        bullets1.setAll('outofBoundsKill', true);
        bullets1.setAll('checkWorldBounds', true);

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

       

      
        
       

    }

    function update()
    {
        background.tilePosition.x += 2;

        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = 0;
        

        if(cursors.a.isDown)
        {
            cowboy.body.velocity.x = -350;
        }
        if(cursors.d.isDown)
        {
            cowboy.body.velocity.x = 350;
        }
        if (cursors.w.isDown)
        {
            cowboy.body.velocity.y = -300
        }
        if (cursors.s.isDown)
        {
            cowboy.body.velocity.y = 300;
        }           

        if(fireButton1.isDown)
        {
            fireBullet1();
        }


        if (cursors.left.isDown)
        {
            asteriod.body.velocity.x = -350;
        }
        if (cursors.right.isDown)
        {
            asteriod.body.velocity.x = 350;
        }
        if (cursors.up.isDown)
        {
            asteriod.body.velocity.y = -300
        }
        if (cursors.down.isDown)
        {
            asteriod.body.velocity.y = 300;
        }

        if (fireButton2.isDown)
        {
            fireBullet2();
        }


      
    }

    function fireBullet1()
    {
        if(game.time.now > bulletTime1)
        {
            var bullet = bullets1.getFirstExists(false);
            if(bullet)
            {
                bullet.reset(cowboy.x + 14, cowboy.y);
                bullet.body.velocity.x = 400;
                bulletTime1 = game.time.now + 200;
            }
        }
    }

 

   
};
