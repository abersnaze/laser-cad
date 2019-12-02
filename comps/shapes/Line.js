const Line = ({ shape, solution }) => (<>
    <line
        x1={solution.get(shape.x1)}
        y1={solution.get(shape.y1)}
        x2={solution.get(shape.x2)}
        y2={solution.get(shape.y2)}
        stroke="#FF0000"
    />
</>);

export default Line;
