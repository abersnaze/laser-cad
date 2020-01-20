import { List, Map } from "immutable";
import { Dimensions } from "react-virtualized";
import { Matrix } from "transformation-matrix";
import { IConstraint } from "./IConstraint";
import { Shape } from "./Shape";

export interface IDrawing {
    constraints: List<IConstraint>;
    layout: string;
    material: Dimensions;
    scale: number;
    shapes: List<Shape>;
    solution: Map<symbol, number>;
    transform: Matrix;
}
