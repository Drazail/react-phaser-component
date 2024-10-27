import { useEffect, useRef, useState } from 'react';
import { PhaserGame } from '../../index.ts';
import { EventHandlers } from './ExampleEvents/ExampleEventHandlers';
import { Types } from "phaser-react-component";
import { AUTO } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';

function App() {
    const phaserRef = useRef<Types.IRefPhaserGame | null>(null);
    let [title, setTitle] = useState("this is initial tilte");

    useEffect(()=>{
        setInterval(() => {
            setTitle(`this is test No. ${Math.random()}`)
        }, 3000);
    },[])
    
    return (
        <div>
            <PhaserGame ref={phaserRef}
                Props={{ test:'test',title }}
                EventHandlers={EventHandlers} Config={{
                    type: AUTO,
                    scale: {
                        parent: 'game-container',
                        mode: Phaser.Scale.FIT,
                        autoCenter: Phaser.Scale.CENTER_BOTH,
                        width: window.innerWidth || 800,
                        height: window.innerWidth || 800
                    },
                    parent: 'game-container',
                    backgroundColor: '#028af8',
                    scene: [
                        Boot,
                        Preloader,
                        MainMenu,
                    ]
                }} />
            <div>
                the react-app goes here
            </div>
        </div>
    )
}

export default App
