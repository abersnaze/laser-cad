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
        stroke="red"
        opacity=".2"
        strokeWidth={strokeWidth}
        onMouseEnter={() => {
            console.log("enter", shape.id);
        }}
        onMouseLeave={() => {
            console.log("leave", shape.id);
        }}
    />);
};

export default Line;
