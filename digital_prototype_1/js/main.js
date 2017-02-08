window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;
    var player;
 

    function preload()
    {
        game.load.image('playersprite', "assets/playersprite.png");
        game.load.image('background', "assets/background.png");
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 400, 800, 'background');
        player = game.add.sprite(0, 0, 'playersprite');
        game.physics.arcade.enable(player);
        
       

    }

    function update()
    {
        background.tilePosition.y += 2;
      
    }

   
};
