import { Variable } from "2d-algebra/lib/node/Variable";

export type Shape = IPoint | IAnchor | ILine | ICircle;

export interface IPoint {
    id: string;
    kind: "point";
    x: string;
    y: string;
}

export interface IAnchor {
    id: string;
    kind: "anchor";
    location: IPoint;
}

export interface ILine {
    id: string;
    kind: "line";
    a: IPoint;
    b: IPoint;
}

export interface ICircle {
    id: string;
    kind: "circleCR";
    center: IPoint;
    radius: string;
}

export const hoverOrder = (a: Shape, b: Shape) => {
    if (a.kind === "point") {
        return (1 - 0);
    }
    return (0 - 1);
};
