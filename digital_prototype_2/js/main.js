window.onload = function ()
{
    "use strict";

    var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var background;

    function preload()
    {
        game.load.image('background', "assets/background.png");

    }

    function create()
    {


    }

    function update()
    {

    }

};
