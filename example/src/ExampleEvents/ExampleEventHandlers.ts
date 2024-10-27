import { Types } from "../../..";


const testAsyncFunction = ()=> new Promise(function (res) {
    setTimeout(() => res({
        Status: 200,
        AvatarUrl: "this is the avatar url",
    }), 3000);
})

const requestInitialGameData = ()=>{
    console.log("started")
    testAsyncFunction().then((res)=>console.log(res))};

export const EventHandlers:Types.IEventHandlers = [{
    Name: "RequestInitialData",
    Function:requestInitialGameData
}]