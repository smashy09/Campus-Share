class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {

        //launch instead of start. start will tell phaser to shutdown the current scene. where launch will have it working in parallel

        // this allows a static tracking
        this.scene.launch('Ui');
        this.score = 0
    }
    
    create() {
        
        //make the map
        this.createMap();
        
        console.log(this.cache.tilemap.get('map4').data);
        this.createAudio();
        
        this.createChests();
        // this.chest = new Chest(this, 200, 290, 'items', 0);
        this.createWalls ();
        
        this.createPlayer();
         // physics
        //this.physics.add.collider(this.player, this.wall); this will make the object move and run away from the point of contact. and disappear. 
        //  this.wall.setImmovable(); this will prevent the object from moving at all.
        this.addCollisions() ; 
    
        this.createInput();
    }
    update () {
            this.player.update(this.cursors);

    }
    createAudio() {
        this.goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
    }

    createPlayer() {
        this.player = new Player(this,32, 32, 'characters', 2);
    }

    createMap() {
        // this.map = this.add.image(1000,600, 'background3');
        //create tile map
        this.map = this.make.tilemap({key: 'map4'});
       // add tileset image
        this.tiles = this.map.addTilesetImage("bglevel", 'background2', 32, 32, 1, 2);

        //create background layer
        this.backgroundLayer = this.map.createStaticLayer("bglevel", this.tiles, 0,0);
        this.physics.world.bounds.width = this.map.widthInPixeles * 2;
        this.physics.world.bounds.height = this.map.heightInPixeles * 2;

        //limit camera view
        this.cameras.main.setBounds(0,0, this.map.widthInPixles * 2, this.map.heightInPixles * 2)

        // this.blockedLayer = this.map.createStaticLayer('blocked', this.tiles, 0, 0)
        

    }
    createChests() {
        this.chests = this.physics.add.group();
        this.chestPositions = [[100, 100], [200,200], [300, 300], [400,400], [500, 500]];
       //specify the max number of chest we can have
       this.maxNumberChests = 4
       for (let i =0; i <this.maxNumberChests; i+=1){
           this.spawnChest();
       }
       
        this.pokemon = this.physics.add.sprite(400, 300, 'pokemon', 0);
    }
    spawnChest(){
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];

        let chest = this.chests.getFirstDead();
        
        if (!chest) {
            const chest = new Chest(this,location[0], location[1], 'items', 0);
            this.chests.add(chest);
        } else {
            chest.setPosition(location[0], location[1]);
            chest.makeActive();
        }
        

        
        // add chest to chestgroup
        
    }
    createWalls () {
        
        // this.wall = this.physics.add.image(500, 100, 'button1');
        
        this.wall = this.physics.add.image(300, 200, 'button1')
        this.wall.setImmovable();
        this.wall2 = this.physics.add.image(500, 200, 'button1')
        this.wall2.setImmovable();
    }

  

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }

    addCollisions() {
        this.physics.add.collider(this.player, [this.wall,this.wall2]);
    
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        
        this.physics.add.overlap(this.player, this.pokemon, function() {console.log('overlap'); });
    }
    collectChest(player, chest) {
            // play gold pickup sound
        this.goldPickAudio.play(); 

        this.score += chest.coins;
            //update score in the ui
        this.events.emit('updateScore', this.score);

            //destroy the chest game object
        chest.makeInactive();
        //spawn chest
        this.time.delayedCall(2000, this.spawnChest, [], this);
    }
}

