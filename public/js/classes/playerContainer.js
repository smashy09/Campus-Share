//Keep for game object container for other types.


class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = 160; // velocity(speed) to move players

        //enable physics
        this.scene.physics.world.enable(this);
        // set a size on the container
        this.setSize(28, 28);
       
        this.body.setCollideWorldBounds(true);

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        this.scene.cameras.main.startFollow(this);
        
       
    }

  
    update(cursors) {
        this.body.setVelocity(0);
    
        if (cursors.left.isDown) {
          this.body.setVelocityX(-this.velocity);
          this.currentDirection = Direction.LEFT;
          this.player.anims.play('LEFT', true);
          
          
        } else if (cursors.right.isDown) {
          this.body.setVelocityX(this.velocity);
          this.currentDirection = Direction.RIGHT;
          this.player.anims.play('RIGHT', true);
         
        }
    
        if (cursors.up.isDown) {
          this.body.setVelocityY(-this.velocity);
          this.currentDirection = Direction.UP;
          this.player.anims.play('UP', true);
          
         
        } else if (cursors.down.isDown) {
          this.body.setVelocityY(this.velocity);
          this.currentDirection = Direction.DOWN;
          this.player.anims.play('DOWN', true);
         
          
        }
    }
}