import React from "react";

const Point = ({ shape, px, solution }) => {
    return (<>
        <circle
            cx={solution[shape.x]}
            cy={solution[shape.y]}
            r={3 * px}
        />
    </>);
};

export default Point;
