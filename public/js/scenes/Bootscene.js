class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {

        //load images
        this.loadImages() ;
    
        //load spritesheet
        this.loadSpritesheet ();
        // load audio
        this.loadAudio ();

    };

    loadImages() {
        this.load.image('button1', '/images/ui/blue_button01.png',);
        this.load.image('button2', '/images/ui/blue_button01.png',);
    };

    loadSpritesheet () {
        this.load.spritesheet('items', '/images/items.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('characters', '/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    
        this.load.spritesheet('pokemon', '/images/images.png', { frameWidth: 67, frameHeight: 67 });
    }

    loadAudio () {
        this.load.audio('goldSound', ['/audio/Pickup.wav']);

    }
    create() {
        console.log('start game')
        this.scene.start('Game');
    }
    
}