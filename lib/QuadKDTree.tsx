import { Assignments } from "2d-algebra";
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
    using: IShapePoint;
    far?: IBranch;
    near?: IBranch;
}

export interface IBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

const cover = (a: IBounds, b: IBounds): IBounds => {
    return {
        maxX: Math.max(a.maxX, b.maxX),
        maxY: Math.max(a.maxY, b.maxY),
        minX: Math.min(a.minX, b.minX),
        minY: Math.min(a.minY, b.minY),
    };
};

interface IShapeBounds {
    shape: Shape;
    bounds: IBounds;
}
interface IShapePoint {
    shape: Shape;
    point: IPoint;
}

/**
 * convert one shape to the bounding rect.
 * @param shape the shape to get the bounds for
 * @param solutions the current mappings from variables to values
 * @param cache a cache to look up and update for subcomponents of this shape
 */
function boundsForShape(shape: Shape, solutions: ISolution, cache): IShapeBounds {
    let bounds: IShapeBounds = cache[shape.id];
    if (bounds !== undefined) {
        return bounds;
    }

    switch (shape.kind) {
        case "anchor":
            bounds = boundsForShape(shape.location, solutions, cache);
            break;
        case "circleCR":
            const { bounds: c } = boundsForShape(shape.center, solutions, cache);
            const r = solutions[shape.radius];
            bounds = {
                bounds: { minX: c.minX - r, minY: c.minY - r, maxX: c.maxX + r, maxY: c.maxY + r },
                shape,
            };
            break;
        case "line":
            const aBounds = boundsForShape(shape.a, solutions, cache).bounds;
            const bBounds = boundsForShape(shape.b, solutions, cache).bounds;
            bounds = {
                bounds: cover(aBounds, bBounds),
                shape,
            };
            break;
        case "point":
            const x = solutions[shape.x];
            const y = solutions[shape.y];
            bounds = {
                bounds: { minX: x, minY: y, maxX: x, maxY: y },
                shape,
            };
            break;
        default:
            // just in case i add a new kind of shape in the future.
            throw new Error("unimplemented conversion");
    }

    cache[shape.id] = bounds;
    return bounds;
}

function boundsForShapes(shapes: Shape[], solutions: ISolution): IShapeBounds[] {
    const cache = {};
    return shapes.map((shape) => boundsForShape(shape, solutions, cache));
}

/**
 * splits and filters for shapes that are fully in one of the four quadrents.
 * @param bounds all of the shape bounds.
 * @param origin the center of the four quadrents.
 */
function quadPartition(bounds: IShapeBounds[], origin: IPoint): {
    nw: IShapePoint[],
    ne: IShapePoint[],
    se: IShapePoint[],
    sw: IShapePoint[],
} {
    const ne = [] as IShapePoint[];
    const nw = [] as IShapePoint[];
    const se = [] as IShapePoint[];
    const sw = [] as IShapePoint[];
    bounds.forEach(({ bounds: b, shape }) => {
        if (b.minX > origin.x && b.maxY < origin.y) { ne.push({ shape, point: { x: b.maxX, y: b.minY } }); }
        if (b.maxX < origin.x && b.maxY < origin.y) { nw.push({ shape, point: { x: b.minX, y: b.minY } }); }
        if (b.minX > origin.x && b.minY > origin.y) { se.push({ shape, point: { x: b.maxX, y: b.maxY } }); }
        if (b.maxX < origin.x && b.minY > origin.y) { sw.push({ shape, point: { x: b.minX, y: b.maxY } }); }
    });
    return { ne, nw, se, sw };
}

function generatorFromBounds(shapes: IShapePoint[], dir: IDir, depth: number): IBranch {
    // if (depth > 1) {
    //     return undefined;
    // }
    if (shapes.length === 0) {
        return undefined;
    }
    const using = median();
    const pivot = dir.edge(using.point);
    const far = [];
    const near = [];

    shapes.forEach((b) => {
        if (b === using) { return; }
        ((dir.isFarther(b.point, pivot)) ? far : near).push(b);
    });
    return {
        far: generatorFromBounds(far, dir.flipped, depth + 1),
        near: generatorFromBounds(near, dir.flipped, depth + 1),
        pivot,
        using,
    };

    function median() {
        if (shapes.length < 3) { return shapes[0]; }
        let fstPivot = [dir.edge(shapes[0].point), 0];
        const midIndex = Math.floor(shapes.length / 2);
        let midPivot = [dir.edge(shapes[midIndex].point), midIndex];
        let lstPivot = [dir.edge(shapes[shapes.length - 1].point), shapes.length - 1];

        if (fstPivot[0] > lstPivot[0]) {
            const tmp = fstPivot;
            fstPivot = lstPivot;
            lstPivot = tmp;
        }
        if (fstPivot[0] > midIndex) {
            const tmp = fstPivot;
            fstPivot = midPivot;
            midPivot = tmp;
        }
        if (midPivot[0] > lstPivot[0]) {
            const tmp = midPivot;
            fstPivot = midPivot;
            midPivot = tmp;
        }
        return shapes[0];
    }
}

export interface IDir {
    edge: (bounds: IPoint) => number;
    flipped: IDir;
    isFarther: (point: IPoint, pivot: number) => boolean;
    isVert: boolean;
}

