const Line = ({ shape, solution }) => {
    const { x: x1, y: y1 } = shape.a;
    const { x: x2, y: y2 } = shape.b;

    return <line
        stroke="black"
        x1={solution[x1]}
        y1={solution[y1]}
        x2={solution[x2]}
        y2={solution[y2]}
    />;
};

export default Line;
