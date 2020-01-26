import { compose, identity, Matrix } from "transformation-matrix";
import { bed, epilogRepeatability } from "../lib/Equipment";
import { IDrawing } from "../lib/IDrawing";
import { Shape } from "../lib/Shape";

const ROTATE_MATERIAL = "ROTATE_MATERIAL";
const SET_SCALE = "SET_SCALE";
const APPLY_TRANSFORM = "APPLY_TRANSFORM";
const SET_MODE = "SET_MODE";

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export function setScale(scale: number) {
    return { type: SET_SCALE, payload: scale };
}

export function applyTransform(...transforms: Matrix[]) {
    return { type: APPLY_TRANSFORM, payload: transforms };
}

export function setMode(mode: "free" | "array" | "radial") {
    return { type: SET_MODE, payload: mode };
}

const x1 = Symbol();
const y1 = Symbol();
const x2 = Symbol();
const y2 = Symbol();

const pointA: Shape = { kind: "point", x: x1, y: y1, id: uuid() };
const pointB: Shape = { kind: "point", x: x2, y: y2 };
const lineAB: Shape = { kind: "line", a: pointA, b: pointB };
const circleAB: Shape = { kind: "circle", center: pointA, through: pointB };

export const emptyDrawing = {
    constraints: [],
    layout: "free",
    material: bed,
    px: 1,
    scale: 1,
    shapes: [
        lineAB,
        pointA,
        pointB,
        circleAB,
    ],
    solution: { [x2]: 52, [y2]: 140, [x1]: 80, [y1]: 80 },
    transform: identity(),
} as IDrawing;

export const drawingReducer = (state = emptyDrawing, action) => {
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
};
