const Point = ({ shape, solution }) => (<>
    <circle
        cx={solution.get(shape.x)}
        cy={solution.get(shape.y)}
        r=".3%"
        fill="#000000"
    />
</>);

export default Point;
