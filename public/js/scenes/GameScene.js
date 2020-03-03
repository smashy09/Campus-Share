class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {

        //launch instead of start. start will tell phaser to shutdown the current scene. where launch will have it working in parallel

        // this allows a static tracking
        this.scene.launch('Ui');
    }
    
    create() {
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

    createChests() {
        this.chest = new Chest(this, 200, 250, 'items', 0);
        this.chest2 = new Chest(this, 200, 290, 'items', 0);
        this.pokemon = this.physics.add.sprite(400, 300, 'pokemon', 0);
    }

    createWalls () {
        
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.wall);
    
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this);
        this.physics.add.overlap(this.player, this.chest2, this.collectChest, null, this);
        this.physics.add.overlap(this.player, this.pokemon, function() {console.log('overlap'); });
    }
    collectChest(player, chest) {
            // play gold pickup sound
        this.goldPickAudio.play(); 

            //update score in the ui
        this.events.emit('updateScore', chest.coins);

            //destroy the chest game object
        chest.destroy();
    }
}

