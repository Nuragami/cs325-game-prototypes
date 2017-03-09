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
    var block;
    var nextBlockAt;
    var blockDelay;
    var time;

    function preload()
    {
        game.load.image('background', "assets/background.png");
        game.load.image('player', 'assets/player.png');
        game.load.image('block', 'assets/block.png');
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
        player.body.setSize(60, 90, 5, 16);
        player.anchor.setTo(0.5, 1);
        
        //player input
        cursors = game.input.keyboard.createCursorKeys();
        blueButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        redButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
        greenButton = game.input.keyboard.addKey(Phaser.Keyboard.R)
        normalButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        block = game.add.sprite(400, 0, 'block');
        block.anchor.setTo(0.5, 0.5);
        game.physics.enable(block, Phaser.Physics.ARCADE);
        blockGroup = this.add.group();
        blockGroup.physicsBodyType = Phaser.Physics.ARCADE;
        blockGroup.create(50, 'block');
        blockGroup.setAll('anchor.x', 0.5);
        blockGroup.setAll('anchor.y', 0.5);
        blockGroup.setAll('outOfBoundsKill', true);
        blockGroup.setAll('checkWorldBounds', true);
        nextBlockAt = 0;
        blockDelay = 500;
    }

    function update()
    {
        player.body.velocity.x = 0;
        //left movement
        if (cursors.left.isDown)
        {
            player.scale.x = -1
            player.body.velocity.x = -250;
        }
        //right movement
        else if (cursors.right.isDown)
        {
            player.scale.x = 1;
            player.body.velocity.x = 250;
        }
       
        if (normalButton.isDown)
        {
            player.tint = 0xFFFFFF;
            isPlayerNormal = true;
        }
        if (blueButton.isDown)
        {
            player.tint = 0x0004FF;
            isPlayerBlue = true;
        }
        if (redButton.isDown)
        {
            player.tint = 0xFF0000;
            isPlayerRed = true;
        }
        if (greenButton.isDown)
        {
            player.tint = 0x26B000;
            isPlayerGreen = true;
        }

        //SpawnBlock();
        if (nextBlockAt < this.time.now)
        {
            nextBlockAt = this.time.now + blockDelay;
            var block = blockGroup.getFirstExists(false);
            block = game.add.sprite(400, 0, 'block');
            block.anchor.setTo(0.5, 0.5);
            game.physics.enable(block, Phaser.Physics.ARCADE);
            var i = getRandomInt(-1, 4);
            if (i == 1)
            {
                //Normal
                block.tint = 0xFFFFFF;
            }
            if (i == 2)
            {
                //Blue
                block.tint = 0x0004FF;
            }
            if (i == 3)
            {
                //Red
                block.tint = 0xFF0000;
            }
            if (i == 4)
            {
                //Green
                block.tint = 0x26B000;
            }
            block.reset(getRandomInt(20, 780), 0);
            block.body.velocity.y = rnd.integerInRange(30, 60);
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
