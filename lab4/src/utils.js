import * as item from './classes.js'
import * as inventory from './inventroy.js'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function randomingID(){
    return String(getRandomInt(9))+String(getRandomInt(9))+String(getRandomInt(9))+String(getRandomInt(9))+String(getRandomInt(9));
}












