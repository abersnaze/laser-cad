export type Shape = IPoint | IAnchor | ILine | ICircle;

export interface IPoint {
    kind: "point";
    x: string;
    y: string;
}

export interface IAnchor {
    kind: "anchor";
    location: IPoint;
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
