window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    var background;
 

    function preload()
    {
        // Load player sprite
        game.load.image('playersprite', "assets/playersprite.png");
        game.load.image('background', "assets/background.png");

    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 400, 800, 'background');
       

    }

    function update()
    {
        background.tilePosition.y += 2;
      
    }

   
};
