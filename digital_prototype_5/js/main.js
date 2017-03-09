window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var cursors;
    var jumpButton;
    var background;
    var player;

    function preload()
    {
        game.load.image('background', "assets/background.png");
        game.load.image('player', 'assets/player.png');
    }

    function create()
    {
        //background
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
        game.world.setBounds(0, 0, 800, 600);
        background.fixedToCamera = true;

        //physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //player
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.body.setSize(60, 90, 5, 16);

        //player animations
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('turn', [4], 20, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);



        
        //player input
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
    }

    function update()
    {
        player.body.velocity.x = 0;
        //left movement
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;

            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        //right movement
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;

            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        //idle
        else
        {
            if (facing != 'idle')
            {
                player.animations.stop();

                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 5;
                }
                facing = 'idle';
            }
        }
        //jump
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }

    }












};
