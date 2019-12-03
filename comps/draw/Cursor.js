const Cursor = ({ x, y, w, h }) => (<>
    <g>
        {/* vertical line */}
        <line
            x1={x} y1={0}
            x2={x} y2={h}
            stroke="#000000"
            strokeOpacity="0.1"
        />
        {/* horizontal line */}
        <line
            x1={0} y1={y}
            x2={w} y2={y}
            stroke="#000000"
            strokeOpacity="0.1"
        />
        <circle
            cx={x} cy={y}
            r={10}
            fill="none"
            stroke="#000000"
            strokeOpacity="0.1"
        />
    </g>
</>);

export default Cursor;