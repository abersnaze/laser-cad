import React from "react";

const Point = ({ shape, px, solution, onMouseEnter, onMouseLeave }) => {
    return <circle
        cx={solution[shape.x]}
        cy={solution[shape.y]}
        r={10 * px}
        fill="red"
        opacity=".2"
        onMouseEnter={() => {
            // console.log("enter", shape.id);
        }}
        onMouseLeave={() => {
            // console.log("leave", shape.id);
        }}
    />;
};

export default Point;
