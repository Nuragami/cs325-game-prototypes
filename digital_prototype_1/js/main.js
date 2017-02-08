window.onload = function () {
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    var inputs;
    var background;
    var players;

    function preload() {
        // Load player sprite
        game.load.image('playersprite', "assets/playersprite.png");
        game.load.image('background', "assets/background.png");

    }

    function create() {
        background = game.add.tileSprite(0, 0, 400, 800, 'background');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        players = game.add.group();
        createPlayer(200, 200);
        inputs = game.input.keyboard.createCursorKeys();

        game.add.sprite(0, 0, 'playersprite')

    }

    function update() {
        background.tilePosition.y += 2;
        playerUpdate();
    }

    function createPlayer(x, y) {
        var player = players.create(x, y, 'playersprite');
        player.body.colliderWorldBounds = true;

    }

    function playerUpdate() {
        players.forEach(function (p) {
            p.body.velocity.x = 0;
            if (inputs.left.isDown) {
                p.body.velocity.x = -150;
            }
            else if (inputs.right.isDown) {
                p.body.velocity.x = 150;
            }
        });
    }
};
