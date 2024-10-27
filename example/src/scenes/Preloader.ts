import { Align, BaseScene, IGameObj } from 'phaser-utility';

export class Preloader extends BaseScene
{
    LoadingText: IGameObj;
    backGroundImg: Phaser.GameObjects.Image;
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.backGroundImg = this.add.image(0,0, 'background').setOrigin(0.5,0.5);
        this.LoadingText = this.add.text(0,0, 'Loading ... ', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5,0.5).setDepth(100);
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
    }

    create ()
    {
        super.create();

        //create a grid system on the stage
    
        let rows:number=11;
        let cols:number=11;
        this.makeGrid(rows,cols);

        //show the grid for debugging
        this.grid.show();

        this.grid.placeAtIndex(60,this.LoadingText);
        this.grid.placeAtIndex(60,this.backGroundImg);
        Align.scaleToGameW(this.backGroundImg,1,this);
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        setTimeout(() => {
            this.scene.start('MainMenu');
        }, 1);
        
    }
}
