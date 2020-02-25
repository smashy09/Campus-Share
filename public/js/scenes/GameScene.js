class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    
    create() {
        const goldPickAudio = this.sound.add('goldSound', {loop: false, volume: 0.2});
        
        const button = this.add.image(200, 200, 'button1');
        button.setOrigin(0.5, 0.5);
        this.add.sprite(300, 100, 'button1');
        
        this.chest = this.physics.add.image(200, 250, 'items', 0);
        
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
        
        this.pokemon = this.physics.add.sprite(400, 300, 'pokemon', 0);
    
    
        this.player = this.physics.add.image(32, 32, 'characters', 2);
        this.player.setScale(2);
        this.player.body.setCollideWorldBounds(true);
    
        // physics
        //this.physics.add.collider(this.player, this.wall); this will make the object move and run away from the point of contact. and disappear. 
        //  this.wall.setImmovable(); this will prevent the object from moving at all.
        this.physics.add.collider(this.player, this.wall);
    
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {goldPickAudio.play(); chest.destroy();});
        this.physics.add.overlap(this.player, this.pokemon, function() {console.log('overlap'); });
    
        this.cursors = this.input.keyboard.createCursorKeys();
        };
    
        update() {
            this.player.setVelocity(0);
        
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
            } else if(this.cursors.right.isDown) {
                this.player.setVelocityX(160);
            } 
            
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-160);
            } else if(this.cursors.down.isDown) {
                this.player.setVelocityY(160);
            } 
        };


}

