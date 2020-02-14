import React from "react";

const Circle = ({ shape, px, solution, onMouseEnter, onMouseLeave }) => {
    const cx = solution[shape.center.x];
    const cy = solution[shape.center.y];
    const tx = solution[shape.through.x];
    const ty = solution[shape.through.y];
    const strokeWidth = 20 * px;
    const r = Math.hypot(cx - tx, cy - ty);

    return <circle
        fill="none"
        stroke="red"
        opacity=".2"
        strokeWidth={strokeWidth}
        cx={cx}
        cy={cy}
        r={r}
    />;
};

export default Circle;
