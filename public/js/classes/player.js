class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.velocity = 160; // velocity(speed) to move players

        //enable physics
        this.scene.physics.world.enable(this);
        // set immovable if another object collide
        this.setImmovable(false);

        //scale our player
        this.setScale(2);
        this.setCollideWorldBounds(true);

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        this.scene.cameras.main.startFollow(this);
    
    }

    update(cursors) {
        this.body.setVelocity(0);
    
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
        } else if(cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
        } 
        
        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity);
        } else if(cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
        } 
    };
}