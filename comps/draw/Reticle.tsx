const Reticle = ({ cursor, material }) => (<>
    {/* vertical line */}
    <line
        x1={cursor.x} y1={0}
        x2={cursor.x} y2={material.height}
    />
    {/* horizontal line */}
    <line
        x1={0} y1={cursor.y}
        x2={material.width} y2={cursor.y}
    />
    {/* scale */}
    <circle
        cx={cursor.x} cy={cursor.y}
        r={10}
    />
</>);

export default Reticle;
