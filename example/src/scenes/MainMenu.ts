import { GameObjects } from 'phaser';

import { EventBus, BaseEvents } from 'react-phaser-component';
import { Align, BaseScene } from 'phaser-utility';
import { EventNames } from '../ExampleEvents/ExampleEventNames';

export class MainMenu extends BaseScene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    init(){
        
        this.background = this.add.image(0, 0, 'background').setOrigin(.5,.5).setDepth(100);
        this.logo = this.add.image(0, 0, 'logo').setDepth(100).setOrigin(0.5,0.5);
        this.title = this.add.text(0,0,"text").setOrigin(.5,.5).setDepth(100).setColor("black")
        this.logo.setInteractive();
        this.logo.on(Phaser.Input.Events.POINTER_DOWN,()=>{
            console.log("start clicked")
            EventBus.emit(EventNames.RequestInitialGameData)
        });
    }

    create ()
    {
        super.create();
        let rows:number=11;
        let cols:number=11;

        this.makeGrid(rows,cols);

        this.grid.placeAtIndex(60,this.background);
        this.grid.placeAtIndex(38, this.logo);
        Align.scaleToGameW(this.logo,0.5,this);
        Align.scaleToGameW(this.background,1,this);
        this.grid.placeAtIndex(93, this.title);
        Align.scaleToGameW(this.title, 0.1,this);
        //show the grid for debugging
        this.grid.show();
        this.grid.showNumbers();
        
        setTimeout(()=>{
            EventBus.emit(BaseEvents.currentSceneReady);
        },10)
        
        EventBus.on(BaseEvents.PropsUpdated,(props:any)=>{
            this.title.setText(props.title)
         })
    }

    update(): void {
    }
}
