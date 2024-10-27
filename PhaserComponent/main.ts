import { Game } from 'phaser';

const StartGame = (config:Phaser.Types.Core.GameConfig, parent: string) => {
    return new Game({ ...config, parent });

}

export default StartGame;
