import { Point } from "transformation-matrix";
import { ISolution } from "./ISolution";
import { Shape } from "./Shape";

export type Tree = IVertTree | IHorzTree | ILeaf;
interface IVertTree {
    kind: "vertical";
    pivot: number;
    left: Tree;
    right: Tree;
}
interface IHorzTree {
    kind: "horizontal";
    pivot: number;
    left: Tree;
    right: Tree;
}
interface ILeaf {
    kind: "leaf";
    shape: Shape;
}

export const generator = (rootPoint: Point, solutions: ISolution, shapes: Shape[], vertical = true): () => Tree => {

    return () => {
        return {
            kind: "leaf",
            shape: shapes[0],
        };
    };
};

export const search = (tree: Tree, point: Point): Shape[] => {
    return [];
};
