import expression from "2d-algebra";
import { compose, identity, Matrix } from "transformation-matrix";
import * as uuid from "uuid/v4";
import { bed, epilogRepeatability, units, wood } from "../lib/Equipment";
import { IDrawing } from "../lib/IDrawing";
import { IPoint, Shape } from "../lib/Shape";

const ROTATE_MATERIAL = "ROTATE_MATERIAL";
const SET_SCALE = "SET_SCALE";
const APPLY_TRANSFORM = "APPLY_TRANSFORM";
const SET_LAYOUT = "SET_MODE";

export function rotateMaterial() {
    return { type: ROTATE_MATERIAL };
}

export function setScale(scale: Matrix) {
    return { type: SET_SCALE, payload: scale };
}

export function applyTransform(...transforms: Matrix[]) {
    return { type: APPLY_TRANSFORM, payload: transforms };
}

export function setLayout(mode: "free" | "array" | "radial") {
    return { type: SET_LAYOUT, payload: mode };
}

export const emptyDrawing = {
    anchors: [],
    constraints: [],
    layout: "free",
    material: wood,
    px: 1,
    scale: identity(),
    shapes: [],
    solution: {},
    transform: identity(),
} as IDrawing;

const ax = uuid();
const ay = uuid();
const bx = uuid();
const by = uuid();
const cx = uuid();
const cy = uuid();
const px = uuid();
const py = uuid();
const qx = uuid();
const qy = uuid();
const pointP: Shape = { id: uuid(), kind: "point", x: px, y: py };
const pointQ: Shape = { id: uuid(), kind: "point", x: qx, y: qy };
const linePQ: Shape = { id: uuid(), kind: "line", a: pointP, b: pointQ };
const circlePQ: Shape = { id: uuid(), kind: "circle", center: pointP, through: pointQ };
const a: IPoint = { id: uuid(), kind: "point", x: ax, y: ay };
const b: IPoint = { id: uuid(), kind: "point", x: bx, y: by };
const c: IPoint = { id: uuid(), kind: "point", x: cx, y: cy };
emptyDrawing.anchors.push({ id: uuid(), kind: "anchor", location: a });
emptyDrawing.anchors.push({ id: uuid(), kind: "anchor", location: b });
emptyDrawing.anchors.push({ id: uuid(), kind: "anchor", location: c });
emptyDrawing.constraints.push({ ex: expression(bed.width).dividedBy(2).eq(ax) });
emptyDrawing.constraints.push({ ex: expression(bed.height).dividedBy(2).eq(ay) });
emptyDrawing.constraints.push({ ex: expression(bed.width).dividedBy(2).plus(units.inch).eq(bx) });
emptyDrawing.constraints.push({ ex: expression(bed.height).dividedBy(2).eq(by) });
emptyDrawing.constraints.push({ ex: expression(bed.width).dividedBy(2).eq(cx) });
emptyDrawing.constraints.push({ ex: expression(bed.height).dividedBy(2).plus(units.inch).eq(cy) });
emptyDrawing.shapes.push(linePQ);
emptyDrawing.shapes.push(pointP);
emptyDrawing.shapes.push(pointQ);
emptyDrawing.shapes.push(circlePQ);
emptyDrawing.solution[qx] = 52;
emptyDrawing.solution[qy] = 140;
emptyDrawing.solution[px] = 80;
emptyDrawing.solution[py] = 80;

// [
//     [422, 37],
//     [259, 101],
//     [382, 259],
//     [421, 272],
//     [332, 236],
//     [380, 67],
//     [69, 67],
//     [75, 10],
//     [310, 266],
//     [446, 107],
//     [413, 258],
//     [199, 199],
//     [214, 72],
//     [186, 68],
//     [341, 204],
//     [43, 167],
//     [53, 202],
//     [163, 262],
//     [308, 292],
//     [163, 294],
//     [238, 273],
//     [22, 44],
//     [229, 49],
//     [90, 174],
//     [428, 303],
//     [317, 233],
//     [251, 265],
//     [24, 204],
//     [347, 47],
//     [274, 287],
//     [389, 178],
//     [156, 226],
//     [121, 136],
//     [235, 189],
//     [351, 35],
//     [420, 125],
//     [393, 182],
//     [389, 87],
//     [196, 290],
//     [449, 244],
//     [5, 34],
//     [38, 100],
//     [145, 241],
//     [380, 180],
//     [136, 142],
//     [435, 270],
//     [84, 4],
//     [87, 120],
//     [383, 34],
//     [231, 302],
// ].forEach(([x, y]) => {
//     const xId = uuid();
//     const yId = uuid();
//     emptyDrawing.solution[xId] = x;
//     emptyDrawing.solution[yId] = y;
//     emptyDrawing.shapes.push({ id: uuid(), kind: "point", x: xId, y: yId });
// });

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
            return { ...state, scale, px: 1 / scale.a / state.transform.a };
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
            if (transform.a > 1 / state.scale.a / epilogRepeatability) {
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

            return { ...state, transform, px: 1 / state.scale.a / transform.a };
        case SET_LAYOUT:
            return { ...state, layout: action.payload };
        default:
            return state;
    }
};