export const dirs = {
    neHorz: { edge: (point) => point.y, isFarther: (point, pivot) => point.y < pivot, isVert: false } as IDir,
    neVert: { edge: (point) => point.x, isFarther: (point, pivot) => point.x > pivot, isVert: true } as IDir,
    nwHorz: { edge: (point) => point.y, isFarther: (point, pivot) => point.y < pivot, isVert: false } as IDir,
    nwVert: { edge: (point) => point.x, isFarther: (point, pivot) => point.x < pivot, isVert: true } as IDir,
    seHorz: { edge: (point) => point.y, isFarther: (point, pivot) => point.y > pivot, isVert: false } as IDir,
    seVert: { edge: (point) => point.x, isFarther: (point, pivot) => point.x > pivot, isVert: true } as IDir,
    swHorz: { edge: (point) => point.y, isFarther: (point, pivot) => point.y > pivot, isVert: false } as IDir,
    swVert: { edge: (point) => point.x, isFarther: (point, pivot) => point.x < pivot, isVert: true } as IDir,
};
dirs.neHorz.flipped = dirs.neVert;
dirs.nwHorz.flipped = dirs.nwVert;
dirs.seHorz.flipped = dirs.seVert;
dirs.swHorz.flipped = dirs.swVert;
dirs.neVert.flipped = dirs.neHorz;
dirs.nwVert.flipped = dirs.nwHorz;
dirs.seVert.flipped = dirs.seHorz;
dirs.swVert.flipped = dirs.swHorz;

export const generatorFromPoint = (origin: IPoint, solutions: ISolution, shapes: Shape[]): IQuad => {
    const bounds = boundsForShapes(shapes, solutions);
    const { ne, nw, se, sw } = quadPartition(bounds, origin);

    return {
        ne: generatorFromBounds(ne, dirs.neVert, 0),
        nw: generatorFromBounds(nw, dirs.nwVert, 0),
        origin,
        se: generatorFromBounds(se, dirs.seVert, 0),
        sw: generatorFromBounds(sw, dirs.swVert, 0),
    };
};

const searchTree = (
    tree: IBranch,
    to: IPoint,
    found: { [key: string]: Shape },
    dir: IDir,
    allVert: boolean,
    allHorz: boolean): void => {

    if (tree === undefined) { return; }
    const flipped = dir.flipped;
    searchTree(tree.near, to, found, flipped, allVert, allHorz);
    if ((allVert && allHorz) || dir.isFarther(to, tree.pivot)) {
        if (flipped.isFarther(to, flipped.edge(tree.using.point))) {
            found[tree.using.shape.id] = tree.using.shape;
        }
        searchTree(tree.far, to, found, flipped, allVert, allHorz);
    }
};

export const search = (tree: IQuad, to: IPoint): { [key: string]: Shape } => {
    const found = {};

    if (to.x < tree.origin.x) {
        if (to.y < tree.origin.y) {
            searchTree(tree.nw, to, found, dirs.nwVert, false, false);
        } else {
            searchTree(tree.sw, to, found, dirs.swVert, false, false);
        }
    } else {
        if (to.y < tree.origin.y) {
            searchTree(tree.ne, to, found, dirs.neVert, false, false);
        } else {
            searchTree(tree.se, to, found, dirs.seVert, false, false);
        }
    }
    return found;
};

export const DrawQuad = ({ tree, px, solution, from, width, height }) => {
    return <g stroke="black" >
        <defs>
            <marker id="arrow" viewBox="-5 0 10 10" refX="5" refY="5"
                markerWidth="12" markerHeight="12"
                orient="auto-start-reverse">
                <path d="M -5 0 l 10 5 l -10 5 z" />
            </marker>
        </defs>

        <ShowTree tree={tree.ne} parent={from} dir={dirs.neVert}
            px={px} solution={solution} />
        <ShowTree tree={tree.nw} parent={from} dir={dirs.nwVert}
            px={px} solution={solution} />
        <ShowTree tree={tree.se} parent={from} dir={dirs.seVert}
            px={px} solution={solution} />
        <ShowTree tree={tree.sw} parent={from} dir={dirs.swVert}
            px={px} solution={solution} />
        <line x1={0} y1={tree.origin.y} x2={width} y2={tree.origin.y} />
        <line y1={0} x1={tree.origin.x} y2={height} x2={tree.origin.x} />
    </g>;
};

interface IShowTree {
    tree: IBranch;
    parent: IPoint;
    dir: IDir;
    solution: Assignments;
    px: number;
}

const ShowTree = ({ tree, parent, dir, solution, px }: IShowTree) => {
    if (tree === undefined) {
        return null;
    }
    const { using, near, far } = tree;
    const ctrl = dir.isVert ? { x: parent.x, y: using.point.y } : { x: using.point.x, y: parent.y };

    return <>
        <path
            d={["M", parent.x, parent.y, "Q", ctrl.x, ctrl.y, using.point.x, using.point.y].join(" ")}
            fill="none"
            marker-end="url(#arrow)" />
        <g stroke="red">
            <ShowTree
                tree={far}
                parent={using.point}
                dir={dir.flipped}
                px={px}
                solution={solution} />
        </g>
        <g stroke="green">
            <ShowTree
                tree={near}
                parent={using.point}
                dir={dir.flipped}
                px={px}
                solution={solution} />
        </g>
    </>;
};
