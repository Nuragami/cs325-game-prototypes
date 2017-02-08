window.onload = function () {
    "use strict";

    var game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    var inputs;

    function preload() {
        // Load player sprite
        game.load.image('playersprite', 'digital_prototype_1/assets/playersprite.png');

    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        players = game.add.group();
        createPlayer(200, 200);
        inputs = game.input.keyboard.createCursorKeys();
    }

    function update() {
        playerUpdate();
    }

    function createPlayer(x, y) {
        game.add.sprite(x, y, 'playersprite');
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
