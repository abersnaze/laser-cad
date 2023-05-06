import { IPoint } from "../lib/IPoint";
import { IQuad } from "../lib/QuadKDTree";

export const MOUSE_MOVE = "MOUSE_MOVE";
export const MOUSE_DOWN = "MOUSE_DOWN";
export const MOUSE_UP = "MOUSE_UP";
export const MOUSE_ENTER = "MOUSE_ENTER";
export const MOUSE_LEAVE = "MOUSE_LEAVE";

export function mouseMove(cursor: IPoint) {
    return { type: MOUSE_MOVE, payload: cursor };
}

export function mouseDown(cursor: IPoint, modified: boolean, makeTree: () => IQuad) {
    return { type: MOUSE_DOWN, payload: {modified, cursor, makeTree } };
}

export function mouseUp() {
    return { type: MOUSE_UP };
}

export function mouseEnter(target) {
    return { type: MOUSE_ENTER, payload: target };
}

export function mouseLeave(target) {
    return { type: MOUSE_LEAVE, payload: target };
}
