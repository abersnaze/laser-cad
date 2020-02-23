import React from "react";

const Point = ({ shape, px, solution, selected, hover }) => {
    return (<>
        <circle
            cx={solution[shape.x]}
            cy={solution[shape.y]}
            r={3 * px}
            filter={selected ? "url(#select)" : hover ? "url(#hover)" : undefined}
        />
    </>);
};

export default Point;
