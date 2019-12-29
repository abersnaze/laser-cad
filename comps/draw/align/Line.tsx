import React from "react";

const PointSlope = ({ intercept, slope, material, strokeWidth, onMouseEnter, onMouseLeave }) => {
    const [h, w] = [material.height, material.width];
    let a;
    let b;
    if (slope > 0) {
        a = (intercept >= 0)
            ? { x: 0, y: intercept }
            : { x: (0 - intercept) / slope, y: 0 };

        const rightIntercept = slope * w + intercept;

        b = (rightIntercept <= h)
            ? { x: w, y: rightIntercept }
            : { x: (h - intercept) / slope, y: h };
    } else {
        a = (intercept < h)
            ? { x: 0, y: intercept }
            : { x: (h - intercept) / slope, y: h };

        const rightIntercept = slope * w + intercept;

        b = (rightIntercept < 0)
            ? { x: - intercept / slope, y: 0 }
            : { x: (h - intercept) / slope, y: h };
    }

    return <line
        x1={a.x} y1={a.y}
        x2={b.x} y2={b.y}
        strokeWidth={strokeWidth}
        stroke="#0000FF"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        opacity=".1"
    />;
};

const Line = ({ shape, px, material, solution, selected, onMouseEnter, onMouseLeave }) => {
    // if (selected.has(shape.a) && selected.has(shape.b)) {
    //     return null;
    // }
    const ay = solution.get(shape.a.y);
    const by = solution.get(shape.b.y);
    const ax = solution.get(shape.a.x);
    const bx = solution.get(shape.b.x);
    const slope = (ay - by) / (ax - bx);

    const interceptAB = ay - (slope * ax);
    const interceptA = ay - (-ax / slope);
    const interceptB = by - (-bx / slope);
    const strokeWidth = 20 * px;

    return (<>
        <PointSlope
            intercept={interceptAB}
            slope={1 * slope}
            material={material}
            strokeWidth={strokeWidth}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} />
        <PointSlope
            intercept={interceptA}
            slope={-1 / slope}
            material={material}
            strokeWidth={strokeWidth}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} />
        <PointSlope
            intercept={interceptB}
            slope={-1 / slope}
            material={material}
            strokeWidth={strokeWidth}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} />
    </>);
};

export default Line;
