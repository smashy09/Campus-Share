class levelTwelveScene extends Phaser.Scene {
    constructor() {
        super("leveltwelve");
        

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
      this.createGroups();
      this.createNPC();
      const musicConfig = {
        mute: false,
        volume: 1,
        loop: true,
        delay:0,
        rate: 1,
      }
        this.bgMusic = this.sound.add('bgMusic5', musicConfig);
        // this.physics.add.overlap(this.player, this.portal, this.bgMusic.stop());
      this.createSound();
      // this.spawnMonster();
      this.createPortal();
      this.physics.add.overlap(this.player, this.portal2, this.loadPrevMap.bind(this));
      
      this.physics.add.overlap(this.player, this.portal, this.loadPrevMap.bind(this));
     
    // this.movie.setVisible(false);
    
    // this.quest = this.add.text(700, 1200, 'Go To Bus STOP', { font: '"Press to See Quest"' });
    // this.quest.setScale(4)
   
    // this.collider = this.physics.add.collider(this.player, this.bus, () => this.events.emit('flag'))
    // this.events.once('flag', this.createQuest.bind(this) )
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.volumeButton();
    this.volume.on('pointerdown', this.pointerdown.bind(this)
       );
  }
  update () {
    this.player.update(this.cursors);
         // if (this.keyQ.isDown) {
    //   this.movie.destroy();
    //   this.quest2.destroy();
    //       }
        
        
        
  }
  volumeButton() {
    this.volume = this.add.image(1950, 1050, 'volume').setInteractive();
}
pointerdown() {
  console.log('you click')
 
  this.bgMusic.mute = !this.bgMusic.mute
}
createLaptop() {
  this.map.findObject('key item dumbell', (obj) => {
    
    this.weights = this.physics.add.image(obj.x, obj.y, 'weights');
    this.weights.setImmovable();
});
this.physics.add.overlap(this.player, this.laptop, this.createQuest.bind(this));
this.quest = this.add.text(1600, 100, 'FIND THE BASKETBALL', { font: '"Press to See Quest"' });
   this.quest.setScale(4);
   this.timedEvent = this.time.addEvent({
    delay: 4000,
    callback: this.delquest,
    callbackScope: this,
    loop: false
  });
}
delquest() {
  this.quest.destroy();
  this.map.findObject('key item basketball', (obj) => {
    
    this.basketball = this.physics.add.image(obj.x, obj.y, 'basketball');
    this.basketball.setImmovable();
});
}

  createQuest() {
    this.movie = this.add.video(800, 600, 'intro');
    this.movie.setScale(0.5);
  }  
  createNPC() {
    this.map.findObject('Alex', (obj) => {
    
        this.npc = this.physics.add.image(obj.x, obj.y, 'Alex').setInteractive();
        this.npc.setScale(2);
        this.npc.setImmovable();
        
    });
    this.map.findObject('Student Services', (obj) => {
    
      this.npc2 = this.physics.add.image(obj.x, obj.y, 'SS4').setInteractive();
      this.npc2.setScale(2);
      this.npc2.setImmovable();
      
  });
  this.map.findObject('Cafeteria cashier', (obj) => {
    
    this.npc3 = this.physics.add.image(obj.x, obj.y, 'Cashierfood').setInteractive();
    this.npc3.setScale(2);
    this.npc3.setImmovable();
    
});
this.map.findObject('Coffee cashier', (obj) => {
    
  this.npc4 = this.physics.add.image(obj.x, obj.y, 'CoffeeNpc').setInteractive();
  this.npc4.setScale(2);
  this.npc4.setImmovable();
  
});
this.map.findObject('Hoodie Cashier', (obj) => {
    
  this.npc5 = this.physics.add.image(obj.x, obj.y, 'Hoodnpc').setInteractive();
  this.npc5.setScale(2);
  this.npc5.setImmovable();
  
});
}
  createGroups() {
    this.monsters = this.physics.add.group();
  this.monsters.runChildUpdate = true;
  }
  createPlayer() {
    

    this.map.findObject('Player Spawn', (obj) => {
      // this.player = new PlayerContainer(this, obj.x, obj.y,'health' );
      this.player = new PlayerContainer(this, obj.x, obj.y,this.useCharacter([this.selectedCharacter]) );
      this.player.setInteractive(); 
    //   this.container = this.add.container(0, 0)
    //  this.container.setSize(32, 32);
    //   this.container.add(this.player);
    //   this.container.setInteractive();
    //   this.container.add(this.weapon);
      console.log('add the pencil')
      
    })
  
  
  // this.weapon = this.physics.add.image(100, 400, 'pencil2');
  //   console.log(this.weapon);
  //   this.weapon.setScale(1);
  //   this.weapon.setSize(16, 16);
 
   
    
  //     this.attacking = false;
  };
  onMeetEnemy(player, enemy) {
    if (this.attacking) {
      const location = this.getValidLocation();
      enemy.x = location.x;
      enemy.y = location.y;
    }
  }
  createPortal() {

    this.map.findObject('Se2 Portal Entrance', (obj) => {
        
      this.portal = this.physics.add.image(obj.x, obj.y, 'portal2')
  });
  this.map.findObject('Se2 Side portal', (obj) => {
    
    this.portal2 = this.physics.add.image(obj.x, obj.y, 'portal2')
});

   
}
spawnMonster() {
  this.spawns = this.physics.add.group({
    classType: Phaser.GameObjects.Sprite
  });
  this.map.findObject('MOB Crow', (obj) => {
    console.log('caw caw')
    var enemy = this.physics.add.image(obj.x, obj.y, 'crow');
  enemy.body.setCollideWorldBounds(true);
  // enemy.body.setImmovable();
  // this.timedEvent = this.time.addEvent({
  //   delay: 3000,
  //   callback: this.moveEnemies,
  //   callbackScope: this,
  //   loop: true
  // });
  });
}
// moveEnemies () {
//   this.spawns.getChildren().forEach((enemy) => {
//     const randNumber = Math.floor((Math.random() * 4) + 1);

//     switch(randNumber) {
//       case 1:
//         enemy.body.setVelocityX(50);
//         break;
//       case 2:
//         enemy.body.setVelocityX(-50);
//         break;
//       case 3:
//         enemy.body.setVelocityY(50);
//         break;
//       case 4:
//         enemy.body.setVelocityY(50);
//         break;
//       default:
//         enemy.body.setVelocityX(50);
//     }
//   });

//   setTimeout(() => {
//     this.spawns.setVelocityX(0);
//     this.spawns.setVelocityY(0);
//   }, 500);
// }
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

      this.map = this.make.tilemap({key: 'REC'});
      
     // add tileset image . use the tileset name, key of the image, etc
     this.tiles = this.map.addTilesetImage("main tileset", 'tileset1', 32, 32, 0, 0);
      
     //create background layer
     this.backgroundLayer = this.map.createStaticLayer("Floor", this.tiles, 0,0);
     // this.backgroundLayer.setScale(2);

     this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
     this.wallLayer = this.map.createStaticLayer('Collisions', this.tiles, 0, 0);
     
     this.decor = this.map.createStaticLayer('Table decoration/objects no collision', this.tiles, 0, 0);
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


    // loadNextMap() {
        
    //     // this.scene.start('levelThree',{level: 3, levels: this._LEVELS, newGame: false});
    //     // this.loadingLevel = true;

    //     if (!this.loadingLevel) {
    //         this.cameras.main.fade(500, 0, 0, 0);
    //         this.cameras.main.on( 'camerafadeoutcomplete', () => {
    //           if (this._LEVEL === 5) {
      // this.bgMusic.destroy();
    //           this.scene.start('levelfour',{level: 4, levels: this._LEVELS, newGame: false});
    //         } 
    //       });
    //       this.loadingLevel = true;
    //       }
        
    // }
    loadPrevMap () {

    // this.scene.restart({level: 'leveltwo', levels: this._LEVELS, newGame: false});
      if (!this.loadingLevel) {
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on( 'camerafadeoutcomplete', () => {
          if (this._LEVEL === 5) {
            this.bgMusic.destroy();
          this.scene.start('levelfour', {level: 4, levels: this._LEVELS, newGame: false});
        } 
      });
      this.loadingLevel = true;
      }
    }
};