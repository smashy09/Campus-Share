class levelFourScene extends Phaser.Scene {
    constructor() {
        super("levelfour");
        

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
      if (this._LEVEL === 3) {
      this.createChests();
      }
      // this.chest = new Chest(this, 200, 290, 'items', 0);
      // this.createWalls ();
      // this.createObject();
      this.createPlayer();
       // physics
      
      this.addCollisions() ; 
      this.createNpc();
      this.createQuest();
      this.createAnimations();
      this.createInput();
      
      const musicConfig = {
        mute: false,
        volume: 0.25,
        loop: true,
        delay:0,
        rate: 1,
      }
        this.bgMusic = this.sound.add('bgMusic', musicConfig);
        // this.physics.add.overlap(this.player, this.portal, this.bgMusic.stop());
      this.createSound();
      this.spawns = this.physics.add.group();
      this.spawnMonster();
      this.spawnMonster2();
    this.spawnMonster3();
    this.spawnMonster4();
    this.spawnMonster5();

    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.moveEnemies,
      callbackScope: this,
      loop: true
    });
      this.createPortal();
      this.physics.add.overlap(this.player, this.portal2, this.loadNextMap.bind(this));
      this.physics.add.overlap(this.player, this.portal3, this.loadNextMap.bind(this));
      this.physics.add.overlap(this.player, this.portal, this.loadPrevMap.bind(this));
     
      this.physics.add.overlap(this.player.weapon, this.crow, this.killenemy, false, this);
      this.physics.add.overlap(this.player.weapon, this.crow2, this.killenemy2, false, this);
      this.physics.add.overlap(this.player.weapon, this.crow3, this.killenemy3, false, this);
      this.physics.add.overlap(this.player.weapon, this.crow4, this.killenemy4, false, this);
      this.physics.add.overlap(this.player.weapon, this.crow5, this.killenemy5, false, this);
    
    
    this.volumeButton();
    this.collider = this.physics.add.collider(this.player, this.josh, () => this.events.emit('flag'))
    this.events.once('flag', this.createQuest2.bind(this) )
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.volume.on('pointerdown', this.pointerdown.bind(this)
       );

       

  }
  update () {
    this.player.update(this.cursors);
    if (this.keyQ.isDown) {
      this.movie3.destroy();
      this.questText.destroy();
      this.questText2.destroy();
          }
        //  this.bgMusic.stop();
        //   }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.attacking) {
        //   this.attacking = true;
        //   setTimeout(() => {
        //     this.attacking = false;
        //     this.weapon.angle = 0;
        //   }, 150);
        // }
  
        // if (this.attacking) {
        //   if (this.weapon.flipX) {
        //     this.weapon.angle -= 10;
        //   } else {
        //     this.weapon.angle += 10;
        //   }
        // }
        
  }

  volumeButton() {
    this.volume = this.add.image(1950, 1050, 'volume').setInteractive();
}
pointerdown() {
  console.log('you click')
 
  this.bgMusic.mute = !this.bgMusic.mute
}
  createNpc() {
    this.map.findObject(' NPC Josh Paulson', (obj) => {
      
      this.josh = this.physics.add.image(obj.x, obj.y, 'Josh');
      this.josh.setImmovable();
      this.josh.setScale(2);
  });
  
  }
  createSfx(){
    this.playerHitAudio = this.sound.add('playerhit', {loop: false, volume: 0.2});
    }

    
  killenemy() {
    console.log('being hit');
  this.createSfx();
  this.crow.destroy();
  
  this.crow3.destroy();
  this.crow4.destroy();
  this.crow5.destroy();
      //spawn chest
      this.time.delayedCall(2000, this.spawnMonster(), [], this);
      this.time.delayedCall(2000, this.spawnMonster2(), [], this);
      this.time.delayedCall(2000, this.spawnMonster3(), [], this);
      this.time.delayedCall(2000, this.spawnMonster4(), [], this);
      this.time.delayedCall(2000, this.spawnMonster5(), [], this);
  }
  createQuest() {
    this.map.findObject('Player_Spawn_SW1', (obj) => {
    this.movie = this.add.video(obj.x, obj.y, 'josh1');
    this.movie.setScale(0.5);
    this.movie.play();
    this.timedEvent = this.time.addEvent({
      delay: 6000,
      callback: this.endQuest1,
      callbackScope: this,
      loop: false
    });

    });
  }  

  endQuest1() {
    this.movie.destroy();
  }

  createQuest2() {
    this.map.findObject(' NPC Josh Paulson', (obj) => {
      this.movie2 = this.add.video(obj.x, obj.y, 'josh2');
      this.movie2.setScale(0.5);
      this.movie2.play();
      this.timedEvent = this.time.addEvent({
        delay: 4000,
        callback: this.createQuest3,
        callbackScope: this,
        loop: false
      });
    });
    //blank
  }
  createQuest3() {
    this.movie2.destroy();
    this.map.findObject(' NPC Josh Paulson', (obj) => {
      this.movie3 = this.add.video(obj.x, obj.y, 'josh3');
      this.movie3.setScale(0.5);
      this.movie3.play();
      this.questText = this.add.text(obj.x +100,obj.y - 100, 'PRESS Q TO CLOSE TEXT ', { font: '"Press to See Quest"' });
            this.questText.setScale(4);
            this.questText2 = this.add.text(obj.x +100,obj.y - 200, 'PRESS SPACE TO ATTACK CROW ', { font: '"Press to See Quest"' });
            this.questText2.setScale(4);
    })

  }

  createPlayer() {
    

    this.map.findObject('Player_Spawn_SW1', (obj) => {
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
  
  createPortal() {

    this.map.findObject('SW1 Portal Entrance ', (obj) => {
        
      this.portal = this.physics.add.image(obj.x, obj.y, 'portal2')
  });
  this.map.findObject('SE2 Portal Entrance', (obj) => {
    
    this.portal2 = this.physics.add.image(obj.x, obj.y, 'portal2')
});

this.map.findObject('SE2 Portal2', (obj) => {
    
  this.portal3 = this.physics.add.image(obj.x, obj.y, 'portal2')
});
    
   
}
spawnMonster5(){this.map.findObject('crow5', (obj) => {
  console.log('caw caw')
  this.crow5 = this.spawns.create(obj.x, obj.y, 'crow');
  this.crow5.body.setCollideWorldBounds(true);
  this.crow5.body.setImmovable();
this.timedEvent = this.time.addEvent({
  delay: 3000,
  callback: this.moveEnemies,
  callbackScope: this,
  loop: true
});
});
}
spawnMonster4(){this.map.findObject('crow4', (obj) => {
  console.log('caw caw')
  this.crow4 = this.spawns.create(obj.x, obj.y, 'crow');
  this.crow4.body.setCollideWorldBounds(true);
  this.crow4.body.setImmovable();
this.timedEvent = this.time.addEvent({
  delay: 3000,
  callback: this.moveEnemies,
  callbackScope: this,
  loop: true
});
});
}
spawnMonster3(){this.map.findObject('crow3', (obj) => {
  console.log('caw caw')
  this.crow3 = this.spawns.create(obj.x, obj.y, 'crow');
  this.crow3.body.setCollideWorldBounds(true);
  this.crow3.body.setImmovable();
this.timedEvent = this.time.addEvent({
  delay: 3000,
  callback: this.moveEnemies,
  callbackScope: this,
  loop: true
});
});
}
spawnMonster2(){this.map.findObject('crow2', (obj) => {
  console.log('caw caw')
  this.crow2 = this.spawns.create(obj.x, obj.y, 'crow');
  this.crow2.body.setCollideWorldBounds(true);
  this.crow2.body.setImmovable();
this.timedEvent = this.time.addEvent({
  delay: 3000,
  callback: this.moveEnemies,
  callbackScope: this,
  loop: true
});
});
}
spawnMonster() {
  
  this.map.findObject('MOB Crow', (obj) => {
    console.log('caw caw')
    this.crow = this.spawns.create(obj.x, obj.y, 'crow');
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
  this.time.delayedCall(500, () => {
    console.log('stop');
    
    this.spawns.setVelocity(0, 0);
  });

  this.spawns.getChildren().forEach((enemy) => {
    const randNumber = Math.floor((Math.random() * 4) + 1);

    switch (randNumber) {
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
  
    console.log('velocity', enemy.body.velocity.x, enemy.body.velocity.y);
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

      this.map = this.make.tilemap({key: 'outdoor1'});
      
     // add tileset image . use the tileset name, key of the image, etc
     this.tiles = this.map.addTilesetImage("main tileset", 'tileset1', 32, 32, 0, 0);
      
     //create background layer
     this.backgroundLayer = this.map.createStaticLayer("Floor", this.tiles, 0,0);
     // this.backgroundLayer.setScale(2);

     this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
     this.wallLayer = this.map.createStaticLayer('Walls, Stairs, Tables', this.tiles, 0, 0);
     
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


    loadNextMap() {
        
        // this.scene.start('levelThree',{level: 3, levels: this._LEVELS, newGame: false});
        // this.loadingLevel = true;

        if (!this.loadingLevel) {
            this.cameras.main.fade(500, 0, 0, 0);
            this.cameras.main.on( 'camerafadeoutcomplete', () => {
              if (this._LEVEL === 4) {
                this.bgMusic.destroy();
              this.scene.start('levelfive',{level: 5, levels: this._LEVELS, newGame: false});
            } 
          });
          this.loadingLevel = true;
          }
        
    }
    loadPrevMap () {

    // this.scene.restart({level: 'leveltwo', levels: this._LEVELS, newGame: false});
      if (!this.loadingLevel) {
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on( 'camerafadeoutcomplete', () => {
          if (this._LEVEL === 4) {
            this.bgMusic.destroy();
          this.scene.start('leveltwo', {level: 2, levels: this._LEVELS, newGame: false});
        }
      });
      this.loadingLevel = true;
      }
    }
};