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
        if (this._LEVEL === 3) {
        this.createChests();
        }
        // this.chest = new Chest(this, 200, 290, 'items', 0);
        // this.createWalls ();
        // this.createObject();
        this.createPlayer();
         // physics
        
        this.addCollisions() ; 
    
        this.createAnimations();
        this.createInput();
        const musicConfig = {
          mute: false,
          volume: 1,
          loop: true,
          delay:0,
          rate: 1,
        }
          this.bgMusic = this.sound.add('bgMusic2', musicConfig);
          this.physics.add.overlap(this.player, this.portal, this.bgMusic.stop());
        // this.createSound();
        
        this.createPortal();
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
        // this.physics.add.overlap(this.player, this.portal3, this.loadNextLevel2.bind(this));
        //video test
        

      //   pointerover(){
      //     this.setAlpha(1)
      // }
  
      // pointerout() {
      //     console.log(this);
      //     this.setAlpha(0.4)
      // }
      this.physics.add.overlap(this.player, this.bus, this.loadNextLevel.bind(this));
      const video = this.add.image(500,1200, 'quest').setInteractive();
      video.setScale(2)
      video.on('pointerdown', this.pointerdown.bind(this));
      this.movie = this.add.video(800, 1300, 'testvideo');
      this.movie.setScale(0.5);
      this.movie.setVisible(false);
      video.on('pointerout', this.pointerout.bind(this));
      this.quest = this.add.text(700, 1200, 'Click To See Quest', { font: '"Press to See Quest"' });
      this.quest.setScale(4)
      this.createBus();
      
    }
    update () {
            this.player.update(this.cursors);
          //   if(game.input.keyboard.isDown(Phaser.Keyboard.space)) {
          //  this.bgMusic.stop();
          //   }

    }
  
    createBus() {
      this.map.findObject('Bus Stop', (obj) => {
        
        this.bus = this.physics.add.image(obj.x, obj.y, 'busstop')
        
    });
      
    }
    createPlayer() {

      // this.player = new Player(this,500, 100);
      //   this.player.setScale(2)
      //   this.name = "Tam"
      if (this._LEVEL === 1) {
      this.map.findObject('Player Spawn', (obj) => {
        this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
      });
    } if (this._LEVEL === 2) {
      this.map.findObject('Player Spawn2', (obj) => {
        this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
      });
    }
      // this.map.findObject('Player Spawn', (obj) => {
      //   if (this._NEWGAME && this._LEVEL === 1) {
      //     if (obj.type === 'StartingPosition'){
      //       this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
      //     }
      //   } else {
      //     this.player = new Player(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
      //   }
      // });
        
    };

    createPortal() {

      this.map.findObject('Portal Entrances SW1', (obj) => {
        
        this.portal = new Portal(this, obj.x, obj.y);
    });

      this.map.findObject('SW1 Portal Entrance', (obj) => {
        
          this.portal2 = new Portal(this, obj.x, obj.y);
      });
      this.map.findObject('SW1 Portal Entrance to floor 2', (obj) => {
        
        this.portal3 = new Portal(this, obj.x, obj.y);
    });

    this.map.findObject('SW1 Portal Exit', (obj) => {
        
      this.portal4 = new Portal(this, obj.x, obj.y);
  });

  this.map.findObject('SW1 Floor 2 Entrance and Exit', (obj) => {
        
    this.portal5 = new Portal(this, obj.x, obj.y);
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
        this.physics.add.collider(this.player,this.wallLayer);
        
        this.physics.add.collider(this.player,this.bus);
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
        
        
       
       
    // create the tilemap
    // this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
 
        this.map = this.make.tilemap({key: 'busstop'});
        
       // add tileset image . use the tileset name, key of the image, etc
       this.tiles = this.map.addTilesetImage("main tileset", 'tileset1', 32, 32, 0, 0);
        
       //create background layer
       this.backgroundLayer = this.map.createStaticLayer("Floor", this.tiles, 0,0);
       // this.backgroundLayer.setScale(2);

       this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
       this.wallLayer = this.map.createStaticLayer('Walls and Tables', this.tiles, 0, 0);
       
       this.wallLayer.setCollisionByProperty({collides: true});
      //  this.wallLayer.setCollision([2], true);
      //  this.decor = this.map.createStaticLayer('Decoration', this.tiles, 0, 0);

        
        //create background layer
        // this.backgroundLayer = this.map.createStaticLayer("SW1 Floor", this.tiles, 0,0);
        // this.backgroundLayer.setScale(0.5);

        //setbounds of the world
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //create wall layer
        // this.wallLayer = this.map.createStaticLayer('SW1 Walls and Tables', this.tiles, 0, 0);
        
        // this.wallLayer.setCollisionByProperty({collides: true});
        // this.wallLayer.setCollision([2], true);
        
        
        // this.wallLayer.setScale(2);
    // TODO test later
    //this.wallLayer.setCollisionByExclusion([-1]);

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
      
        this.bgMusic.play();
        
    }
    stopSound() {
      
      this.bgMusic.destroy();
      
  }

loadNextLevel () {

  // this.scene.start({level: 'leveltwo', levels: this._LEVELS, newGame: false});
    if (!this.loadingLevel) {
      this.cameras.main.fade(500, 0, 0, 0);
      this.cameras.main.on( 'camerafadeoutcomplete', () => {
        if (this._LEVEL === 1) {
        this.scene.start('leveltwo',{level: 2, levels: this._LEVELS, newGame: false});
      } else if (this._LEVEL === 2) {
        this.scene.start({level: 1, levels: this._LEVELS, newGame: false});
      }
    });
    this.loadingLevel = true;
    }
  }

  // loadNextLevel2 () {

  //   // this.scene.restart({level: 'leveltwo', levels: this._LEVELS, newGame: false});
  //     if (!this.loadingLevel) {
  //       this.cameras.main.fade(500, 0, 0, 0);
  //       this.cameras.main.on( 'camerafadeoutcomplete', () => {
  //         if (this._LEVEL === 2) {
  //         this.scene.restart({level: 3, levels: this._LEVELS, newGame: false});
  //       } else if (this._LEVEL === 3) {
  //         this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
  //       }
  //     });
  //     this.loadingLevel = true;
  //     }
  //   }

    pointerdown() {
      
      this.movie = this.add.video(800, 1300, 'testvideo');
      this.movie.setScale(0.5);
      let x = true;
      this.movie.play(x);

    }
    pointerout(video) {
      console.log("move out")

      this.movie.setVisible(false);
  }
    
};
