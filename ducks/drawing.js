import { identity } from 'transformation-matrix';
import { undoableInit, undoableReducer } from './undoable';
import { Map } from 'immutable';

const ROTATE_MATERIAL = 'ROTATE_MATERIAL';
const SET_PIXEL = 'SET_PIXEL';

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export function setPixel(px) {
    return { type: SET_PIXEL, payload: px };
}

export const units = {
    inch: 25.4,
    mm: 1,
};

const x1 = Symbol();
const y1 = Symbol();
const x2 = Symbol();
const y2 = Symbol();
const pointA = { type: 'point', x: x1, y: y1 };
const pointB = { type: 'point', x: x2, y: y2 };

export const emptyDrawing = undoableInit({
    px: 1,
    transform: identity(),
    material: { width: 18 * units.inch, height: 12 * units.inch },
    shapes: [
        { type: 'line', mode: 'cut', a: pointA, b: pointB },
        pointA, pointB,
    ],
    solution: Map([[x1, 52], [y1, 140], [x2, 300], [y2, 200]]),
    constraints: [],
});

export const drawingReducer = undoableReducer((state, action) => {
    switch (action.type) {
        case ROTATE_MATERIAL:
            return {
                ...state,
                material: {
                    width: state.material.height,
                    height: state.material.width,
                },
            };
        case SET_PIXEL:
            return { ...state, px: action.payload };
        default:
            return state;
    }
});
