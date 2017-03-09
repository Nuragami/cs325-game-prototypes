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
    var isPlayerNormal;
    var isPlayerBlue;
    var isPlayerRed;
    var isPlayerGreen;
    var blockGroup;
    var blueblockGroup;
    var redblockGroup;
    var greenblockGroup;
    var block;
    var blueblock;
    var redblock;
    var greenblock;
    var nextBlockAt;
    var blockDelay;
    var time;
    var timerText;
    var lives = 5;
    var livesText;

    function preload()
    {
        game.load.image('background', "assets/background.png");
        game.load.image('player', 'assets/player.png');
        game.load.image('block', 'assets/block.png');
        game.load.image('blueblock', 'assets/blueblock.png');
        game.load.image('redblock', 'assets/redblock.png');
        game.load.image('greenblock', 'assets/greenblock.png');
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
        //player.body.setSize(60, 90, 5, 16);
        player.anchor.setTo(0.5, 1);
        player.body.immovable = true;
        
        //player input
        cursors = game.input.keyboard.createCursorKeys();
        blueButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        redButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
        greenButton = game.input.keyboard.addKey(Phaser.Keyboard.R)
        normalButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        //block
        //block = game.add.sprite(400, 0, 'block');
        //block.anchor.setTo(0.5, 0.5);
        //game.physics.enable(block, Phaser.Physics.ARCADE);
        //blue
        //blueblock = game.add.sprite(400, 0, 'blueblock');
        //blueblock.anchor.setTo(0.5, 0.5);
        //game.physics.enable(blueblock, Phaser.Physics.ARCADE);
        //red
        //redblock = game.add.sprite(400, 0, 'redblock');
        //redblock.anchor.setTo(0.5, 0.5);
        //game.physics.enable(redblock, Phaser.Physics.ARCADE);
        //green
        //greenblock = game.add.sprite(400, 0, 'greenblock');
        //greenblock.anchor.setTo(0.5, 0.5);
        //game.physics.enable(greenblock, Phaser.Physics.ARCADE);

        //blockgroup
        blockGroup = this.add.group();
        blockGroup.physicsBodyType = Phaser.Physics.ARCADE;
        blockGroup.create(50, 'block');
        blockGroup.setAll('anchor.x', 0.5);
        blockGroup.setAll('anchor.y', 0.5);
        blockGroup.setAll('outOfBoundsKill', true);
        blockGroup.setAll('checkWorldBounds', true);
        //blueblockgroup
        blueblockGroup = this.add.group();
        blueblockGroup.physicsBodyType = Phaser.Physics.ARCADE;
        blueblockGroup.create(50, 'blueblock');
        blueblockGroup.setAll('anchor.x', 0.5);
        blueblockGroup.setAll('anchor.y', 0.5);
        blueblockGroup.setAll('outOfBoundsKill', true);
        blueblockGroup.setAll('checkWorldBounds', true);
        //redblockgroup
        redblockGroup = this.add.group();
        redblockGroup.physicsBodyType = Phaser.Physics.ARCADE;
        redblockGroup.create(50, 'redblock');
        redblockGroup.setAll('anchor.x', 0.5);
        redblockGroup.setAll('anchor.y', 0.5);
        redblockGroup.setAll('outOfBoundsKill', true);
        redblockGroup.setAll('checkWorldBounds', true);
        //greenblockgroup
        greenblockGroup = this.add.group();
        greenblockGroup.physicsBodyType = Phaser.Physics.ARCADE;
        greenblockGroup.create(50, 'greenblock');
        greenblockGroup.setAll('anchor.x', 0.5);
        greenblockGroup.setAll('anchor.y', 0.5);
        greenblockGroup.setAll('outOfBoundsKill', true);
        greenblockGroup.setAll('checkWorldBounds', true);
        nextBlockAt = 0;
        blockDelay = 500;
        
        //Timer text
        timerText = game.add.text(game.world.centerX + 100, game.world.centerY + 275, "Time: ", {
            font: "20px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        timerText.anchor.setTo(0.5, 0.5);
        timerText.fixedToCamera = true;
        time = game.time.create(true);
        //Lives text
        livesText = game.add.text(game.world.centerX - 100, game.world.centerY + 275, "You have 5 lives left!", {
            font: "20px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        livesText.anchor.setTo(0.5, 0.5);
        livesText.fixedToCamera = true;

        isPlayerNormal = true;
        isPlayerBlue = false;
        isPlayerRed = false;
        isPlayerGreen = false;
    }

    function update() {
        time = game.time;
        //timerText.setText("Timer: " + time);
        player.body.velocity.x = 0;
        //left movement
        if (cursors.left.isDown) {
            player.scale.x = -1
            player.body.velocity.x = -250;
        }
            //right movement
        else if (cursors.right.isDown) {
            player.scale.x = 1;
            player.body.velocity.x = 250;
        }

        if (normalButton.onDown) {
            player.tint = 0xFFFFFF;
            isPlayerNormal = true;
            isPlayerBlue = false;
            isPlayerRed = false;
            isPlayerGreen = false;
        }
        if (blueButton.onDown) {
            player.tint = 0x0004FF;
            isPlayerBlue = true;
            isPlayerNormal = false;
            isPlayerRed = false;
            isPlayerGreen = false;
        }
        if (redButton.onDown) {
            player.tint = 0xFF0000;
            isPlayerRed = true;
            isPlayerNormal = false;
            isPlayerBlue = false;
            isPlayerGreen = false;
        }
        if (greenButton.onDown) {
            player.tint = 0x26B000;
            isPlayerGreen = true;
            isPlayerNormal = false;
            isPlayerBlue = false;
            isPlayerRed = false;
        }

        //SpawnBlock();
        if (nextBlockAt < this.time.now) {
            var i = getRandomInt(-1, 4);
            if (i == 1) {
                nextBlockAt = this.time.now + blockDelay;
                block = blockGroup.getFirstExists(false);
                block = game.add.sprite(75, 75,'block');
                block.anchor.setTo(0.5, 0.5);
                game.physics.enable(block, Phaser.Physics.ARCADE);
                block.reset(getRandomInt(20, 780), 0);
                block.body.velocity.y = getRandomInt(100, 150);
            }
            if (i == 2) {
                nextBlockAt = this.time.now + blockDelay;
                blueblock = blueblockGroup.getFirstExists(false);
                blueblock = game.add.sprite(75,75,'blueblock');
                blueblock.anchor.setTo(0.5, 0.5);
                game.physics.enable(blueblock, Phaser.Physics.ARCADE);
                blueblock.reset(getRandomInt(20, 780), 0);
                blueblock.body.velocity.y = getRandomInt(100, 150);
            }
            if (i == 3) {
                nextBlockAt = this.time.now + blockDelay;
                redblock = redblockGroup.getFirstExists(false);
                redblock = game.add.sprite(75,75,'redblock');
                redblock.anchor.setTo(0.5, 0.5);
                game.physics.enable(redblock, Phaser.Physics.ARCADE);
                redblock.reset(getRandomInt(20, 780), 0);
                redblock.body.velocity.y = getRandomInt(100, 150);
            }
            if (i == 4) {
                nextBlockAt = this.time.now + blockDelay;
                greenblock = greenblockGroup.getFirstExists(false);
                greenblock = game.add.sprite(75,75,'greenblock');
                greenblock.anchor.setTo(0.5, 0.5);
                game.physics.enable(greenblock, Phaser.Physics.ARCADE);
                greenblock.reset(getRandomInt(20, 780), 0);
                greenblock.body.velocity.y = getRandomInt(100, 150);
            }
        }
        //check collision
        if (isPlayerNormal == true)
        {
            if (game.physics.arcade.collide(block, player))
            {
                block.destroy();
            }
            if (game.physics.arcade.collide(blueblock, player))
            {
                lives = lives - 1;
                blueblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(redblock, player))
            {
                lives = lives - 1;
                redblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(greenblock, player))
            {
                lives = lives - 1;
                greenblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
        }
        if (isPlayerBlue == true) {
            if (game.physics.arcade.collide(blueblock, player))
            {
                blueblock.destroy();
            }
            if (game.physics.arcade.collide(block, player))
            {
                lives = lives - 1;
                block.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(redblock, player))
            {
                lives = lives - 1;
                redblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(greenblock, player))
            {
                lives = lives - 1;
                greenblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
        }
        if (isPlayerRed == true) {
            if (game.physics.arcade.collide(redblock, player))
            {
                redblock.destroy();
            }
            if (game.physics.arcade.collide(block, player))
            {
                lives = lives - 1;
                block.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(blueblock, player))
            {
                lives = lives - 1;
                blueblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(greenblock, player))
            {
                lives = lives - 1;
                greenblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
        }
        if (isPlayerGreen == true)
        {
            if (game.physics.arcade.collide(greenblock, player))
            {
                greenblock.destroy();
            }
            if (game.physics.arcade.collide(block, player))
            {
                lives = lives - 1;
                block.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(blueblock, player))
            {
                lives = lives - 1;
                blueblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
            if (game.physics.arcade.collide(redblock, player))
            {
                lives = lives - 1;
                redblock.destroy();
                livesText.setText("You have " + lives + " lives left!");
            }
        }
        if(lives <= 0)
        {
            player.destroy();
        }
    }

    function getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //function SpawnBlock()
    //{
    //    if (nextBlockAt < this.time.now)
    //    {
    //        nextBlockAt = this.time.now + blockDelay;
    //        var block = blockGroup.getFirstExists(false);
    //        var i = rnd.integerInRange(1, 4);
    //        if (i == 1)
    //        {
    //            //Normal
    //            block.tint = 0xFFFFFF;
    //        }
    //        if (i == 2)
    //        {
    //            //Blue
    //            block.tint = 0x0004FF;
    //        }
    //        if (i == 3)
    //        {
    //            //Red
    //            block.tint = 0xFF0000;
    //        }
    //        if (i == 4)
    //        {
    //            //Green
    //            block.tint = 0x26B000;
    //        }
    //        block.reset(rnd.integerInRange(20, 780), 0);
    //        block.body.velocity.y = rnd.integerInRange(30, 60);
    //    }        
    //}












};
