import React from 'react';

const Point = ({ shape, px, material, solution, selected, onClick, onMouseEnter, onMouseLeave }) => {
    // if (selected.has(shape))
    //     return null
    return <>
        <line
            x1={solution.get(shape.x)} y1={0}
            x2={solution.get(shape.x)} y2={material.height}
            strokeWidth={20 * px}
            stroke="#0000FF"
            opacity=".1"
        />
        <line
            x1={0} y1={solution.get(shape.y)}
            x2={material.width} y2={solution.get(shape.y)}
            strokeWidth={20 * px}
            stroke="#0000FF"
            opacity=".1"
        />
    </>;
};

export default Point;
