class levelOneScene extends Phaser.Scene {
    constructor() {
        super("level1");

    }

    init(data) {

        //launch instead of start. start will tell phaser to shutdown the current scene. where launch will have it working in parallel

        // this allows a static tracking
        this.scene.launch('Ui');
        this.score = 0

        
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;


    }
    
    create() {
        
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
    
        this.createAnimations();
        this.createInput();
        // this.createSound();
        this.createPortal();
        this.loadNextLevel();
    }
    update () {
            this.player.update(this.cursors);

    }
    createPlayer() {
        this.map.findObject('Player', (obj) => {
            
            if (this._NEWGAME && this._LEVEL === 1) {
                if (obj.type === 'StartingPosition') {
                    this.player = new Player(this, obj.x, obj.y);
                }
            } else {
                this.player = new Player(this, obj.x, obj.y);
            }
            
            
        })
        
    };

    createPortal() {
         this.map.findObject('Portal', (obj) => {
        if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x, obj.y + 68);
        } else if (this._LEVEL === 2) {
            this.portal = new Portal(this, obj.x, obj.y)
        }
    })
    }
    createAudio() {
        this.goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
    }

    addCollisions() {
        //check collision wall to player
        // this.physics.add.collider(this.player, this.map.wallLayer);
    
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        
        this.physics.add.overlap(this.player, this.pokemon, function() {console.log('overlap'); });
        this.physics.add.overlap(this.player, this.ball, function() {console.log('overlap'); });
        this.physics.add.collider(this.player,  this.wallLayer);
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this))
       
        // this.physics.add.overlap(this.player,   this.stairs,     function() {
        //     this.player.onStairs = true;
        // }, null, this);
        
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
    //    this.map = new Map(this, 'map3', 'BCITA-tileset', 'background','Floor', 'wall');
        //create tile map
        this.map = this.make.tilemap({key: this._LEVELS[this._LEVEL]});
       // add tileset image . use the tileset name, key of the image, etc

        this.tiles = this.map.addTilesetImage("RPGpack_sheet", 'tileset2', 64, 64, 0, 0);
        
        //create background layer
        this.backgroundLayer = this.map.createStaticLayer("Floor", this.tiles, 0,0);
        // this.backgroundLayer.setScale(2);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.wallLayer = this.map.createStaticLayer('Walls, Stairs, Tables', this.tiles, 0, 0);
        
        this.wallLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollision([2], true);
        this.stairs = this.map.createStaticLayer('Items/Objects', this.tiles, 0, 0);
        
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
        this.bgMusic = this.sound.add('bgMusic', {volume: 0.5});
        this.bgMusic.play();
    }

    loadNextLevel () {
        this.scene.restart( { level: 2, levels: this._LEVELS, newGame: false})
    }

    //loadnewmap(){
    //this.scene.start('placeholder')
    //}
};
