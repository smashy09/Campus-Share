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
        this.score = data.score;
        this.loadingLevel = false;
        
        
         // get a reference to our socket
    // this.socket = this.sys.game.globals.socket;

    // listen for socket event
    // this.listenForSocketEvents();

        this.selectedCharacter = data.selectedCharacter || 0;
        console.log(data)

    }
    // listenForSocketEvents() {
    //   // spawn player game objects
    //   this.socket.on('currentPlayers', (players) => {
    //     Object.keys(players).forEach((id) => {
    //       if (players[id].id === this.socket.id) {
    //         this.createPlayer(players[id], true);
    //         this.addCollisions();
    //       } else {
    //         this.createPlayer(players[id], false);
    //       }
    //     });
    //   });
    // }
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
        
        // this.createChests();
        
        // this.chest = new Chest(this, 200, 290, 'items', 0);
        // this.createWalls ();
        // this.createObject();
        this.createPlayer();
         // physics
        
        this.addCollisions() ; 
    
        this.createAnimations();
        this.createInput();
        this.spawns = this.physics.add.group();
        const musicConfig = {
          mute: false,
          volume: 1,
          loop: true,
          delay:0,
          rate: 1,
        }
          this.bgMusic = this.sound.add('bgMusic2', musicConfig);
          
        this.createSound();
        this.spawnMonster();
        this.spawnMonster();
        this.spawnMonster();
       
        this.timedEvent = this.time.addEvent({
          delay: 3000,
          callback: this.moveEnemies,
          callbackScope: this,
          loop: true
        });
        this.createPortal();
        this.volumeButton();
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));

        this.physics.add.overlap(this.player.weapon, this.crow, this.killenemy, false, this);
    this.physics.add.collider(this.player, this.crow);
        // this.physics.add.overlap(this.player, this.portal3, this.loadNextLevel2.bind(this));
       
      // this.movie.setVisible(false);
      
      
      this.quest = this.add.text(700, 1200, 'Go To Bus STOP', { font: '"Press to See Quest"' });
      this.quest.setScale(4)
      this.createBus();
      this.collider = this.physics.add.collider(this.player, this.bus, () => this.events.emit('flag'))
      this.events.once('flag', this.createQuest.bind(this) )
       this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

       this.volume.on('pointerdown', this.pointerdown.bind(this)
       );

      
        console.log(this.crow);
        console.log(this.player.weapon);
        this.physics.add.overlap(this.player.weapon, this.crow, function() { console.log('wassup')})
        // this.physics.add.overlap(this.player, this.crow, this.respond());
        // this.physics.add.overlap(this.player, this.crow, function() {console.log('overlap'); });
        this.registry.set('player', this.player);
        console.log(this.player);
       
    }
    update () {
      this.player.update(this.cursors);
            if (this.keyQ.isDown) {
              this.movie.destroy();
              this.quest2.destroy();
            }
          
          
          
    }
respond() {
  console.log('you got this');
}
    volumeButton() {
      this.volume = this.add.image(50, 1150, 'volume').setInteractive();
  }
  pointerdown() {
    console.log('you click')
   
    this.bgMusic.mute = !this.bgMusic.mute
  }
    createBus() {
      this.map.findObject('Bus Stop', (obj) => {
        
        this.bus = this.physics.add.image(obj.x, obj.y, 'busstop');
        this.bus.setImmovable();
    });
    
    }
    createQuest() {
      this.movie = this.add.video(800, 600, 'intro');
      this.movie.setScale(0.5);
      this.quest2 = this.add.text(700, 400, 'PRESS Q TO CLOSE', { font: '"Press to See Quest"' });
      this.quest2.setScale(4)
    }  
    
    createPlayer() {
      
  
      if (this._LEVEL === 1) {
      this.map.findObject('Player Spawn', (obj) => {
        // this.player = new PlayerContainer(this, obj.x, obj.y,'health' );
        this.player = new PlayerContainer(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
        this.player.setInteractive(); 
        
        // this.physics.world.enable(this.player.weapon);
        console.log(this.player.weapon);
      
      })
    
    }
  
    };
    
    createPortal() {

      this.map.findObject('Portal Entrances SW1', (obj) => {
        
        this.portal = new Portal(this, obj.x, obj.y);
    });
      
     
  }
  spawnMonster() {
    
    this.map.findObject('Mob Crow', (obj) => {
      
      this.crow = this.spawns.create(obj.x, obj.y, 'crow');
      this.crow.setInteractive();
    this.crow.body.setCollideWorldBounds(true);
    this.crow.body.setImmovable();
    
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.moveEnemies,
      callbackScope: this,
      loop: true
    });
    });
  }
  moveEnemies () {
    
    this.spawns.getChildren().forEach((enemy) => {
      const randNumber = Math.floor((Math.random() * 4) + 1);

      switch(randNumber) {
        case 1:
          enemy.body.setVelocityX(50);
          break;
        case 2:
          enemy.body.setVelocityX(-50);
          break;
        case 3:
          enemy.body.setVelocityY(50);
          break;
        case 4:
          enemy.body.setVelocityY(50);
          break;
        default:
          enemy.body.setVelocityX(50);
      }
    });

  
  }
      useCharacter(data) {
        
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
    createSfx(){
    this.playerHitAudio = this.sound.add('playerhit', {loop: false, volume: 0.2});
    }
  
    killenemy(crow) {
      console.log('being hit');
    this.createSfx();
    this.crow.destroy();
        //spawn chest
        this.time.delayedCall(2000, this.spawnMonster(), [], this);
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

        

        //limit camera view
        this.cameras.main.setBounds(0,0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)

    }
    createChests() {
        this.chests = this.physics.add.group();
        this.chestPositions = [[100, 800], [200,700], [300, 600], [400,500], [500, 1000]];
       //specify the max number of chest we can have
       this.maxNumberChests = 4
       for (let i =0; i <this.maxNumberChests; i+=1){
           this.spawnChest();
       }
       
        
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

    // createWalls () {
        
    //     // this.wall = this.physics.add.image(500, 100, 'button1');
        
    //     this.wall = this.physics.add.image(300, 200, 'button1')
    //     this.wall.setImmovable();
    //     this.wall2 = this.physics.add.image(500, 200, 'button1')
    //     this.wall2.setImmovable();
    // }

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
          this.bgMusic.destroy();
          this.score = parseInt(localStorage.getItem('score')) || 0;
        this.scene.start('leveltwo',{level: 2, levels: this._LEVELS, newGame: false, score: this.score});
      } 
    });
    this.loadingLevel = true;
    }
  }

    
};
