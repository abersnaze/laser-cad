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
    kind: "circle";
    center: IPoint;
    through: IPoint;
}
