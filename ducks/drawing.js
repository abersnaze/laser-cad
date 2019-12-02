import { identity } from 'transformation-matrix';
import { undoableInit, undoableReducer } from './undoable';
import { Map } from 'immutable';

const ROTATE_MATERIAL = 'ROTATE_MATERIAL';

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export const units = {
    inch: 25.4,
    mm: 1,
};

const x1 = Symbol();
const y1 = Symbol();
const x2 = Symbol();
const y2 = Symbol();

export const emptyDrawing = undoableInit({
    transform: identity(),
    material: { width: 18 * units.inch, height: 12 * units.inch },
    shapes: [
        { type: "line", x1, y1, x2, y2 },
        { type: 'point', x: x1, y: y1 },
        { type: 'point', x: x2, y: y2 }
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
        default:
            return state;
    }
});
