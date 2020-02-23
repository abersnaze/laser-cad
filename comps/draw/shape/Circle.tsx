const Circle = ({ shape, solution, selected, hover }) => {
    const { x: cxId, y: cyId } = shape.center;
    const { x: txId, y: tyId } = shape.through;
    const cx = solution[cxId];
    const cy = solution[cyId];
    const tx = solution[txId];
    const ty = solution[tyId];
    const r = Math.hypot(cx - tx, cy - ty);

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
