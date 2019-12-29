import React from 'react';

const Point = ({ shape, px, solution, selected, isHighlighted }) => {
    return (<>
        <circle
            cx={solution.get(shape.x)}
            cy={solution.get(shape.y)}
            r={3*px}
        />
    </>);
};

export default Point;
