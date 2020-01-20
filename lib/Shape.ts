export type Shape = IPoint | IAnchor | ILine | ICircle;

export interface IPoint {
    kind: "point";
    x: symbol;
    y: symbol;
}

export interface IAnchor {
    kind: "anchor";
    loc: IPoint;
}

export interface ILine {
    kind: "line";
    a: IPoint;
    b: IPoint;
}

export interface ICircle {
    kind: "circle";
    center: IPoint;
    through: IPoint;
}
