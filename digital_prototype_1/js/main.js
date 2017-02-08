window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    function preload()
    {
        // Load player sprite
        game.load.image('playersprite', 'assets/playersprite.png');

    }

    function create()
    {       
        players = game.add.group();
        createPlayer(200, 700);
    }

    function update()
    {
      
    }

    function createPlayer(x, y)
    {
        var player = players.create(x, y, 'playersprite');
    }
};
