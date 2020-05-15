

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        // this.velocity = 360; // velocity(speed) to move players
        
        //enable physics
        this.scene.physics.world.enable(this);
        // set immovable if another object collide
        this.setImmovable(true);
       
        //scale our player
        this.setScale(2);
        // this.setCollideWorldBounds(true);

        //add player to existing scene
        this.scene.add.existing(this);
        //follow player
        // this.scene.cameras.main.startFollow(this);
        
    
    }

    // update(cursors) {
    //     this.body.setVelocity(0);
    
    //     if (cursors.left.isDown) {
    //         this.body.setVelocityX(-this.velocity);
    //     } else if(cursors.right.isDown) {
    //         this.body.setVelocityX(this.velocity);
    //     } 
        
    //     if (cursors.up.isDown) {
    //         this.body.setVelocityY(-this.velocity);
    //     } else if(cursors.down.isDown) {
    //         this.body.setVelocityY(this.velocity);
    //     } 

        
    // };
    // createAnimations() {

    //   //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    //   this.scene.anims.create({
    //     key: 'LEFT',
    //     frames: this.scene.anims.generateFrameNumbers('engineer', {
    //       start:3 ,end: 5
    //     }),
    //     frameRate: 1,
    //     repeat: -1
    //   });
  
    //   // animation with key 'right'
    //   this.scene.anims.create({
    //     key: 'RIGHT',
    //     frames: this.scene.anims.generateFrameNumbers('engineer', {
    //       start:6 ,end: 8
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    //   });
  
    //   this.scene.anims.create({
    //     key: 'UP',
    //     frames: this.scene.anims.generateFrameNumbers('engineer', {
    //       start:9 ,end: 11
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    //   });
  
    //   this.scene.anims.create({
    //     key: 'DOWN',
    //     frames: this.scene.anims.generateFrameNumbers('engineer', {
    //       start:0 ,end: 2
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    //   });
    // }

    // update(cursors) {
    //     this.body.setVelocity(0);
    
    //     if (cursors.left.isDown) {
    //       this.body.setVelocityX(-this.velocity);
    //       this.currentDirection = Direction.LEFT;
    //       this.anims.play('LEFT', true);
          
          
    //     } else if (cursors.right.isDown) {
    //       this.body.setVelocityX(this.velocity);
    //       this.currentDirection = Direction.RIGHT;
    //       this.anims.play('RIGHT', true);
          
    //     }
    
    //     if (cursors.up.isDown) {
    //       this.body.setVelocityY(-this.velocity);
    //       this.currentDirection = Direction.UP;
    //       this.anims.play('UP', true);
         
         
    //     } else if (cursors.down.isDown) {
    //       this.body.setVelocityY(this.velocity);
    //       this.currentDirection = Direction.DOWN;
    //       this.anims.play('DOWN', true);
          
          
    //     }
    // }
}