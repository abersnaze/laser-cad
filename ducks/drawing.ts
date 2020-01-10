import { List, Map } from "immutable";
import { compose, identity, Matrix } from "transformation-matrix";
import { undoableInit, undoableReducer } from "./undoable";

const ROTATE_MATERIAL = "ROTATE_MATERIAL";
const SET_SCALE = "SET_SCALE";
const APPLY_TRANSFORM = "APPLY_TRANSFORM";
const SET_MODE = "SET_MODE";

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export function setScale(px: number) {
    return { type: SET_SCALE, payload: px };
}

export function applyTransform(...transforms: Matrix[]) {
    return { type: APPLY_TRANSFORM, payload: transforms };
}

export function setMode(mode: "free" | "array" | "radial") {
    return { type: SET_MODE, payload: mode };
}

// 10160 = 2*127*5*2*2*2
// divisable by 254 (inches), 10 (metric), 16 (EMF fixed point)
export const units = {
    inch: 25.4,
    mm: 1,
};

// https://www.epiloglaser.com/how-it-works/laser-faqs.htm
const epilogRepeatability = 0.0005 * units.inch;
const epilogAccuracy = 0.01 * units.inch;

const x1 = Symbol();
const y1 = Symbol();
const x2 = Symbol();
const y2 = Symbol();
const pointA = { type: "point", x: x1, y: y1 };
const pointB = { type: "point", x: x2, y: y2 };

export const emptyDrawing = undoableInit({
    constraints: [],
    material: { width: 18 * units.inch, height: 12 * units.inch },
    mode: "free",
    px: 1,
    scale: 1,
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
        case SET_SCALE:
            const scale = action.payload;
            if (state.scale === scale) {
                return state;
            }
            return { ...state, scale, px: scale / state.transform.a };
        case APPLY_TRANSFORM:
            const transform = compose(state.transform, ...action.payload);

            // the aspect ratio should always be 1:1
            if (transform.a !== transform.d) {
                transform.a = transform.d;
            }

            // no need to zoom out too far out
            if (transform.a < 1) {
                transform.a = transform.d = 1;
            }
            // no need to zoom in too far
            if (transform.a > state.scale / epilogRepeatability) {
                return state;
            }

            // make sure don't pan off the edge
            if (transform.e > 0) {
                transform.e = 0;
            }
            if (transform.f > 0) {
                transform.f = 0;
            }
            const xLower = state.material.width - transform.a * state.material.width;
            if (transform.e < xLower) {
                transform.e = xLower;
            }
            const yLower = state.material.height - transform.d * state.material.height;
            if (transform.f < yLower) {
                transform.f = yLower;
            }

            return { ...state, transform, px: state.scale / transform.a };
        case SET_MODE:
            return { ...state, mode: action.payload };
        default:
            return state;
    }
});
