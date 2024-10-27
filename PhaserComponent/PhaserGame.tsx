import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import { IRefPhaserGame, IComponetProps } from './Interfaces/IComponentAPI';
import { BaseEvents } from './Constants/Constants';

export const PhaserGame = forwardRef<IRefPhaserGame, IComponetProps>(function PhaserGGame({ Config, EventHandlers, Props }, ref) {
    const game = useRef<Phaser.Game | null>(null!);
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartGame(
                Config,
                "game-container");
            if (typeof ref === 'function') {
                ref({ game: game.current, scene: null });
            } else if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                if (game.current !== null) {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() => {
        EventHandlers?.forEach(eventHandler => {
            EventBus.on(eventHandler.Name, eventHandler.Function)
        })
        return () => {
            EventHandlers?.forEach(eventHandler => {
                EventBus.removeListener(eventHandler.Name);
            })

        }
    })

    useEffect(()=>{
        EventBus.on(BaseEvents.currentSceneReady, ()=>{
            EventBus.emit(BaseEvents.PropsUpdated, Props)
        });
            return ()=>{EventBus.removeListener(BaseEvents.currentSceneReady);}
    })

    useEffect(()=>{
        EventBus.emit(BaseEvents.PropsUpdated, Props)
    },[Props])

    return (
        <div id="game-container"></div>
    );

});
