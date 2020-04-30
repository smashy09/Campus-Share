class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
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
        
        //items
        this.load.image('button1', '/images/ui/blue_button01.png',);
        this.load.image('button2', '/images/ui/blue_button02.png',);
        this.load.image('basketball', '/assets/Icon(objects)/1x/Basketball.png',);
        
        //map
        this.load.image('background', '/assets/Map/BCITA-tileset.png');

        // this.load.image('background2', '/assets/Map/.png');

        // this.load.image('background3', '/assets/Map/.png');
    };
    
    loadTileMap() {
        this.load.tilemapTiledJSON('map', '/assets/Map/exterior.json');

        this.load.tilemapTiledJSON('map2', '/assets/Map/SE1 (2nd Floor).json');
        this.load.tilemapTiledJSON('map3', '/assets/Map/SEbeta.json');
        
    };
    loadSpritesheet () {
        
        this.load.spritesheet('items', '/images/items.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('characters', '/images/characters.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player', '/images/Charactors/C_Enginnering/enginnering1_front.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('pokemon', '/images/images.png', { frameWidth: 67, frameHeight: 67 });

        
    };

    
    
    loadAudio () {
        this.load.audio('goldSound', ['/audio/Pickup.wav']);

    };
    create() {
        console.log('start game')
        this.scene.start('Title');
    };
    
};