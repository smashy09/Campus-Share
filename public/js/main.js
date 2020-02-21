var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#5f2a55",
    scene: {
        // init: init, //call when a scene first initialize, will be called once
        preload: preload, // load in assets and logic
        create: create, // trigger when scene started and creating objects and ui element. position enemy. call one time as well
        update: update, //call once every frame(alot)capturing movement and animation
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            },
        },
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('button1', '/images/ui/blue_button01.png',);
    this.load.spritesheet('items', '/images/items.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', '/images/characters.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('pokemon', '/images/images.png', { frameWidth: 67, frameHeight: 67 });
};

function create() {
    var button = this.add.image(200, 200, 'button1');
    button.setOrigin(0.5, 0.5);
    this.add.sprite(300, 100, 'button1');
    this.add.image(200, 250, 'items', 0);
    this.physics.add.image(500, 100, 'button1');
    this.add.sprite(400, 300, 'pokemon', 0);


    this.player = this.physics.add.image(32, 32, 'characters', 2);
    this.player.setScale(2);

    this.cursors = this.input.keyboard.createCursorKeys();

};

function update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if(this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    } 
    
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if(this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    } 
};