class levelOneScene extends Phaser.Scene {
    constructor() {
        super("level1");

    }

    init(data) {

        //launch instead of start. start will tell phaser to shutdown the current scene. where launch will have it working in parallel

        // this allows a static tracking
        

        console.log(data)
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = true;
        this.scene.launch('Ui');
        this.score = 0
        this.loadingLevel = false;

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
        
        this.addCollisions() ; 
    
        this.createAnimations();
        this.createInput();
        // this.createSound();
        this.createPortal();
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
        
    }
    update () {
            this.player.update(this.cursors);

    }
    
    createPlayer() {

      // this.player = new Player(this,500, 100);
      //   this.player.setScale(2)
      //   this.name = "Tam"
      this.map.findObject('Player_Spawn_S', (obj) => {
        if (this._NEWGAME && this._LEVEL === 1) {
          if (obj.type === 'StartingPosition'){
            this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
          }
        } else {
          this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
        }
      });
        
    };

    createPortal() {

      this.map.findObject('SW1_Portal_1', (obj) => {
        
          this.portal = new Portal(this, obj.x, obj.y);
      });
      this.map.findObject('SE2_Portal_1', (obj) => {
        
        this.portal = new Portal(this, obj.x, obj.y);
    });

    this.map.findObject('SE2_Portal_2', (obj) => {
        
      this.portal = new Portal(this, obj.x, obj.y);
  });
      // this.map.findObject('Portal', (obj) => {
      //   if (this._LEVEL === 1) {
      //     this.portal = new Portal(this, obj.x , obj.y - 68);
      //   } else if (this._LEVEL === 2) {
      //     this.portal = new Portal(this, obj.x, obj.y);
      //   }
      // });
      
      // this.map.findObject('SW1 Portal Entrance ', (obj) => {
        
      //   this.portal = new Portal(this, obj.x, obj.y - 68);
      // });
      // this.map.findObject('SW1 Portal Entrance to floor 2', (obj) => {
      //   this.portal2 = new Portal(this, obj.x, obj.y + 168);
        
      // });
      // this.backpack = this.physics.add.image(1100, 300, 'backpack')
      // this.physics.add.overlap(this.player, this.backpack, function() {console.log('overlap'); });

      //my portal code
      // this.portal2 = this.physics.add.image(1500, 100, 'portalicon')

      this.physics.add.overlap(this.player, this.portal, function() {console.log('overlap'); });
     
      }
      useCharacter(data) {
        
        // this.selectedCharacter = 'health'
        // console.log(this.selectedCharacter)
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
    createAudio() {
        this.goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
    }

    addCollisions() {
        //check collision wall to player
        // this.physics.add.collider(this.player, this.map.wallLayer);
    
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        
        
        // this.physics.add.overlap(this.player, this.ball, function() {console.log('overlap'); });
        // this.physics.add.collider(this.player,  this.wallLayer);
        
        
        // this.physics.add.collider(this.player, this.blockedLayer);
        
    }
    
    createAnimations() {

        this.player2 = this.add.sprite('playerLeft')
        this.player3 = this.add.sprite('playerRight')
        this.player4 = this.add.sprite('playerUp')
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('playerLeft', {
            frames: [1,2,3]
          }),
          frameRate: 10,
          repeat: -1
        });
    
        // animation with key 'right'
        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('playerRight', {
            frames: [1,3]
          }),
          frameRate: 10,
          repeat: -1
        });
    
        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('playerUp', {
            frames: [1,2,3]
          }),
          frameRate: 10,
          repeat: -1
        });
    
        this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('player', {
            frames: [1, 2, 3]
          }),
          frameRate: 1,
          repeat: -1
        });
      }
    createMap() {
        
        
       
        //create tile map
        this.add.tileSprite(0, 0, 8000, 8000, 'RPGpack_sheet', 31);
    // create the tilemap
    this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
 
        // this.map = this.make.tilemap({key: 'level1'});
       // add tileset image . use the tileset name, key of the image, etc
        //tileset png
        // this.tiles = this.map.addTilesetImage("main tileset", 'tileset1', 32, 32, 0, 0);
        this.tiles = this.map.addTilesetImage("RPGpack_sheet", 'RPGpack_sheet', 64, 64, 0, 0);
        
        this.backgroundLayer = this.map.createStaticLayer('Floor', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Walls, Stairs, Tables', this.tiles, 0, 0);
        // this.blockedLayer.setCollisionByExclusion([-1]);
        //create background layer
        // this.backgroundLayer = this.map.createStaticLayer("SW1 Floor", this.tiles, 0,0);
        // this.backgroundLayer.setScale(0.5);

        //setbounds of the world
        // this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //create wall layer
        // this.wallLayer = this.map.createStaticLayer('SW1 Walls and Tables', this.tiles, 0, 0);
        
        // this.wallLayer.setCollisionByProperty({collides: true});
        // this.wallLayer.setCollision([2], true);
        
        
        // this.wallLayer.setScale(2);
    // TODO test later
    //this.wallLayer.setCollisionByExclusion([-1]);

        //limit camera view
        // this.cameras.main.setBounds(0,0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)

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
        this.ball.setScale(0.5);
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


loadNextLevel () {

  // this.scene.restart({level: 'leveltwo', levels: this._LEVELS, newGame: false});
    if (!this.loadingLevel) {
      this.cameras.main.fade(500, 0, 0, 0);
      this.cameras.main.on( 'camerafadeoutcomplete', () => {
        if (this._LEVEL === 1) {
        this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
      } else if (this._LEVEL === 2) {
        this.scene.restart({level: 1, levels: this._LEVELS, newGame: false});
      }
    });
    this.loadingLevel = true;
    }
  }

    
};
