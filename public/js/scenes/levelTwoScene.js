class levelTwoScene extends Phaser.Scene {
    constructor() {
        super("leveltwo");
        

    }

    init(data) {

        //launch instead of start. start will tell phaser to shutdown the current scene. where launch will have it working in parallel

        // this allows a static tracking
        this.scene.launch('Ui');
        this.score = 0

        
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;

        this.selectedCharacter = data.selectedCharacter || 0;
        console.log(data)


    }
    
    create() {
        
        this.anims.create({
            key: 'LEFT',
            frames: this.anims.generateFrameNumbers(this.useCharacter([this.selectedCharacter]), {
              start:3 ,end: 5
            }),
            frameRate: 10,
            repeat: 1
          });
          this.anims.create({
            key: 'RIGHT',
            frames: this.anims.generateFrameNumbers(this.useCharacter([this.selectedCharacter]), {
              start:6 ,end: 8
            }),
            frameRate: 10,
            repeat: 1
          });
      
          this.anims.create({
            key: 'UP',
            frames: this.anims.generateFrameNumbers(this.useCharacter([this.selectedCharacter]), {
              start:9 ,end: 11
            }),
            frameRate: 10,
            repeat: 1
          });
      
          this.anims.create({
            key: 'DOWN',
            frames: this.anims.generateFrameNumbers(this.useCharacter([this.selectedCharacter]), {
              start:0 ,end: 2
            }),
            frameRate: 10,
            repeat: 1
          });
        //make the map
        
        
        this.createMap();
        
        
        this.createAudio();
        
        this.createChests();
        // this.chest = new Chest(this, 200, 290, 'items', 0);
        // this.createWalls ();
        this.createObject();
        this.createPlayer();
         // physics
        //this.physics.add.collider(this.player, this.wall); this will make the object move and run away from the point of contact. and disappear. 
        //  this.wall.setImmovable(); this will prevent the object from moving at all.
        this.addCollisions() ; 
    
        
        this.createInput();
        // this.createSound();
        this.createPortal();
        // this.loadNextMap();
        this.portal.body.onOverlap = true;
        this.physics.add.overlap(this.player, this.portal, function() {console.log('overlap') });
        this.physics.add.overlap(this.player, this.portal, this.loadNextMap.bind(this));
    }
    update () {
            this.player.update(this.cursors);

    }
    createAudio() {
        this.goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
    }

    addCollisions() {
        //check collision wall to player
        // this.physics.add.collider(this.player, this.map.wallLayer);
    
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        
        this.physics.add.overlap(this.player, this.ball, function() {console.log('overlap'); });
        
        
        this.physics.add.collider(this.player,this.wallLayer);
        
        
    }
    useCharacter(data) {
        //  const character = {0:'health',1: 'business', 2: 'computer', 3: 'engineer'}
        // this.selectedCharacter = 'health'
        console.log(this.selectedCharacter)
        if (this.selectedCharacter === 0) {
           return this.selectedCharacter = 'health';
        }else if (this.selectedCharacter === 1) {
            return this.selectedCharacter = 'business';
        }else if (this.selectedCharacter === 2) {
            return  this.selectedCharacter = 'computer';
        }else if (this.selectedCharacter === 3) {
        return this.selectedCharacter = 'engineer';
        }
        return this.selectedCharacter;
    }
    createPlayer() {
        // this.map.findObject('player', (obj) => {

        // })
        
        console.log(this.useCharacter([this.selectedCharacter]));
        // this.player = new Player(this,500, 100, this.useCharacter([this.selectedCharacter]));
       
        this.map.findObject('player', (obj) => {
            this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
        })
        this.player.setScale(2)
        this.name = "Tam"
        this.currentDirection = Direction.RIGHT;
        this.playerAttacking = false;
        this.flipX = true;
        this.swordHit = false;

        //weapon
        this.weapon = this.physics.add.image(32, 32, 'weapon1');
        
        this.weapon.setScale(1.5);
        
       
        this.weapon.alpha = 0;
    }

    createPortal() {
    // this.map.findObject('SW1 Floor 2 Entrance and Exit', (obj) => {
    //     this.portal = new Portal(this, obj.x , obj.y)
    //     console.log(this.portal)
    // })

    this.portal = this.physics.add.image(1500, 1000, 'portalicon')
    this.portal.setScale(0.5);
}
    
    createMap() {
        
        //create tile map
    //    this.map = new Map(this, 'map3', 'BCITA-tileset', 'background','Floor', 'wall');
        //create tile map
        this.map = this.make.tilemap({key:'level2'});
       // add tileset image . use the tileset name, key of the image, etc

        this.tiles = this.map.addTilesetImage("main tileset", 'tileset1', 32, 32, 0, 0);
        
        //create background layer
        this.backgroundLayer = this.map.createStaticLayer("SW1 Floor 2", this.tiles, 0,0);
        // this.backgroundLayer.setScale(2);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.wallLayer = this.map.createStaticLayer('SW1 Floor 2 Walls and Tables', this.tiles, 0, 0);
        
        this.wallLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollision([2], true);
        // this.stairs = this.map.createStaticLayer('Items/Objects', this.tiles, 0, 0);
        
        // this.wallLayer.setScale(2);
    
        // this.physics.add.collider(this.player, this.wallLayer);

        // this.physics.world.bounds.width = this.map.widthInPixels * 2;
        // this.physics.world.bounds.height = this.map.heightInPixels * 2;

        //limit camera view
        this.cameras.main.setBounds(0,0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)

    }
    createChests() {
        this.chests = this.physics.add.group();
        this.chestPositions = [[100, 100], [200,200], [300, 300], [400,400], [500, 500]];
       //specify the max number of chest we can have
       this.maxNumberChests = 4
       for (let i =0; i <this.maxNumberChests; i+=1){
           this.spawnChest();
       }
       
        // this.pokemon = this.physics.add.sprite(400, 300, 'pokemon', 0);
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

    createObject() {
        this.ball = this.physics.add.image(400, 300, 'basketball')
        this.ball.setScale(1);
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    
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
    createSound() {
        this.bgMusic = this.sound.add('bgMusic', {volume: 0.5});
        this.bgMusic.play();
    }
    
    //loadNextLevel () {}

    loadNextMap() {
        // this.input.once('pointerdown', function () {

        //     this.scene.switch('Game');

        // }, this);
        this.scene.start('Game',{level: 1, levels: this._LEVELS, newGame: false});
    }
};