import { Scene, Tilemaps } from 'phaser';
import { Player } from '../entities/Player';
import levels from '../levels.json';
import LDTKLoader from '../LDTKLoader';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.roundPixels = true; 
        this.world = new LDTKLoader(levels);
        this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        //console.log("Hello");

        this.player = new Player(this,500,100);

        
        this.add.existing(this.player);

        this.block = this.add.rectangle(700,700,400,400, 0xff0000);
        this.ground = this.physics.add.staticGroup([this.block]);

        this.mapData = this.world.getLevel("Level_0");
        this.map = new Tilemaps.Tilemap(this,this.mapData);
        this.tileset = this.map.addTilesetImage("tiles","tiles");

        this.base = this.map.createLayer("IntGrid",this.tileset);
        const debugGraphics = this.add.graphics();
        this.base.renderDebug(debugGraphics);
        //console.dir(this.mapData);
        //console.dir(this.map);

        this.base.setCollisionByExclusion(-1,true);
        this.physics.add.existing(this.base,true);
        this.physics.add.collider(this.player,this.base);
        this.physics.add.collider(this.player,this.ground);


        this.cameras.main.startFollow(this.player,true,0.1,0.1);


        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update() {
        this.player.update();
    }
}
