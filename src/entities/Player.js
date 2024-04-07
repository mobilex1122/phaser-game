import { Physics } from "phaser";

export class Player extends Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {*} x 
     * @param {*} y 
     * 
     */

    SPEED = 300;
    JUMP = 400;
    constructor(scene,x,y) {
        super(scene,x,y, "char");

        scene.physics.add.existing(this);
        this.setDrag(0);

        this.input = scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.input.right.isDown) {
            this.setVelocityX(this.SPEED);
        } else if (this.input.left.isDown) {
            this.setVelocityX(-this.SPEED);
        } else {
            this.setVelocityX(0);
        }
        if (this.input.down.isDown) {
            this.setVelocityY(this.SPEED);
        } else if (this.input.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-this.JUMP);
        }
    }
}