import { Dimensions } from "react-virtualized";
import { Matrix } from "transformation-matrix";
import { IConstraint } from "./IConstraint";
import { IAnchor, Shape } from "./Shape";

export interface IDrawing {
    anchors: IAnchor[];
    constraints: IConstraint[];
    layout: string;
    material: Dimensions;
    px: number;
    scale: number;
    shapes: Shape[];
    solution: { [key: string]: number };
    transform: Matrix;
}
