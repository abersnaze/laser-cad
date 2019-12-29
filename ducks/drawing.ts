import { List, Map } from "immutable";
import { identity } from "transformation-matrix";
import { undoableInit, undoableReducer } from "./undoable";

const ROTATE_MATERIAL = "ROTATE_MATERIAL";
const SET_PIXEL = "SET_PIXEL";

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export function setPixel(px) {
    return { type: SET_PIXEL, payload: px };
}

// 10160 = 2*127*5*2*2*2
// divisable by 254 (inches), 10 (metric), 16 (EMF fixed point)
export const units = {
    inch: 25.4,
    mm: 1,
};

const x1 = Symbol();
const y1 = Symbol();
const x2 = Symbol();
const y2 = Symbol();
const pointA = { type: "point", x: x1, y: y1 };
const pointB = { type: "point", x: x2, y: y2 };

export const emptyDrawing = undoableInit({
    constraints: [],
    material: { width: 18 * units.inch, height: 12 * units.inch },
    px: 1,
    shapes: List([
        { type: "line", mode: "cut", a: pointA, b: pointB },
        pointA,
        pointB,
    ]),
    solution: Map([]), // [x2, 52], [y2, 140], [x1, 80], [y1, 80]
    transform: identity(),
});

export const drawingReducer = undoableReducer(emptyDrawing, (state, action) => {
    switch (action.type) {
        case ROTATE_MATERIAL:
            return {
                ...state,
                material: {
                    height: state.material.width,
                    width: state.material.height,
                },
            };
        case SET_PIXEL:
            return { ...state, px: action.payload };
        default:
            return state;
    }
});
