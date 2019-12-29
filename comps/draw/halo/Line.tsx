import React from 'react';

const Line = ({ shape, px, solution, onMouseEnter, onMouseLeave }) => {
    const ay = solution.get(shape.a.y);
    const by = solution.get(shape.b.y);
    const ax = solution.get(shape.a.x);
    const bx = solution.get(shape.b.x);
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
