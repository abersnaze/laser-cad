const Circle = ({ shape, solution, selected, hover }) => {
    const { x: cxId, y: cyId } = shape.center;
    const cx = solution[cxId];
    const cy = solution[cyId];
    const r = solution[shape.radius];

    return <circle
        fill="none"
        stroke="black"
        cx={cx}
        cy={cy}
        r={r}
        filter={selected ? "url(#select)" : hover ? "url(#hover)" : undefined}
    />;
};

export default Circle;
