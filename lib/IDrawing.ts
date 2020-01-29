import { Dimensions } from "react-virtualized";
import { Matrix } from "transformation-matrix";
import { IConstraint } from "./IConstraint";
import { ISolution } from "./ISolution";
import { IAnchor, Shape } from "./Shape";

export interface IDrawing {
    anchors: IAnchor[];
    constraints: IConstraint[];
    layout: string;
    material: Dimensions;
    px: number;
    scale: number;
    shapes: Shape[];
    solution: ISolution;
    transform: Matrix;
}
