class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {

        //load images
        this.loadImages() ;
    
        //load spritesheet
        this.loadSpritesheet();
        // load audio
        this.loadAudio ();
        this.loadTileMap();
        
        //this is if we had a tilemap json
        //this.load.tilemapTiledJson('insertname', 'path/tile.json')

    };

    loadImages() {
        this.load.image('button1', '/images/ui/blue_button01.png',);
        this.load.image('button2', '/images/ui/blue_button02.png',);

        this.load.image('background', '/assets/Map/SE1-floor1.png');

        this.load.image('background2', '/assets/Map/background.png');

        this.load.image('background3', '/assets/Map/SE1-floor2v2.png');
    };
    
    loadTileMap() {
        this.load.tilemapTiledJSON('map', '/assets/Map/large_level.json');

        this.load.tilemapTiledJSON('map2', '/assets/Map/SE1v2.json');
        this.load.tilemapTiledJSON('map3', '/assets/Map/se2.json');
        this.load.tilemapTiledJSON('map4', '/assets/Map/dungeontest.json');
    }
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
        this.scene.start('Title');
    }
    
}