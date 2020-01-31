import { IPoint } from "./IPoint";
import { ISolution } from "./ISolution";
import { Shape } from "./Shape";

export interface IQuad {
    origin: IPoint;
    ne?: IBranch;
    nw?: IBranch;
    se?: IBranch;
    sw?: IBranch;
}

export interface IBranch {
    pivot: number;
    using: Bounds;
    above?: IBranch;
    below?: IBranch;
}

export class Bounds {
    constructor(
        readonly minX: number,
        readonly minY: number,
        readonly maxX: number,
        readonly maxY: number,
        readonly shape: Shape) { }

    public with(other: Bounds): Bounds {
        return new Bounds(
            Math.min(this.minX, other.minX),
            Math.min(this.minY, other.minY),
            Math.max(this.maxX, other.maxX),
            Math.max(this.maxY, other.maxY),
            this.shape);
    }
}

/**
 * convert one shape to the bounding rect.
 * @param shape the shape to get the bounds for
 * @param solutions the current mappings from variables to values
 * @param cache a cache to look up and update for subcomponents of this shape
 */
function boundsForShape(shape: Shape, solutions: ISolution, cache): Bounds {
    let bounds = cache[shape.id];
    if (bounds !== undefined) {
        return bounds;
    }

    switch (shape.kind) {
        case "anchor":
            bounds = boundsForShape(shape.location, solutions, cache);
            break;
        case "circle":
            const { minX: cx, minY: cy } = boundsForShape(shape.center, solutions, cache);
            const { minX: tx, minY: ty } = boundsForShape(shape.through, solutions, cache);
            const r = Math.hypot(cx - tx, cy - ty);
            bounds = new Bounds(cx - r, cy - r, cx + r, cy + r, shape);
            break;
        case "line":
            bounds = boundsForShape(shape.a, solutions, cache).with(boundsForShape(shape.b, solutions, cache));
            break;
        case "point":
            const x = solutions[shape.x];
            const y = solutions[shape.y];
            bounds = new Bounds(x - 1, y - 1, x + 1, y + 1, shape);
            break;
        default:
            // just in case i add a new kind of shape in the future.
            throw new Error("unimplemented conversion");
    }

    cache[shape.id] = bounds;
    return bounds;
}

function boundsForShapes(shapes: Shape[], solutions: ISolution): Bounds[] {
    const cache = {};
    return shapes.map((shape) => boundsForShape(shape, solutions, cache));
}

/**
 * splits and filters for shapes that are fully in one of the four quadrents.
 * @param bounds all of the shape bounds.
 * @param origin the center of the four quadrents.
 */
function quadPartition(bounds: Bounds[], origin: IPoint): [Bounds[], Bounds[], Bounds[], Bounds[]] {
    const ne = [];
    const nw = [];
    const se = [];
    const sw = [];
    bounds.forEach((b) => {
        if (b.minX > origin.x && b.maxY < origin.y) { ne.push(b); }
        if (b.maxX < origin.x && b.maxY < origin.y) { nw.push(b); }
        if (b.minX > origin.x && b.minY > origin.y) { se.push(b); }
        if (b.maxX < origin.x && b.minY > origin.y) { sw.push(b); }
    });
    return [ne, nw, se, sw];
}

function generatorFromBounds(shapes: Bounds[], getEdge: (Bounds) => number): IBranch {
    if (shapes.length === 0) {
        return undefined;
    }
    const using = shapes[0];
    const pivot = getEdge(using);
    const above = [];
    const below = [];

    shapes.forEach((b) => {
        if (b === using) { return; }
        const edge = getEdge(b);
        if (edge > pivot) { above.push(b); }
        if (edge <= pivot) { below.push(b); }
    });
    return {
        above: generatorFromBounds(above, flipEdge.get(getEdge)),
        below: generatorFromBounds(below, flipEdge.get(getEdge)),
        pivot,
        using,
    };
}

const neh = (bounds) => bounds.minY;
const nev = (bounds) => bounds.maxX;
const nwh = (bounds) => bounds.minY;
const nwv = (bounds) => bounds.minX;
const seh = (bounds) => bounds.maxY;
const sev = (bounds) => bounds.maxX;
const swh = (bounds) => bounds.maxY;
const swv = (bounds) => bounds.minX;

const flipEdge = new Map();
flipEdge.set(neh, nev);
flipEdge.set(nev, neh);
flipEdge.set(nwh, nwv);
flipEdge.set(nwv, nwh);
flipEdge.set(seh, sev);
flipEdge.set(sev, seh);
flipEdge.set(swh, swv);
flipEdge.set(swv, swh);

export const generatorFromPoint = (origin: IPoint, solutions: ISolution, shapes: Shape[]): IQuad => {
    const bounds = boundsForShapes(shapes, solutions);
    const [ne, nw, se, sw] = quadPartition(bounds, origin);

    return {
        ne: generatorFromBounds(ne, nev),
        nw: generatorFromBounds(nw, nwv),
        origin,
        se: generatorFromBounds(se, sev),
        sw: generatorFromBounds(sw, swv),
    };
};

export const search = (tree: IQuad, to: IPoint): Shape[] => {
    return [];
    // switch (tree.kind) {
    //     case "empty":
    //         return [];
    //     case "leaf":
    //         return [];
    //     case "branch":
    //         return [];
    //     case "overflow":
    //         return [];
    // }
};
