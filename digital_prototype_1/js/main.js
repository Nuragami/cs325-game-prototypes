window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;
    var player;
    var cursors;
 

    function preload()
    {
        game.load.image('playersprite', "assets/playersprite.png");
        game.load.image('background', "assets/background.png");
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 400, 800, 'background');

        player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'playersprite');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.createCursorKeys();

        
       

    }

    function update()
    {
        background.tilePosition.y += 2;

        if(cursors.left.isDown)
        {
            player.body.velocity.x = -350;
        }
        if(cursors.right.isDown)
        {
            player.body.velocity.x = 350;
        }
      
    }

   
};
