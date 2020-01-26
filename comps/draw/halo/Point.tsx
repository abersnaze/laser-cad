import React from "react";

const Point = ({ shape, px, solution, onClick, onMouseEnter, onMouseLeave }) => {
    return <circle
        cx={solution[shape.x]}
        cy={solution[shape.y]}
        r={10 * px}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />;
};

export default Point;
