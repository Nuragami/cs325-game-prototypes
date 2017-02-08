window.onload = function () {
    "use strict";

    var game = new Phaser.Game(500, 1000, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    var inputs;

    function preload() {
        // Load player sprite
        game.load.image('playersprite', 'assets/playersprite.png');

    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        players = game.add.group();
        createPlayer(200, 200);
        inputs = game.input.keyboard.createCursorKeys();

        game.add.sprite(0, 0, 'playersprite')
    }

    function update() {
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
