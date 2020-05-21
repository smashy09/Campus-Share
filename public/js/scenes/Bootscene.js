class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
        
    }

    preload() {

        this.levels = {
            1: 'busstop',
            2: 'SW1',
            3: 'SW1-2',
            4: 'outdoor1',
            5: 'SE2',
            6: 'SE14',

        }
        // this.levels = {
        //     1:'map',
        //     2:'level2',
        //     3:'level1',
            
        // };
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
        this.load.image('button1', '/images/ui/blue_button01.png');
        this.load.image('button2', '/images/ui/blue_button02.png');
        this.load.image('basketball', '/assets/New design assets/Basketball.png');
        this.load.image('weapon1', '/assets/New design assets/tennis racket.png');
        this.load.image('portalicon', '/assets/New design assets/portal(64x64).png');
        this.load.image('portal2', '/assets/New design assets/portal1 (64x64).png');
        this.load.image('quest', '/assets/New design assets/laptop.png');
        this.load.image('volume', '/assets/New design assets/volume3.png');
        this.load.image('backpack', '/assets/New design assets/backpack_open.png');
        this.load.image('busstop', '/assets/New design assets/bus stop(32x64).png');
        this.load.image('pencil1', '/assets/New design assets/newpencil.png');
        this.load.image('pencil2', '/assets/New design assets/pencil2.png');
        this.load.image('lock', '/assets/New design assets/lock.png');
        this.load.image('scard', '/assets/New design assets/student card.png');
        this.load.image('agenda', '/assets/New design assets/agenda.png');
        //monster
        this.load.image('raccoon', '/assets/New design assets/Raccoon.png');
        this.load.image('crow', '/assets/New design assets/Crow sprite.png');
        //npc
        this.load.image('alex', '/assets/New design assets/NPC1.png');
        this.load.image('Alex', '/assets/New design assets/Alex.png');
        this.load.image('SS1', '/assets/New design assets/Student Servcies1.png');
        this.load.image('SS2', '/assets/New design assets/Student Services2.png');
        this.load.image('SS3', '/assets/New design assets/Student Services3.png');
        this.load.image('Hoodnpc', '/assets/New design assets/BCIT shop  cashier.png');
        this.load.image('Cashierfood', '/assets/New design assets/Cashier2.png');
        this.load.image('CoffeeNpc', '/assets/New design assets/Cashier1.png');
        this.load.image('SS4', '/assets/New design assets/Student Services-right.png');
        //map
        this.load.image('background', '/assets/Map/BCITA-tileset.png');
        this.load.image('tileset1', '/assets/Map/tileset.png');
        this.load.image('RPGpack_sheet', '/assets/Map/RPGpack_sheet.png');
        
        // this.load.image('background2', '/assets/Map/.png');

      
    };
    
    loadTileMap() {
        
        this.load.tilemapTiledJSON('busstop', '/assets/Map/spawnpoint.json');
        
        
        this.load.tilemapTiledJSON('SW1', '/assets/Map/SW1 Floor 1.json');
        this.load.tilemapTiledJSON('SW1-2', '/assets/Map/SW1-2nd Floor.json');

        this.load.tilemapTiledJSON('outdoor1', '/assets/Map/Outside Area Between SW1 and SE2.json');

        this.load.tilemapTiledJSON('SE2', '/assets/Map/SE2.json');

        this.load.tilemapTiledJSON('SE14', '/assets/Map/SE14(wcollide).json');

        this.load.tilemapTiledJSON('zone1', '/assets/Map/level1.json');
        this.load.tilemapTiledJSON('zone2', '/assets/Map/level2.json');
        
    };
    loadSpritesheet () {
        
        this.load.spritesheet('items', '/images/items.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('characters', '/images/characters.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player', '/images/Charactors/C_Enginnering/enginnering1_front.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerLeft', '/images/Charactors/C_Enginnering/C_Enginnering1_left.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerRight', '/images/Charactors/C_Enginnering/C_Enginnering1_right.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerUp', '/images/Charactors/C_Enginnering/enginnering1_back.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('student', '/assets/New design assets/Character selection.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('portal', '/assets/Map/tileset.png', { frameWidth: 32, frameHeight: 32 });
        
        this.load.spritesheet('engineer', '/assets/New design assets/C_Enginnering.png', {frameHeight: 32, frameWidth: 32});

        this.load.spritesheet('business', '/assets/New design assets/C_business.png', {frameHeight: 32, frameWidth: 32});

        this.load.spritesheet('computer', '/assets/New design assets/C_Computer.png', {frameHeight: 32, frameWidth: 32});

        this.load.spritesheet('health', '/assets/New design assets/C_health and science.png', {frameHeight: 32, frameWidth: 32});
        //crows
        // this.load.spritesheet('crow', '/assets/New design assets/Crow sprite.png', {frameHeight: 32, frameWidth: 32});
        
    };

    
    
    loadAudio () {
        this.load.audio('goldSound', ['/audio/Pickup.wav']);
        this.load.audio('playerhit', ['/audio/PlayerDamage.wav']);
        this.load.audio('bgMusic', '/audio/omou matsu.mp3');
        this.load.audio('bgMusic2', '/audio/ayeon- more sunshine.mp3');
        this.load.audio('bgMusic3', '/audio/Morning 8-bit Relaxing Music.mp3');
        this.load.audio('bgMusic4', '/audio/8 Bit Love! Happy Fun Game Music by HeatleyBros.mp3');
        this.load.audio('bgMusic5', '/audio/Bloody Stream [8-Bit VRC6] - JoJos Bizarre Adventure OP 2.mp3');

        //video

        this.load.video('intro', '/audio/talk to alex in next building.mp4')
        this.load.video('alex1', '/audio/Alex text mp4s/alex taxt 1.mp4');
        this.load.video('alex2', '/audio/Alex text mp4s/alex taxt 2.mp4');
        this.load.video('alex3', '/audio/Alex text mp4s/alex taxt 3.mp4');
        this.load.video('alex4', '/audio/Alex text mp4s/alex taxt 4.mp4');
        this.load.video('alex5', '/audio/Alex text mp4s/alex taxt 5.mp4');
        this.load.video('alex6', '/audio/Alex text mp4s/alex taxt 6.mp4');
        this.load.video('alex7', '/audio/Alex text mp4s/alex taxt 7.mp4');
        this.load.video('alex8', '/audio/Alex text mp4s/alex taxt 8.mp4');
    };
    create() {
        console.log('start game')
        this.scene.start('Select');
    };
    //{ level: 1, newGame: true, levels: this.levels }
};