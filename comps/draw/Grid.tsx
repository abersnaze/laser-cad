import * as _ from "lodash";
import { useSelector } from "react-redux";
import { units } from "../../lib/Equipment";

const Grid = ({ }) => {
    const [drawing] = useSelector((state) => [state.drawing.present]);
    const width = drawing.material.width;
    const height = drawing.material.height;
    const px = drawing.px;

    // the whole area is filled in so the client
    // transformation matrix in mouse events are consistent.
    // the outer boarder is inset 1/2 a pixel so it isn't clipped.
    // the inner grid lines are draw on center.
    return (<g stroke="#ddd">
        <rect
            x={px / 2} y={px / 2}
            width={width - px} height={height - px}
            fill="black"
            fillOpacity="0" />
        {_.range(units.inch, height, units.inch).map((i) => <line
            key={"h" + i}
            x1={0} y1={i}
            x2={width} y2={i} />)}
        {_.range(units.inch, width, units.inch).map((i) => <line
            key={"v" + i}
            x1={i} y1={0}
            x2={i} y2={height} />)}
    </g>);
};

export default Grid;
