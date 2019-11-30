import { identity } from 'transformation-matrix';
import { undoableInit, undoableReducer } from './undoable';

const ROTATE_MATERIAL = 'ROTATE_MATERIAL';

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export const units = {
    inch: 254,
    mm: 10,
};

export const emptyDrawing = undoableInit({
    transform: identity(),
    material: { width: 18 * units.inch, height: 12 * units.inch },
    points: [],
    shapes: [],
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
