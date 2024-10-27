type EventHandler = {
    Name: string;
    Function : (payload?:any)=>void
};

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}


export type IProps = {
    [key: string]: any
};

export type IEventHandlers = EventHandler[];

export interface IComponetProps
{
    Props?: IProps,
    EventHandlers?: IEventHandlers,
    Config: Phaser.Types.Core.GameConfig,
}