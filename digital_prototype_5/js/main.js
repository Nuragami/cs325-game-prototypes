window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var cursors;
    var blueButton;
    var redButton;
    var greenButton;
    var normalButton;
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
        player = game.add.sprite(game.world.centerX, game.world.centerY + 250, 'player');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.body.setSize(60, 90, 5, 16);
        player.anchor.setTo(0.5, 1);
        
        //player input
        cursors = game.input.keyboard.createCursorKeys();
        blueButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        redButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
        redButton = game.input.keyboard.addKey(Phaser.Keyboard.R)
        normalButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    }

    function update()
    {
        player.body.velocity.x = 0;
        //left movement
        if (cursors.left.isDown)
        {
            player.scale.x = -1
            player.body.velocity.x = -250;
        }
        //right movement
        else if (cursors.right.isDown)
        {
            player.scale.x = 1;
            player.body.velocity.x = 250;
        }
       
        if (Q.isDown)
        {
            player.tint = 0xFFFFFF;
        }
        if (WisDown)
        {
            player.tint = 0x0004FF;
        }
        if (E.isDown)
        {
            player.tint = 0xFF0000;
        }
    }












};
