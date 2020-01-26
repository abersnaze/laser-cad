import React from "react";

const Line = ({ shape, px, solution, onMouseEnter, onMouseLeave }) => {
    const ay = solution[shape.a.y];
    const by = solution[shape.b.y];
    const ax = solution[shape.a.x];
    const bx = solution[shape.b.x];
    const strokeWidth = 20 * px;

    return (<line
        x1={ax} y1={ay}
        x2={bx} y2={by}
        strokeWidth={strokeWidth}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />);
};

export default Line;
