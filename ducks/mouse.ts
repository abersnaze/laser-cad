import { Point } from "transformation-matrix";

export const MOVE = "MOUSE_MOVE";
export const DOWN = "MOUSE_DOWN";
export const UP = "MOUSE_UP";
export const ENTER = "MOUSE_ENTER";
export const LEAVE = "MOUSE_LEAVE";

export function mouseMove(cursor: Point) {
    return { type: MOVE, payload: cursor };
}

export function mouseDown(modified: boolean) {
    return { type: DOWN, payload: modified };
}

export function mouseUp() {
    return { type: UP };
}

export function mouseEnter(target) {
    return { type: ENTER, payload: target };
}

export function mouseLeave(target) {
    return { type: LEAVE, payload: target };
}
