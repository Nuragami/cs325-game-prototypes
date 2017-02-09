window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;

    var player;
    var cursors;

    var bullets;
    var bulletTime = 0;
    var fireButton;
 

    function preload()
    {
        game.load.image('playersprite', "assets/playersprite.png");
        game.load.image('background', "assets/background.png");
        game.load.image('bullet', "assets/bullet.png")
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 400, 800, 'background');

        player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'playersprite');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.createCursorKeys();

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outofBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        
       

    }

    function update()
    {
        background.tilePosition.y += 2;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.colliderWorldBounds = true;

        if(cursors.left.isDown)
        {
            player.body.velocity.x = -350;
        }
        if(cursors.right.isDown)
        {
            player.body.velocity.x = 350;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -300
        }
        if (cursors.down.isDown)
        {
            player.body.velocity.y = 300;
        }
           

        if(fireButton.isDown)
        {
            fireBullet();
        }
      
    }

    function fireBullet()
    {
        if(game.time.now > bulletTime)
        {
            var bullet = bullets.getFirstExists(false);
            if(bullet)
            {
                bullet.reset(player.x + 14, player.y);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    }

   
};
