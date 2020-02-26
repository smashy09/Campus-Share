class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {
        this.scene.launch('Ui');
    }
    
    create() {
        const goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
        
        
       
        
        this.chest = this.physics.add.image(200, 250, 'items', 0);
        
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
        
        this.pokemon = this.physics.add.sprite(400, 300, 'pokemon', 0);
    
    
        this.player = new Player(this,32, 32, 'characters', 2);
        
    
        // physics
        //this.physics.add.collider(this.player, this.wall); this will make the object move and run away from the point of contact. and disappear. 
        //  this.wall.setImmovable(); this will prevent the object from moving at all.
        this.physics.add.collider(this.player, this.wall);
    
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {goldPickAudio.play(); chest.destroy();});
        this.physics.add.overlap(this.player, this.pokemon, function() {console.log('overlap'); });
    
        this.cursors = this.input.keyboard.createCursorKeys();
        };
    
        update () {
            this.player.update(this.cursors);

        }


}

