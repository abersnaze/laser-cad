const Line = ({ shape, px, solution, selected, isHighlighted }) => {
    const { x: x1, y: y1 } = shape.a;
    const { x: x2, y: y2 } = shape.b;

    return <line
        x1={solution.get(x1)}
        y1={solution.get(y1)}
        x2={solution.get(x2)}
        y2={solution.get(y2)}
        strokeWidth={px}
        stroke={isHighlighted ? "#00FF00" : selected.has(shape.a) && selected.has(shape.b) ? "#FF0000" : "#000000"} />;
};

export default Line;
