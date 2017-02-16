window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var background;

    function preload()
    {
        game.load.image('background', "assets/background.png");
    }

    function create()
    {
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
    }

    function update()
    {

    }
};
