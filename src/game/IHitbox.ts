import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox():Rectangle;
}

export function checkCollision(objA:IHitbox, objB:IHitbox):Rectangle | null {
    const rA = objA.getHitbox(); // "r" de rectángulo
    const rB = objB.getHitbox();

    // ternarios
    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right;

    const bottommostTop = rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    const makeSenseHor = rightmostLeft < leftmostRight; //hay colisión
    const makeSenseVer = bottommostTop < topmostBottom;

    //¿Esto es sólo cuando hay colisión horizontal Y vertical? (no sólo una d las dos)
    if (makeSenseHor && makeSenseVer){  // ¿(makeSenseHor || makeSenseVer)?
        
        const retval = new Rectangle();

        retval.x = rightmostLeft;
        retval.y = bottommostTop;
        retval.width = leftmostRight - rightmostLeft;
        retval.height = topmostBottom - bottommostTop;

        return retval;
        
    } else {
        return null;
    }
}