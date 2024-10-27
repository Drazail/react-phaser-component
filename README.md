this template comes with a easy to use component wrapper for phaser3 and phaser-utility

- App.tsx : the actual react app
- PhaseGame.tsx: Phaser Game component

to add the game to an existing React App, add the phaser component to your page just as you would do with any other component.

```
        <div>
            <PhaserGame  ref={phaserRef} Config={config} EventHandlers={eventHandlers} Props={props}/>
        </div>
```

make sure you provide the requiered props, example props are included in ExampleEvents Folder.

- Communication:
    communication between phaser and react are done through an eventBuss, there are four methods of communication you can use:

    - EventHandlers: handlers are passed to the phaser component using the `EventHandlers` prop
        `<PhaserGame EventHandlers={EventHandlers}/>`
        `EventHandlers` is of type `IEventHandlers` : `{ Name: string; Function : (payload?:any)=>void }[]`

        example:
        ```
        export const EventHandlers:IEventHandlers = [{
            Name: "LogTestText",
            Function: (testText)=>{console.log(testText)}
        }]
        ```

    you can emmit an event by calling `EventBus.emit(eventName, payload)` inside the game. (make sure that the eventName is the same as the `Name` property you set for the eventHandler you want to call).

        ```
        EventBus.emit("LogTestText","this is a test text")
        ```

    Whenever an event is emmited, if there is an `EventHandler` with the same name as the emmited event, the `Function` property of the handler will be automatically called.

        you can find this in use in the example project.

    - whenever the Prop provided to the phaserComponent changes, an event called "PROPS_UPDATED" is fire.
        `<PhaserGame Props={}/>`
        `Props` is of type `IProps`: `{[key: string]: any}`

    you can listen to this event by calling:
        `EventBus.on(BaseEvents.PropsUpdated,(props =>{ do stuff })`

    - you can emmit "current-scene-ready" event after a scenes create method (with a delay) to fetch initial props for a scene:
        `setTimeout(()=>{EventBus.emit(BaseEvents.currentSceneReady);},10)`


*** Remember to remove listeners by calling `EventBus.removeListener(EventName)` whenever you are done with the component.

*** there are more examples of eventHandlers, EventNames and props in the ExampleEventHandlers folder