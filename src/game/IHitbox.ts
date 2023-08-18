import { Rectangle } from "pixi.js";

export interface IHitbox { getHitbox():Rectangle; }

export function checkCollision(objA:IHitbox, objB:IHitbox):Rectangle | null {
    const rA = objA.getHitbox(); // "r" de rectángulo
    const rB = objB.getHitbox();

    const rmL = rA.left < rB.left ? rB.left : rA.left;  // rightmostLeft
    const lmR = rA.right > rB.right ? rB.right : rA.right;  // leftmostRight
    const bmT = rA.top < rB.top ? rB.top : rA.top;  // bottommostTop
    const tmB = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;  // topmostBottom

    const makeSenseHor = rmL < lmR;
    const makeSenseVer = bmT < tmB;
    if (makeSenseHor && makeSenseVer){  // hay colisión

        const retval = new Rectangle();
        retval.x = rmL;
        retval.y = bmT;
        retval.width = lmR - rmL;
        retval.height = tmB - bmT;
        return retval;
    }
    else {
        return null;
    }
}